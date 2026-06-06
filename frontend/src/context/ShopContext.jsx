import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { products as localProducts } from '@assets/assets'

export const ShopContext = createContext();

const getStoredUser = () => {
    try {
        const saved = localStorage.getItem('userProfile')
        return saved ? JSON.parse(saved) : null
    } catch {
        return null
    }
}

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 49;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [user, setUser] = useState(getStoredUser)
    const [showLoginPopup, setShowLoginPopup] = useState(false)
    const navigate = useNavigate();

    const saveUserProfile = (profile) => {
        setUser(profile)
        localStorage.setItem('userProfile', JSON.stringify(profile))
    }

    const clearUserSession = () => {
        setToken('')
        setUser(null)
        setCartItems({})
        setShowLoginPopup(false)
        localStorage.removeItem('token')
        localStorage.removeItem('userProfile')
    }

    const fetchUserProfile = async (authToken, password = user?.password || '') => {
        try {
            const response = await axios.post(
                backendUrl + '/api/user/profile',
                {},
                { headers: { token: authToken } }
            )

            if (response.data.success) {
                saveUserProfile({
                    name: response.data.user.name,
                    email: response.data.user.email,
                    password
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {

                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData)

        if (token) {
            try {

                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const normalizeImageUrl = (url) => {
        if (!url || typeof url !== 'string') return url

        if (url.startsWith('/assets/')) {
            return `${backendUrl}${url}`
        }

        if (url.includes('/assets/')) {
            const fileName = url.split('/assets/').pop()
            return `${backendUrl}/assets/${fileName}`
        }

        return url.replace(/^https?:\/\/localhost:\d+/, backendUrl)
    }

    const normalizeProducts = (items) => items.map((item) => ({
        ...item,
        image: Array.isArray(item.image)
            ? item.image.map(normalizeImageUrl)
            : item.image
    }))

    const getProductsData = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                const apiProducts = response.data.products.reverse()
                setProducts(apiProducts.length > 0 ? normalizeProducts(apiProducts) : localProducts)
            } else {
                setProducts(localProducts)
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            setProducts(localProducts)
        }
    }

    const getUserCart = async ( authToken ) => {
        try {
            
            const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token: authToken}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (token) {
            setShowLoginPopup(false)
            getUserCart(token)
            if (!user) {
                fetchUserProfile(token)
            }
            return
        }

        const timer = setTimeout(() => {
            setShowLoginPopup(true)
        }, 60000)

        return () => clearTimeout(timer)
    }, [token])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token, user, saveUserProfile, clearUserSession,
        showLoginPopup, setShowLoginPopup
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;

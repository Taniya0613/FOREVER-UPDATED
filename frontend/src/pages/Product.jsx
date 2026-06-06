import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '@assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import ScrollReveal from '../components/ScrollReveal';

const Product = () => {

  const { productId } = useParams();
  const { products, currency ,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size,setSize] = useState('')

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })

  }

  useEffect(() => {
    fetchProductData();
  }, [productId,products])

  return productData ? (
    <div className='border-t-2 pt-6 sm:pt-10 page-enter'>
      {/*----------- Product Data-------------- */}
      <ScrollReveal>
      <div className='flex gap-6 sm:gap-12 flex-col sm:flex-row glass-panel p-3 sm:p-6 rounded-lg'>

        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productData.image.map((item,index)=>(
                  <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer image-zoom-hover' alt="" />
                ))
              }
          </div>
          <div className='w-full sm:w-[80%]'>
              <img className='w-full h-auto hero-image' src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-xl sm:text-2xl mt-2 hero-text-item'>{productData.name}</h1>
          <div className=' flex items-center gap-1 mt-2 hero-text-item hero-text-item-delay-1'>
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-4 sm:mt-5 text-2xl sm:text-3xl font-medium hero-text-item hero-text-item-delay-2'>{currency}{productData.price}</p>
          <p className='mt-4 sm:mt-5 text-gray-500 text-sm sm:text-base'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-6 sm:my-8'>
              <p className='text-sm sm:text-base'>Select Size</p>
              <div className='flex flex-wrap gap-2'>
                {productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`size-btn border py-2 px-3 sm:px-4 bg-gray-100 text-sm ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                ))}
              </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-6 sm:px-8 py-3 text-sm btn-animate active:bg-gray-700 w-full sm:w-auto'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      </ScrollReveal>

      {/* ---------- Description & Review Section ------------- */}
      <ScrollReveal className='mt-12 sm:mt-20'>
        <div className='flex text-xs sm:text-sm'>
          <b className='border px-3 sm:px-5 py-3'>Description</b>
          <p className='border px-3 sm:px-5 py-3'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-4 sm:px-6 py-4 sm:py-6 text-xs sm:text-sm text-gray-500 glass-panel'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </ScrollReveal>

      {/* --------- display related products ---------- */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className='min-h-[50vh] flex items-center justify-center'><div className='spinner'></div></div>
}

export default Product

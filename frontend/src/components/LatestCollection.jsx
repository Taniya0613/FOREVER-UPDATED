import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import ScrollReveal from './ScrollReveal';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])

  return (
    <ScrollReveal className='my-10'>
      <div className='text-center py-6 sm:py-8 text-2xl sm:text-3xl'>
          <Title text1={'LATEST'} text2={'COLLECTIONS'} />
          <p className='w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 px-2'>
          Discover our newest styles for men, women, and kids — fresh trends, premium fabrics, and everyday wardrobe essentials.
          </p>
      </div>

      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item,index)=>(
            <ProductItem key={index} index={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }
      </div>
    </ScrollReveal>
  )
}

export default LatestCollection

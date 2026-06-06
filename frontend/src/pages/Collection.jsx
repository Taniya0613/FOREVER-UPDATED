import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '@assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import ScrollReveal from '../components/ScrollReveal';

const Collection = () => {

  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }

  }

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0 ) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)

  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(()=>{
      applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className='flex flex-col lg:flex-row gap-6 lg:gap-10 pt-10 border-t w-full max-w-full overflow-x-hidden'>

      {/* Filter Options — always visible on desktop, no scroll-reveal delay */}
      <aside className='w-full lg:w-56 xl:w-60 shrink-0 lg:sticky lg:top-24 lg:self-start'>
        <button
          type='button'
          onClick={()=>setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2 btn-animate lg:cursor-default'
        >
          FILTERS
          <img
            className={`h-3 lg:hidden transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </button>

        <div className={`collection-filters glass-panel rounded-lg border border-gray-200 overflow-hidden ${showFilter ? 'block' : 'hidden'} lg:block`}>
          {/* Category Filter */}
          <div className='border-b border-gray-200 px-5 py-4'>
            <p className='mb-3 text-sm font-medium tracking-wide'>CATEGORIES</p>
            <div className='flex flex-col gap-2.5 text-sm font-light text-gray-700'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input className='w-3.5 h-3.5 accent-black' type="checkbox" value={'Men'} onChange={toggleCategory}/> Men
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input className='w-3.5 h-3.5 accent-black' type="checkbox" value={'Women'} onChange={toggleCategory}/> Women
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input className='w-3.5 h-3.5 accent-black' type="checkbox" value={'Kids'} onChange={toggleCategory}/> Kids
              </label>
            </div>
          </div>

          {/* SubCategory Filter */}
          <div className='px-5 py-4'>
            <p className='mb-3 text-sm font-medium tracking-wide'>TYPE</p>
            <div className='flex flex-col gap-2.5 text-sm font-light text-gray-700'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input className='w-3.5 h-3.5 accent-black' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/> Topwear
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input className='w-3.5 h-3.5 accent-black' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input className='w-3.5 h-3.5 accent-black' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
              </label>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Side */}
      <div className='flex-1 min-w-0 w-full'>

        <ScrollReveal>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4'>
              <Title text1={'ALL'} text2={'COLLECTIONS'} />
              <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-3 py-2 w-full sm:w-auto btn-animate bg-white/80'>
                <option value="relavent">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
          </div>
        </ScrollReveal>

        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} index={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Collection

// BestSeller.jsx
// This component displays the top 5 best-selling products in a grid layout on the homepage.
// It uses context to access the product list and filters for bestsellers.

import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import ScrollReveal from "./ScrollReveal";

const BestSeller = () => {
  // Access the list of all products from ShopContext
  const { products } = useContext(ShopContext);
  // Local state to store the best-selling products
  const [bestSeller, setBestSeller] = useState([]);

  // useEffect runs whenever the products list changes
  useEffect(() => {
    // Filter products to get only those marked as bestseller
    const bestProduct = products.filter((item) => item.bestseller);
    // Take the first 5 bestsellers and update state
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <ScrollReveal className="my-10">
      {/* Section title and description */}
      <div className="text-center text-2xl sm:text-3xl py-6 sm:py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 px-2">
          {/* Short description for the section */}
          Shop customer favorites loved for quality, comfort, and style — our most popular picks this season.
        </p>
      </div>

      {/* Grid of best-selling products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          // Render a ProductItem for each best-selling product
          bestSeller.map((item, index) => (
            <ProductItem
              key={index}
              index={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))
        }
      </div>
    </ScrollReveal>
  );
};

export default BestSeller;

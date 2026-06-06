import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import 'dotenv/config';
import productModel from '../models/productModel.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsPath = path.join(__dirname, '../assets/assets.js');

const getInrPrice = (oldPrice, subCategory) => {
  let base = 249

  if (subCategory === 'Bottomwear') {
    base = 499
  } else if (subCategory === 'Winterwear') {
    base = 999
  }

  const price = base + Math.max(0, oldPrice - 100) * 4
  return Math.min(Math.round(price / 10) * 10 - 1, 2499)
}

const updateAssetsFile = () => {
  let content = fs.readFileSync(assetsPath, 'utf8')

  content = content.replace(
    /price: (\d+),\s*\n\s*image: ([\s\S]*?)subCategory: "([^"]+)"/g,
    (match, oldPrice, middle, subCategory) => {
      const price = getInrPrice(Number(oldPrice), subCategory)
      return `price: ${price},\n        image: ${middle}subCategory: "${subCategory}"`
    }
  )

  fs.writeFileSync(assetsPath, content)
  console.log('Updated assets.js prices to INR')
}

const updateDatabase = async () => {
  let uri = process.env.MONGODB_URI
  if (!/\/[a-zA-Z0-9_-]+(\?|$)/.test(uri)) {
    uri = uri.replace(/\/?$/, '/e-commerce')
  }
  await mongoose.connect(uri)

  const products = await productModel.find({})
  for (const product of products) {
    if (product.price < 400) {
      product.price = getInrPrice(product.price, product.subCategory)
      await product.save()
    }
  }

  console.log(`Updated ${products.length} product prices in database`)
  await mongoose.disconnect()
}

updateAssetsFile()
await updateDatabase()

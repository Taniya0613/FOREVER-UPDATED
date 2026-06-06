import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import 'dotenv/config';
import productModel from '../models/productModel.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsPath = path.join(__dirname, '../assets/assets.js');

const getDescription = (name, subCategory) => {
  const n = name.toLowerCase();
  if (subCategory === 'Topwear') {
    if (n.includes('shirt') && !n.includes('t-shirt')) {
      return 'Stylish cotton shirt with a clean finish, perfect for casual outings and smart everyday looks.';
    }
    return 'Soft, breathable cotton top with a comfortable fit, ideal for daily wear in every season.';
  }
  if (subCategory === 'Bottomwear') {
    if (n.includes('palazzo')) {
      return 'Relaxed palazzo pants with a waist belt, offering flowy comfort and effortless everyday style.';
    }
    return 'Tailored trousers with a modern fit and durable fabric, designed for all-day comfort.';
  }
  if (subCategory === 'Winterwear') {
    return 'Warm and versatile outerwear with quality stitching, perfect for layering in cooler weather.';
  }
  return 'Premium quality apparel from Forever, made for comfort, durability, and modern style.';
};

const updateAssetsFile = () => {
  let content = fs.readFileSync(assetsPath, 'utf8');
  const oldDesc = 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.';

  content = content.replace(
    /name: "([^"]+)",\s*\n\s*description: "[^"]*",([\s\S]*?)subCategory: "([^"]+)"/g,
    (match, name, middle, subCategory) => {
      const desc = getDescription(name, subCategory);
      return `name: "${name}",\n        description: "${desc}",${middle}subCategory: "${subCategory}"`;
    }
  );

  if (content.includes(oldDesc)) {
    throw new Error('Some product descriptions were not updated in assets.js');
  }

  fs.writeFileSync(assetsPath, content);
  console.log('Updated assets.js product descriptions');
};

const updateDatabase = async () => {
  let uri = process.env.MONGODB_URI;
  if (!/\/[a-zA-Z0-9_-]+(\?|$)/.test(uri)) {
    uri = uri.replace(/\/?$/, '/e-commerce');
  }
  await mongoose.connect(uri);

  const products = await productModel.find({});
  for (const product of products) {
    product.description = getDescription(product.name, product.subCategory);
    await product.save();
  }

  console.log(`Updated ${products.length} products in database`);
  await mongoose.disconnect();
};

updateAssetsFile();
await updateDatabase();

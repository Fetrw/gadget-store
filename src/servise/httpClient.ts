import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { getData } from './getProducts';

const getAllProducts = () => {
  return getData<Product[]>('/products.json');
};

const getPhones = () => {
  return getData<ProductDetails[]>('/phones.json');
};

const getTablets = () => {
  return getData<ProductDetails[]>('/tablets.json');
};

const getAccessories = () => {
  return getData<ProductDetails[]>('/accessories.json');
};

export const service = {
  getAllProducts,
  getPhones,
  getTablets,
  getAccessories,
};

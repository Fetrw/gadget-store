import { useEffect, useState } from 'react';

import { Product } from '../../types/Product';
import { service } from '../../servise/httpClient';

import { Banner } from '../../components/Slider';
import { ProductSlider } from '../../components/ProductSlider';
import { CategoriesOptions } from '../../components/Categories';

import './HomePage.scss';

export const HomePage = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const getNewModels = (models: Product[]) => {
    return models.filter(model => model.year === 2022);
  };

  const getHotPrices = (products: Product[]) => {
    return products.sort(
      (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
    );
  };

  useEffect(() => {
    service.getAllProducts().then(products => setAllProducts(products));
  }, []);

  const newModels = getNewModels(allProducts);
  const hotPrices = getHotPrices(allProducts);

  return (
    <div className="homepage">
      <h1 className="homepage__title">Welcome to Gadgets store</h1>
      <section className="heroslider-wrapper">
        <Banner />
      </section>
      <ProductSlider products={newModels}>Brand new models</ProductSlider>
      <CategoriesOptions products={allProducts} />
      <ProductSlider products={hotPrices}>Hot</ProductSlider>
    </div>
  );
};

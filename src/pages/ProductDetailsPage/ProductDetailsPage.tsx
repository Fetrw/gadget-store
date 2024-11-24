/* eslint-disable @typescript-eslint/no-shadow */
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { Category } from '../../types/Category';
import { service } from '../../servise/httpClient';

import { Details } from '../../components/ProductDetails';
import { ProductSlider } from '../../components/ProductSlider';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Loader } from '../../components/Loader/Loader';

import './ProductDetailsPage.scss';

type Props = {
  category: Category;
};

export const ProductDetailsPage: FC<Props> = ({ category }) => {
  const { itemId } = useParams();

  const [item, setItem] = useState<ProductDetails>();
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [recommendedItems, setRecommendedItems] = useState<Product[]>();
  const isLoading = currentProduct === undefined;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const getItemModel = (itemId: string = '0') => {
    return itemId.split('-').slice(0, -2).join('-');
  };

  const itemModel = getItemModel(itemId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [itemModel]);

  useEffect(() => {
    const fetchItem = async () => {
      let res;

      switch (category) {
        case 'phones':
          res = await service.getPhones();
          break;
        case 'tablets':
          res = await service.getTablets();
          break;
        case 'accessories':
          res = await service.getAccessories();
          break;
        default:
          throw new Error(`Unknown category: ${category}`);
      }

      const foundItem = res.find(item => item.id === itemId);

      if (foundItem) {
        setItem(foundItem);
      } else {
        throw new Error('Item not found');
      }
    };

    fetchItem();
  }, [category, itemId]);

  useEffect(() => {
    const fetchAllItems = async () => {
      const res = await service.getAllProducts();

      setCurrentProduct(res.find(product => product.itemId === item?.id));
      setRecommendedItems(
        res.filter(
          product =>
            Math.abs(product.fullPrice - (item?.priceRegular || 0)) <= 200 &&
            product.category === item?.category &&
            getItemModel(product.itemId) !== itemModel,
        ),
      );
    };

    fetchAllItems();
  }, [item, itemModel]);

  return (
    <>
      {isLoading ? (
        <div className="itempage">
          <div className="itempage__bread-crumbs-wrapper">
            <BreadCrumbs />
          </div>
          <div className="itempage__loader-wrapper">
            <Loader />
          </div>
        </div>
      ) : (
        <div className="itempage">
          <div className="itempage__bread-crumbs-wrapper">
            <BreadCrumbs />
          </div>
          {item && currentProduct && (
            <Details productDetails={item} product={currentProduct} />
          )}
        </div>
      )}

      {recommendedItems && !isLoading && (
        <ProductSlider products={recommendedItems}>
          You also may like
        </ProductSlider>
      )}
    </>
  );
};

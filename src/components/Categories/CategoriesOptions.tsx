import React from 'react';
import { CategoryCard } from './CategoryCard/CategoryCard';
import { categories } from '../../constants/categoryData';

import './CategoriesOptions.scss';

type ProductType = {
  category: string;
};

type CategoriesOptionsProps = {
  products: ProductType[];
};

export const CategoriesOptions: React.FC<CategoriesOptionsProps> = ({
  products,
}) => {
  return (
    <div className="categories">
      <div className="categories__content">
        <h2 className="categories__title title--h2">Categories</h2>
        <div className="categories__list" data-cy="categoryLinksContainer">
          {categories.map(({ name, src, linkTo }) => (
            <CategoryCard
              key={linkTo}
              name={name}
              src={src}
              linkTo={linkTo}
              count={
                products.filter(item => item.category === linkTo.slice(1))
                  .length
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

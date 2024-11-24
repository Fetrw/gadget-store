import React from 'react';
import { Link } from 'react-router-dom';

import './CategoryCard.scss';

type CategoryCardProps = {
  name: string;
  src: string;
  linkTo: string;
  count: number;
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  src,
  linkTo,
  count,
}) => (
  <Link
    to={linkTo}
    className="category-card"
    data-cy={`categoryCard-${linkTo.slice(1)}`}
  >
    <div className="category-card__img-box">
      <img
        src={`${process.env.PUBLIC_URL}/img/${src}`}
        alt={name}
        className="category-card__img"
      />
    </div>
    <h3 className="category-card__title">{name}</h3>
    <span className="category-card__count">{`${count} models`}</span>
  </Link>
);

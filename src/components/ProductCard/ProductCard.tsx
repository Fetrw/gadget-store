import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../../types/Product';

import { AddToCartButton } from './AddCartButton/AddCartButton';
import { AddToFavButton } from './AddFavButton/AddFavButton';

import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const {
    itemId,
    category,
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  const URL = `/${category}/${itemId}`;

  return (
    <article className="product">
      <Link to={URL}>
        <img className="product__image" src={image} alt={name} />
        <p className="product__title">{name}</p>
        <div className="product__price">
          <span className="product__price-current">${price}</span>
          <span className="product__price-original">${fullPrice}</span>
        </div>
      </Link>

      <div className="product__details">
        <div className="product__details-row">
          <p className="product__detail-name">Screen</p>
          <p className="product__detail-value">{screen}</p>
        </div>

        <div className="product__details-row">
          <p className="product__detail-name">Capacity</p>
          <p className="product__detail-value">{capacity}</p>
        </div>

        <div className="product__details-row">
          <p className="product__detail-name">RAM</p>
          <p className="product__detail-value">{ram}</p>
        </div>
      </div>

      <div className="product__actions">
        <AddToCartButton product={product} />
        <AddToFavButton product={product} />
      </div>
    </article>
  );
};

import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { Product } from '../../../types/Product';
import { addItemToCart, deleteItemFromCart } from '../../../slices/cartSlice';
import cn from 'classnames';

import './AddCartButton.scss';

type Props = {
  product: Product;
};

export const AddToCartButton: FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.cartItems);
  const isInCart = cartItems.some(item => item.product.id === product.id);

  const handleClick = () => {
    if (isInCart) {
      dispatch(deleteItemFromCart(product.id));
    } else {
      dispatch(addItemToCart(product));
    }
  };

  return (
    <button
      className={cn('add-to-cart', { 'add-to-cart--selected': isInCart })}
      onClick={handleClick}
      title="Add to cart"
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};

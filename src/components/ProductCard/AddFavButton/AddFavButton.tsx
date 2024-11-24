import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { Product } from '../../../types/Product';
import {
  addProductToFav,
  deleteProductFromFav,
} from '../../../slices/favoritesSlice';
import cn from 'classnames';

import './AddFavButton.scss';

type Props = {
  product: Product;
};

export const AddToFavButton: FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.favorites);
  const isFavorite = favorites.some(item => item.id === product.id);

  const handleClick = () => {
    if (isFavorite) {
      dispatch(deleteProductFromFav(product.id));
    } else {
      dispatch(addProductToFav(product));
    }
  };

  return (
    <button
      className={cn('add-to-fav', { 'add-to-fav--added': isFavorite })}
      onClick={handleClick}
      title="Add to favorites"
    >
      <div className={cn('icon-fav', { 'icon-fav--added': isFavorite })}>
        <i className={cn('ico ico-fav', { 'ico-fav-red': isFavorite })}></i>
      </div>
    </button>
  );
};

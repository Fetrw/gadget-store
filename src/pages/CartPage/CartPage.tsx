import { Link } from 'react-router-dom';
import {
  deleteItemFromCart,
  increaseAmount,
  decreaseAmount,
  clearCart,
} from '../../slices/cartSlice';

import { BackButton } from '../../components/BackButton';
import { EmptyCart } from '../EmptyCart/EmptyCart';
import { CartItem } from './CartItem/CartItem';

import './CartPage.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.cartItems);

  const totalPrice = cartItems.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0,
  );

  return (
    <div className="cart">
      <div className="container">
        <div className="cart__content">
          <BackButton />

          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              <h1 className="cart__title">Cart</h1>
              <div className="cart__items">
                {cartItems.map(item => (
                  <CartItem
                    key={item.product.id}
                    product={item.product}
                    quantity={item.quantity}
                    deleteItemFromCart={() =>
                      dispatch(deleteItemFromCart(item.product.id))
                    }
                    increaseAmount={() =>
                      dispatch(increaseAmount(item.product.id))
                    }
                    decreaseAmount={() =>
                      dispatch(decreaseAmount(item.product.id))
                    }
                  />
                ))}
              </div>
              <div className="cart__total">
                <p className="cart__total-price">${totalPrice}</p>
                <p className="cart__items-count">
                  {cartItems.length === 1
                    ? 'Total for 1 item'
                    : `Total for ${cartItems.length} items`}
                </p>
                <Link
                  to="/checkout"
                  className="cart__checkout"
                  title="Place an order"
                  onClick={() => dispatch(clearCart())}
                >
                  Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

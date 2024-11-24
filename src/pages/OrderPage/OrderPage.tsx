import { Link } from 'react-router-dom';
import './OrderPage.scss';

export const OrderPage = () => {
  return (
    <div className="orderPage">
      <h1 className="orderPage__result">
        Your order has been successfully placed!
      </h1>
      <h2 className="orderPage__gratitude">Thank you for shopping with us!</h2>

      <div className="orderPage__image-wrapper">
        <img
          src="img/cart-is-empty.png"
          alt="order-successful"
          className="orderPage__img"
        />
      </div>

      <div className="orderPage__container">
        <Link to="/" className="orderPage__continue-shopping">
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

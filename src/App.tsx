import { Route, Routes, useLocation } from 'react-router-dom';

import './App.scss';

import { Header } from './components/Header/Header';
import { CartPage } from './pages/CartPage';
import { FavPage } from './pages/FavPage';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage/HomePage';
import { ProductsPage } from './pages/ProductPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { useEffect, useState } from 'react';
import { NotFoundPage } from './pages/NotFoundPage';
import { OrderPage } from './pages/OrderPage';

export const App = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== prevLocation.pathname) {
      setPrevLocation(location);
    }
  }, [location, prevLocation.pathname]);

  return (
    <div className="App">
      <Header />

      <main>
        <Routes>
          <Route path="phones" element={<ProductsPage category="phones" />} />
          <Route
            path="phones/:itemId"
            element={<ProductDetailsPage category="phones" />}
          />
          <Route path="tablets" element={<ProductsPage category="tablets" />} />
          <Route
            path="tablets/:itemId"
            element={<ProductDetailsPage category="tablets" />}
          />
          <Route
            path="accessories"
            element={<ProductsPage category="accessories" />}
          />
          <Route
            path="accessories/:itemId"
            element={<ProductDetailsPage category="accessories" />}
          />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="favourites" element={<FavPage />} />
          <Route path="checkout" element={<OrderPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

import React, { useRef, useState, useEffect } from 'react';
import cn from 'classnames';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import { Loader } from '../Loader/Loader';

import './ProductSlider.scss';

type Props = {
  children: string;
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ children, products }) => {
  const itemsRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isLoading = products.length === 0;

  const updateScrollButtons = () => {
    if (!itemsRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = itemsRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  const onScrollLeft = () => {
    if (!itemsRef.current) {
      return;
    }

    itemsRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const onScrollRight = () => {
    if (!itemsRef.current) {
      return;
    }

    itemsRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  useEffect(() => {
    updateScrollButtons();

    const ref = itemsRef.current;

    if (ref) {
      ref.addEventListener('scroll', updateScrollButtons);

      return () => {
        ref.removeEventListener('scroll', updateScrollButtons);
      };
    }

    return undefined;
  }, [products]);

  return (
    <section className="productSlider">
      <div className="productSlider__top">
        <h2 className="productSlider__title">{children}</h2>
        <div className="productSlider__buttons">
          <button
            className={cn('scrollButton scrollButton--left', {
              'scrollButton--left-disabled': !canScrollLeft,
            })}
            name="Scroll left"
            title="Scroll left"
            onClick={onScrollLeft}
            disabled={!canScrollLeft}
          ></button>
          <button
            className={cn('scrollButton scrollButton--right', {
              'scrollButton--right-disabled': !canScrollRight,
            })}
            name="Scroll right"
            title="Scroll right"
            onClick={onScrollRight}
            disabled={!canScrollRight}
          ></button>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="productSlider__items" ref={itemsRef}>
          {products.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </section>
  );
};

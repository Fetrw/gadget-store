import { FC, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { service } from '../../servise/httpClient';

import { Product } from '../../types/Product';
import { Category } from '../../types/Category';

import { ProductCard } from '../../components/ProductCard';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { DropDown } from '../../components/DropDown';
import { Pagination } from '../../components/Pagination';
import { Loader } from '../../components/Loader/Loader';

import './ProductPage.scss';
import { SortOptions } from '../../types/SortOptions';
import { ItemsPerPage } from '../../types/ItemsPerPage';

interface Props {
  category: Category;
}

const sortProducts = (products: Product[], sortBy: SortOptions) => {
  switch (sortBy) {
    case SortOptions.Newest:
      return [...products].sort((a, b) => b.year - a.year);
    case SortOptions.Alphabetically:
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case SortOptions.Cheapest:
      return [...products].sort((a, b) => a.price - b.price);
    default:
      return products;
  }
};

export const ProductsPage: FC<Props> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'newest';
  const itemsPerPage = searchParams.get('perPage') || '16';
  const currentPage = +(searchParams.get('page') || 1);

  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value);

    if (key !== 'page') {
      params.set('page', '1');
    }

    setSearchParams(params);
  };

  useEffect(() => {
    setIsLoading(true);

    service
      .getAllProducts()
      .then(res =>
        setProducts(res.filter(product => product.category === category)),
      )
      .catch(() => {
        throw new Error('Failed to load products');
      })
      .finally(() => setIsLoading(false));
  }, [category]);

  const isSortOption = (value: string): value is SortOptions => {
    return Object.values(SortOptions).includes(value as SortOptions);
  };

  const sortedProducts = useMemo(() => {
    if (!isSortOption(sortBy)) {
      return products;
    }

    return sortProducts(products, sortBy);
  }, [products, sortBy]);

  const visibleProducts = useMemo(() => {
    if (itemsPerPage === 'all') {
      return sortedProducts;
    }

    const startIndex = (currentPage - 1) * +itemsPerPage;

    return sortedProducts.slice(startIndex, startIndex + +itemsPerPage);
  }, [sortedProducts, itemsPerPage, currentPage]);

  const totalPages =
    itemsPerPage === 'all' ? 0 : Math.ceil(products.length / +itemsPerPage);

  return (
    <div className="products">
      <div className="products__top">
        <BreadCrumbs />

        <div>
          <h1 className="products__title">{category}</h1>
          <p className="products__amount">{products.length} models</p>
        </div>

        <div className="products__filters">
          <div className="products__filters-wrapper-l">
            <div className="products__filter products__filter--sort-by">
              <p className="products__filter-label">Sort by</p>
              <DropDown
                options={Object.values(SortOptions)}
                chosenOption={sortBy}
                onClick={value => updateSearchParam('sort', value)}
              />
            </div>
            <div className="products__filter products__filter--items">
              <p className="products__filter-label">Items on page</p>
              <DropDown
                options={Object.values(ItemsPerPage)}
                chosenOption={itemsPerPage}
                onClick={value => updateSearchParam('perPage', value)}
              />
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="products__loader">
          <Loader />
        </div>
      )}

      {!isLoading && visibleProducts.length > 0 && (
        <>
          <ul className="products__list">
            {visibleProducts.map(product => (
              <li key={product.id} className="products__item">
                <ProductCard product={product} />
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <div className="products__pagination">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={page =>
                  updateSearchParam('page', page.toString())
                }
              />
            </div>
          )}
        </>
      )}

      {!isLoading && visibleProducts.length === 0 && (
        <div className="products__not-found">
          <h2 className="products__not-found-text">
            Sorry, nothing was found :&#40;
          </h2>
          <img
            src="./img/product-not-found.png"
            alt="Product not found"
            className="products__not-found-img"
          />
        </div>
      )}
    </div>
  );
};

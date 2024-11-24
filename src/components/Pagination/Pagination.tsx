import { FC } from 'react';
import cn from 'classnames';

import './Pagination.scss';

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (value: number) => void;
}

function paginate(currentPage: number, lastPage: number) {
  const MAX_LENGTH = 5;
  let startPage: number, endPage: number;

  if (lastPage <= MAX_LENGTH) {
    startPage = 1;
    endPage = lastPage;
  } else if (currentPage <= 3) {
    startPage = 1;
    endPage = MAX_LENGTH;
  } else if (currentPage + 2 >= lastPage) {
    startPage = lastPage - (MAX_LENGTH - 1);
    endPage = lastPage;
  } else {
    startPage = currentPage - 2;
    endPage = currentPage + 2;
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );
}

export const Pagination: FC<Props> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  if (totalPages < 1) {
    return null;
  }

  const pagesNumbers = paginate(currentPage, totalPages);
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination" aria-label="Pagination">
      <li
        className={cn('pagination__item pagination__item--prev', {
          'pagination__item--disabled': isPrevDisabled,
        })}
      >
        <button
          className="pagination__button pagination__button--arrow"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={isPrevDisabled}
          aria-label="Previous page"
        >
          <i className="ico ico-left-dark" />
        </button>
      </li>

      {pagesNumbers.map(pageNumber => (
        <li key={pageNumber} className="pagination__item">
          <button
            className={cn('pagination__button', {
              'pagination__button--active': pageNumber === currentPage,
            })}
            onClick={() => handlePageChange(pageNumber)}
            aria-current={pageNumber === currentPage ? 'page' : undefined}
            aria-label={`Page ${pageNumber}`}
          >
            {pageNumber}
          </button>
        </li>
      ))}

      <li
        className={cn('pagination__item pagination__item--next', {
          'pagination__item--disabled': isNextDisabled,
        })}
      >
        <button
          className="pagination__button pagination__button--arrow"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isNextDisabled}
          aria-label="Next page"
        >
          <i className="ico ico-right-dark" />
        </button>
      </li>
    </ul>
  );
};

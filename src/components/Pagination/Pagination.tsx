import React from 'react';
import classNames from 'classnames';
import style from './Pagination.module.css';

const Pagination = ({ totalIssues, issuesPerPage, paginate, currentPage, pageNeighbors }: any) => {
  const pageNumbers: any = [];
  for (let i = currentPage; i <= currentPage + pageNeighbors; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {totalIssues > issuesPerPage && (
        <div className={style.Pagination}>
          <div className={style.Pagination__Inner}>
            <button
              type="button"
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              className={currentPage === 1 ? style.disabled : ''}
            >
              Previous
            </button>
            {pageNumbers.map((number: number, key: number) => (
              <button
                type="button"
                key={key}
                onClick={() => paginate(number)}
                className={classNames({
                  [style.current]: currentPage === number,
                })}
              >
                {number}
              </button>
            ))}
            <button
              type="button"
              onClick={() => currentPage < Math.ceil(totalIssues / issuesPerPage) && paginate(currentPage + 1)}
              className={currentPage === Math.ceil(totalIssues / issuesPerPage) ? style.disabled : ''}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;

'use client';
import { cn } from '@/utils/helper/tailwind_cn';
import _ from 'lodash';
import { useLayoutEffect, useState } from 'react';
import styles from './index.module.css';
import { Link } from '@/navigation';

const CountriesPaginationComponent = ({
  translation: { prev, next },
  path,
  currentPage: current,
  hasNextPage,
  totalPages,
}: {
  translation: { prev: string; next: string };
  path: string;
  currentPage: number;
  hasNextPage?: boolean;
  totalPages: number;
}) => {
  const currentPage = Number(current);
  const [isDisabled, setIsDisabled] = useState<boolean>();

  const maxPagesToShow = 5;
  const halfRange = Math.floor(maxPagesToShow / 2);

  let start = Math.max(1, currentPage - halfRange);
  const end = Math.min(totalPages, start + maxPagesToShow - 1);

  start = Math.max(1, end - maxPagesToShow + 1);

  const range = _.range(start, end + 1);

  useLayoutEffect(() => {
    if (currentPage <= 1) {
      setIsDisabled(true);
    }
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <Link
        onClick={(e) => {
          if (isDisabled) e.preventDefault();
        }}
        href={`${path}/${currentPage - 1}`}
        scroll={false}
        aria-disabled
        className={cn(styles.paginationLink, isDisabled && styles.diasbled)}
      >
        {prev}
      </Link>
      {range.map((page) => (
        <Link
          key={page}
          href={`${path}/${page}`}
          scroll={false}
          className={cn(styles.page, page === currentPage && styles.activePage)}
        >
          {page}
        </Link>
      ))}
      <Link
        onClick={(e) => {
          if (!hasNextPage) e.preventDefault();
        }}
        href={`${path}/${currentPage + 1}`}
        scroll={false}
        className={cn(styles.paginationLink, !hasNextPage && styles.diasbled)}
      >
        {next}
      </Link>
    </div>
  );
};

export default CountriesPaginationComponent;

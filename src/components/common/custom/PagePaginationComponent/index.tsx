'use client';
import { Link } from '@/navigation';
import { cn } from '@/utils/helper/tailwind_cn';
import _ from 'lodash';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';
import styles from './index.module.css';

/**
 * PagePaginationComponent
 *
 * A pagination component to navigate through pages.
 * It displays pagination links and handles the disabled state based on the current page and total pages.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.path - The base path for pagination links.
 * @param {number} props.currentPage - The current page number.
 * @param {boolean} [props.hasNextPage=false] - Flag indicating if there is a next page.
 * @param {number} props.totalPages - The total number of pages.
 *
 * @returns {JSX.Element} The PagePaginationComponent.
 */

const PagePaginationComponent = React.memo(
  ({
    path,
    currentPage: current,
    hasNextPage = false,
    totalPages,
  }: {
    path: string;
    currentPage: number;
    hasNextPage?: boolean;
    totalPages: number;
  }) => {
    const t = useTranslations();
    const currentPage = Number(current);

    // Calculate the disabled state for previous and next buttons
    const isPrevDisabled = useMemo(() => currentPage <= 1, [currentPage]);
    const isNextDisabled = useMemo(
      () => !hasNextPage || currentPage >= totalPages,
      [hasNextPage, currentPage, totalPages],
    );

    // Calculate the range of pages to display
    const range = useMemo(() => {
      const maxPagesToShow = 5;
      const halfRange = Math.floor(maxPagesToShow / 2);

      let start = Math.max(1, currentPage - halfRange);
      const end = Math.min(totalPages, start + maxPagesToShow - 1);

      start = Math.max(1, end - maxPagesToShow + 1);

      return _.range(start, end + 1);
    }, [currentPage, totalPages]);

    return (
      <div className={styles.container}>
        <Link
          onClick={(e) => {
            if (isPrevDisabled) e.preventDefault();
          }}
          href={`${path}/${currentPage - 1}`}
          scroll={false}
          aria-disabled={isPrevDisabled}
          className={cn(styles.paginationLink, isPrevDisabled && styles.diasbled)}
        >
          {t('RcRDfXqWiXmIoLKq9_f35')}
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
            if (isNextDisabled) e.preventDefault();
          }}
          href={`${path}/${currentPage + 1}`}
          scroll={false}
          aria-disabled={isNextDisabled}
          className={cn(styles.paginationLink, isNextDisabled && styles.diasbled)}
        >
          {t('bHhdmkhK-PLXJsJQdXFaP')}
        </Link>
      </div>
    );
  },
);

PagePaginationComponent.displayName = 'PagePaginationComponent';
export default PagePaginationComponent;

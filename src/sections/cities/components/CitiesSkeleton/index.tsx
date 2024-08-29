import { Skeleton } from '@/components/common/base/Skeleton';
import PagePaginationComponent from '@/components/common/custom/PagePaginationComponent';
import React from 'react';

const SKELETON_COUNT = 15; // Number of skeleton cards to display

/**
 * CitiesSkeleton Component
 *
 * This component renders a skeleton loader for the Cities page.
 * It displays a grid of skeleton elements to simulate the loading state
 * of city cards, providing a visual placeholder while the actual content
 * is being fetched.
 *
 * @param {Object} props - Component properties.
 * @param {number} [props.page=1] - The current page number for pagination.
 *
 * @returns {JSX.Element} The CitiesSkeleton component.
 */

const CitiesSkeleton = React.memo(
  ({ page = 1, totalPages }: { page?: number; totalPages: number }) => {
    // Memoize the skeleton items array to prevent re-creation on every render
    const skeletonItems = React.useMemo(() => [...Array(SKELETON_COUNT)], []);

    return (
      <>
        <div
          className="my-5 grid w-fit grid-rows-1 gap-5 md:grid-cols-4 lg:grid-cols-5"
          aria-busy="true"
          aria-label="Loading city cards"
        >
          {skeletonItems.map((_, index) => (
            <Skeleton
              key={index}
              animate
              className="h-[228.5px] w-[160px] rounded-xl bg-black/30 shadow-md"
            />
          ))}
        </div>
        {/* Conditional rendering of pagination component */}
        {totalPages > 1 && (
          <PagePaginationComponent
            path="/cities"
            currentPage={page}
            hasNextPage={true}
            totalPages={totalPages}
          />
        )}
      </>
    );
  },
);

CitiesSkeleton.displayName = 'CitiesSkeleton';

export default CitiesSkeleton;

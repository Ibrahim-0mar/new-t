import Container from '@/components/common/base/Container';
import { Skeleton } from '@/components/common/base/Skeleton';

const CardsLoading = ({ className }: { className?: string }) => {
  return (
    <Container className={className}>
      <div className="grid w-full grid-cols-3 gap-5 lg:grid-cols-4 xl:grid-cols-5">
        {[...Array(10)].map((_, index) => (
          <Skeleton
            animate
            key={index}
            className="hidden h-72 w-full rounded-lg  bg-slate-500 shadow-md shadow-slate-600 lg:block"
          />
        ))}
        {[...Array(3)].map((_, index) => (
          <Skeleton animate key={index} className="h-[150px] bg-slate-500 shadow-md lg:hidden" />
        ))}
      </div>
    </Container>
  );
};

export default CardsLoading;

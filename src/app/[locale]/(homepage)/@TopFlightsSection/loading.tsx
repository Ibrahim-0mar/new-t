import Container from '@/components/common/base/Container';
import { Skeleton } from '@/components/common/base/Skeleton';

const PlaceHolder = () => {
  return (
    <Container className="mb-5">
      <div className="mb-5 flex items-start justify-start gap-5">
        <Skeleton animate className="h-11 w-[130px] rounded-full bg-slate-500 shadow-xl" />
        <Skeleton animate className="h-11 w-[130px] rounded-full bg-slate-500 shadow-xl" />
      </div>
      <div className="mt-3 hidden w-full grid-cols-4 gap-5 lg:grid xl:grid-cols-5">
        {[...Array(10)].map((_, index) => (
          <Skeleton animate key={index} className="h-28 w-full rounded-lg bg-slate-500 shadow-xl" />
        ))}
      </div>
      <div className="mt-3 grid w-full grid-cols-3 gap-5 lg:hidden">
        {[...Array(3)].map((_, index) => (
          <Skeleton animate key={index} className="h-24 w-full rounded-lg bg-slate-500 shadow-xl" />
        ))}
      </div>
    </Container>
  );
};

export default PlaceHolder;

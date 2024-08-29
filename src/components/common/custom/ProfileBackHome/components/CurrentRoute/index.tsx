'use client';

import { usePathname } from '@/navigation';

const CurrentRoute = () => {
  const pathname = usePathname().split('/').pop();
  return <p className="capitalize md:font-bold">{pathname}</p>;
};

export default CurrentRoute;

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const handleOpenModal = (modalName:string, searchParams: ReadonlyURLSearchParams, router: AppRouterInstance) => {
  const prevParams = new URLSearchParams(searchParams);
  prevParams.set(modalName, 'open');
  router.push(`?${prevParams.toString()}`, { scroll: false });
};


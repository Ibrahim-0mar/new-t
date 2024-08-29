import { Link } from '@/navigation';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import { cn } from '@/utils/helper/tailwind_cn';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Logo({
  width = 100,
  variant,
  className,
}: {
  width?: number;
  variant: 'white' | 'colored';
  className?: string;
}) {
  const t = useTranslations();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // optional for smooth scrolling
    });
  };

  return (
    <div className={cn('min-w-fit', className)}>
      <Link scroll={false} href="/" onClick={handleScrollToTop}>
        <Image
          src={commonImgUrl(variant === 'colored' ? 'coloredLogo.png' : 'whiteLogo.png')}
          height={0}
          width={width}
          alt={t('lFBbtHy396Muq9ArmFFXL')}
          priority
        />
      </Link>
    </div>
  );
}

import { commonImgUrl } from '@/utils/helper/imgUrl';
import { cn } from '@/utils/helper/tailwind_cn';
import Image, { StaticImageData } from 'next/image';
import styles from './index.module.css';

const Section = ({
  title,
  imgUrl,
  content,
  isReversed,
  className,
  titleClassName,
}: {
  title: string;
  imgUrl?: string | StaticImageData;
  content:
    | string
    | string[]
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNodeArray;
  isReversed: boolean;
  className?: string;
  titleClassName?: string;
}) => {
  return (
    <div className={cn(styles.sectionContainer, className)}>
      <h2 className={cn(styles.heading, titleClassName)}>{title}</h2>
      <div
        className={cn(
          styles.contentContainer,
          isReversed && imgUrl ? 'flex-row-reverse' : 'items-center',
          // (!isReversed || !imgUrl) && 'items-center',
        )}
      >
        {imgUrl && (
          <Image
            className="object-cover mix-blend-multiply"
            src={typeof imgUrl === 'string' ? commonImgUrl(imgUrl) : imgUrl}
            alt={title}
            width={250}
            height={0}
            loading="lazy"
          />
        )}
        <div>
          {content instanceof Array ? (
            content.map((part, index) => <p key={index}>{part}</p>)
          ) : (
            <p>{content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Section;

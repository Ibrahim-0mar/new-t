import Image from 'next/image';
import styles from './index.module.css';
import { cn } from '@/utils/helper/tailwind_cn';

const BlogSectionDetails = ({
  title,
  img,
  content,
  // isReversed,
  className,
  titleClassName,
  isOrdereditem = false,
}: {
  title: string;
  // imgUrl?: string | StaticImageData;
  img?: { url: string; width: number; height: number; imageClassName?: string};
  content:
    | string
    | string[]
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNodeArray;
  isReversed: boolean;
  className?: string;
  titleClassName?: string;
  isOrdereditem?: boolean;
}) => {
  const TitleComponent = isOrdereditem ? 'li' : 'h2';

  const forcedImageStyles = img?.imageClassName?.split(" ").map(c => `!${c}`).join(' ')

  return (
    <div id={title} className={cn(styles.sectionContainer, className)}>
      <TitleComponent className={cn(styles.heading, titleClassName)}>{title}</TitleComponent>
      <div
        className={cn(
          styles.contentContainer,
          // isReversed && imgUrl ? 'flex-row-reverse' : 'items-center',
          // (!isReversed || !imgUrl) && 'items-center',
        )}
      >
        <div>
          {Array.isArray(content) ? (
            content.map((part, index) => <p key={index}>{part}</p>)
          ) : (
            <p>{content}</p>
          )}
        </div>
        {img && (
          <Image
            className={cn(styles.image, forcedImageStyles)}
            src={img.url}
            alt={title}
            width={img.width}
            height={img.height}
            loading="lazy"
            layout="intrinsic"
          />
        )}
      </div>
    </div>
  );
};

export default BlogSectionDetails;

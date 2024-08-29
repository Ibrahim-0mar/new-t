import { imagesUrl } from '@/utils/config';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
interface ImageInterface extends ImageProps {
  defaultImage?: string;
}

const ImageComponent = (props: ImageInterface) => {
  const { src, alt, className, defaultImage, ...rest } = props;
  const [imageSrc, setImageSrc] = useState<string | StaticImport>(src);
  return (
    <Image
      src={imageSrc}
      alt={alt}
      className={className}
      onError={
        () => setImageSrc(defaultImage || imagesUrl + '/flights/defaultAirline.png') // TODO: change the default image
      }
      {...rest}
      loading="lazy"
    />
  );
};

export default ImageComponent;

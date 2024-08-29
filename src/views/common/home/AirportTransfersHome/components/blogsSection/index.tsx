'use client';
import { getBlogs } from '@/views/Blogs/utils/data';
import Image from 'next/image';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import styles from './index.module.css';
import Container from '@/components/common/base/Container';
import ChevronLeft from '@/components/common/base/ChevronLeft';
import ChevronRight from '@/components/common/base/ChevronRight';
import { useLocale, useTranslations } from 'next-intl';
import { Link, locale } from '@/navigation';

const BlogSection = () => {
  const t = useTranslations();

  const swiperRef = useRef<SwiperType>();
  const locale = useLocale() as locale;

  const blogs = getBlogs(locale);

  if(!blogs) return
  return (
    <Container>
      <div className={styles.container}>
        <div>
          <div className={styles.arrowContainer}>
            <ChevronLeft
              className="rtl:rotate-180"
              size={20}
              onClick={() => swiperRef.current!.slideNext()}
            />
          </div>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            effect="coverflow"
            grabCursor={true}
            loop
            autoplay={{ delay: 3500 }}
            spaceBetween={40}
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 50,
              modifier: 7,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Navigation, Autoplay]}
          >
            {Object.values(blogs).map((blog, index) => (
              <SwiperSlide key={index} className={styles.swiperSlide}>
                <div className={styles.blogCard}>
                  <Image src={blog.imgUrl} alt={blog.title} width={470} height={0} loading="lazy" />
                  <div className={styles.info}>
                    <p>{blog.title}</p>
                    <Link href={`/blogs/${blog.url}`} target="_blank">
                      {t('gAeH7rcZi2b7fL2Ts-yVv')}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.arrowContainer}>
            <ChevronRight
              className="rtl:rotate-180"
              size={20}
              onClick={() => swiperRef.current!.slidePrev()}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BlogSection;

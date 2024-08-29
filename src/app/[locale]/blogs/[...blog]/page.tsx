import Container from '@/components/common/base/Container';
import { Link, locale } from '@/navigation';
// import AdBanner from '@/utils/ads/googleAdsense/AdBanner';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import BlogSectionDetails from '@/views/Blogs/components/commonBlogsComponents/BlogSectionDetails';
import { getBlogs } from '@/views/Blogs/utils/data';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import styles from './index.module.css';
const AdBanner = dynamic(() => import('@/utils/ads/googleAdsense/AdBanner'), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full min-w-[300px] bg-gray-50" />,
});

export async function generateMetadata({
  params: { blog, locale },
}: {
  params: { blog: string; locale: locale };
}): Promise<Metadata> {
  const blogTitle = blog[0].replaceAll('%20', ' ');

  const blogs = getBlogs(locale);
  // in case if user not selecting EN or AR languages
  if (!blogs) return {};

  const blogData = blogs[decodeURIComponent(blogTitle)];

  if (!blogData?.metaTitle || !blogData?.metaDescription) return {};

  return {
    title: blogData.metaTitle,
    description: blogData.metaDescription,
    alternates: {
      canonical: `/${locale}/blogs/${blog[0]}`,
      languages: {
        [locale]: `/${locale}/blogs/${blog[0]}`,
      },
    },
  };
}

const BlogDetails = ({
  params: { blog, locale },
}: {
  params: { blog: string; locale: locale };
}) => {
  const blogTitle = blog[0].replaceAll('%20', ' ');
  const t = useTranslations();

  const blogs = getBlogs(locale);

  // in case if user not selecting EN or AR languages
  if (!blogs) {
    return (
      <Container className={styles.disclaimerContainer}>
        <h1 className={styles.disclaimer}>{t('OPUHuvH9ms08QcsQ7prGk')}</h1>
        <Link href="/" scroll={false} className={styles.homePageLink}>
          {t('mNnHw2MXvYHIwxIWDhGk5')}
        </Link>
      </Container>
    );
  }

  const blogData = blogs[decodeURIComponent(blogTitle)];
  
  if(!blogData)  {
    return (
      <Container className={styles.disclaimerContainer}>
        <h1 className={styles.disclaimer}>{t('3PjJpsGkQ3lvBreGhl_DO')}</h1>
        <Link href="/blogs" scroll={false} className={styles.homePageLink}>{t('xuqVSqEzTsQtiPo_ayll8')}</Link>
      </Container>
    )
  } 


  const ListComponent = blogData?.isOrderedList ? 'ol' : 'div';
  const listClassName = blogData?.isOrderedList ? styles.orderedList : styles.sections;

  return (
    <div dir={blogData.dir} className={styles.mainContainer}>
      <div id="blogs-ads-mobile" className="h-[50px] 2xl:hidden">
        <AdBanner
          dataAdSlot="8124596435"
          dataAdFormat="auto"
          className="h-[50px]"
          responsive={false}
        />
      </div>
      <div className={styles.header}>
        <h1>{blogData.title}</h1>
        <Image
          src={blogData?.headerImgUrl || commonImgUrl('blog-header.jpg')}
          alt={blogData.title}
          width={1500}
          height={0}
          priority
        />
      </div>
      <section className="flex items-start justify-start py-5">
        <aside id="blogs-ads" className={styles.leftBlogsAds}>
          {[...Array(5)].map((_, index) => (
            <AdBanner
              key={`left-ad-${index}`}
              dataAdSlot="4304555329"
              dataAdFormat="vertical"
              className="h-[600px] w-[300px] bg-gray-50"
            />
          ))}
        </aside>
        <Container className="2xl:px-[3.5%]">
          <div className={styles.introPararaph}>{blogData.heading}</div>
          <ul className={styles.unOrderedList}>
            {blogData.content.map(
              (section, index) =>
                section.paragraph &&
                section.title && (
                  <a className={styles.hyperLink} href={`#${section.title}`} key={index}>
                    <li className={styles.listItem}>{section.title}</li>
                  </a>
                ),
            )}
          </ul>
          <ListComponent className={listClassName}>
            {blogData.content.map((section, index) => (
              <BlogSectionDetails
                isOrdereditem={blogData.isOrderedList}
                key={index}
                title={section.title || ''}
                content={section.paragraph || ''}
                img={section.img}
                isReversed={index % 2 === 0}
                titleClassName="text-center md:text-start text-xl md:text-2xl lg:text-3xl"
              />
            ))}
          </ListComponent>
        </Container>
        <aside id="blogs-ads" className={styles.rightBlogsAds}>
          {[...Array(5)].map((_, index) => (
            <AdBanner
              key={`right-ad-${index}`}
              dataAdSlot="4304555329"
              dataAdFormat="vertical"
              className="h-[600px] w-[300px] bg-gray-50"
            />
          ))}
        </aside>
      </section>
      <div id="blogs-ads-mobile" className="h-[300px] 2xl:hidden">
        <AdBanner
          dataAdSlot="5042921923"
          dataAdFormat="rectangle"
          className="h-[300px]"
          responsive={false}
        />
      </div>
    </div>
  );
};

export default BlogDetails;

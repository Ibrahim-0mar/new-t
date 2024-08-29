'use client';
import Container from '@/components/common/base/Container';
import { Link, locale } from '@/navigation';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import BlogCard from './components/blogCard';
import NavigatingLinks from './components/navigatingLinks';
import styles from './index.module.css';
import { BlogObj, getBlogs } from './utils/data';

const Blogs = () => {
  const t = useTranslations();
  const router = useRouter();

  const activeBlog = useSearchParams().get('active-blog');

  const locale = useLocale() as locale
  const blogs = getBlogs(locale);

  // in case if user not selecting EN or AR languages
  if(!blogs)  {
    setTimeout(()=>{
      router.replace("/", {scroll: false}) 
    }, 3000)
    return <Container className={styles.disclaimerContainer}><h1 className={styles.disclaimer}>{t('OPUHuvH9ms08QcsQ7prGk')}</h1></Container>
  } 
    
  const filteredBlogs = Object.keys(blogs).reduce(
    (acc, key) => {
      const blog = blogs[key];
      if (!activeBlog || activeBlog === 'all' || blog.genre.id === activeBlog) {
        acc[key] = blog;
      }
      return acc;
    },
    {} as { [key: string]: BlogObj },
  );

  return (
    <Container>
      <Image
        src={commonImgUrl('blogs-header.svg')}
        alt={t('bvCRpGWhUweKllkQA9zlH')}
        width={1200}
        height={0}
        priority
        layout="intrinsic"
      />
      <NavigatingLinks />
      <div className={styles.blogsGrid}>
        {Object.values(filteredBlogs).map((blog, index) => (
          <Link href={`/blogs/${blog.url}`} key={index}>
            <BlogCard blog={blog} />
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default Blogs;

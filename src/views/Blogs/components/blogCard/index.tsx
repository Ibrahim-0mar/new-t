import Image from 'next/image';
import styles from './index.module.css';

const blogCard = ({
  blog,
}: {
  blog: {
    genre: { id: string; name: string };
    imgUrl: string;
    title: string;
  };
}) => {
  return (
    <div className={styles.blogCard}>
      <span>{blog.genre.name}</span>
      <Image src={blog.imgUrl} alt="" width={470} height={0} loading="lazy" />
      <div>
        <p>{blog.title}</p>
      </div>
    </div>
  );
};

export default blogCard;

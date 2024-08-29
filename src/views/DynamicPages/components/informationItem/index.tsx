import { ReactNode } from 'react';
import styles from './index.module.css';

const InformationItem = ({
  children,
  title,
  value,
}: {
  children: ReactNode;
  title: string;
  value: any;
}) => {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>{children}</span>
      <div className="flex flex-col">
        <span className={styles.title}>{title}</span>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
};

export default InformationItem;

import { ChevronDownCircle, ChevronUpCircle } from 'lucide-react';
import styles from './index.module.css';

const AccordionComponent = ({
  accordionArray,
}: {
  accordionArray: { title: string; content: string | React.ReactNode }[];
}) => {
  // inline classNames due to using sibling state (peer)
  return (
    <div className={styles.itemsContainer}>
      {accordionArray.map((item) => (
        <div key={item.title} className={styles.itemComponent}>
          <input className="peer absolute opacity-0" type="checkbox" id={item.title} />
          {/* This label will be visible at the beggining, then be hidden */}
          <label
            id="Down label"
            htmlFor={item.title}
            className="flex items-center peer-checked:hidden"
          >
            <label htmlFor={item.title} className={styles.label}>
              {item.title}
            </label>
            <label className={styles.chevronLabel} htmlFor={item.title}>
              <ChevronDownCircle size={20} />
            </label>
          </label>
          {/* This label will be hidden at the beggining, then be visible, and this to control the chevrons to be up and down without need to the useState, so the component still be SSR */}
          <label
            id="Up label"
            htmlFor={item.title}
            className="hidden items-center peer-checked:flex"
          >
            <label htmlFor={item.title} className={styles.label}>
              {item.title}
            </label>
            <label className={styles.chevronLabel} htmlFor={item.title}>
              <ChevronUpCircle size={20} />
            </label>
          </label>
          <div className="max-h-0 overflow-hidden whitespace-pre-line border-b-[1px] border-[#fcfcfc] peer-checked:max-h-full max-sm:text-base">
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionComponent;

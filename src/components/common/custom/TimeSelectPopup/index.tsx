'use client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styles from './index.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../../base/Button';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import DatePicker from '../DatePicker/DatePicker';
import FormatDate from '@/utils/helper/FormatDateComponent';

const TimeSelectPopup = ({ value, onChange, open, setOpen }: any) => {
  const t = useTranslations();

  const renderContent = () => (
    <button type="button" className={styles.trigger}>
      <FormatDate
        date={value}
        replaceFormatWith={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }}
      />
    </button>
  );

  const addHour = () => {
    onChange(dayjs(value).add(1, 'hour').toDate());
  };
  const addMinute = () => {
    onChange(dayjs(value).add(1, 'minute').toDate());
  };
  const substarctHour = () => {
    onChange(dayjs(value).subtract(1, 'hour').toDate());
  };
  const substractMinute = () => {
    onChange(dayjs(value).subtract(1, 'minute').toDate());
  };

  return (
    <div className={styles.triggerContainer}>
      <Popup
        open={open}
        trigger={() => renderContent()}
        onOpen={() => setOpen(true)}
        position="bottom center"
        contentStyle={{
          borderRadius: 15,
          maxWidth: '200px',
        }}
      >
        <div className={styles.container}>
          <DatePicker
            selected={dayjs(value).toDate()}
            onChange={(date) => {
              onChange(date);
            }}
            inline
            timeCaption=""
            closeOnScroll={false}
            shouldCloseOnSelect={false}
            showTimeInput={true}
            showTimeSelectOnly
          />
          <div className={styles.timeArrows}>
            <div className={styles.arrowsContainer}>
              <Button variant="default" className={styles.arrowButton} onClick={addHour}>
                <ChevronUp size={24} className={styles.icon} />
              </Button>
              {t('LHoxYEPrA3Fg0PqLbv7YI')}
              <Button variant="default" className={styles.arrowButton} onClick={substarctHour}>
                <ChevronDown size={24} className={styles.icon} />
              </Button>
            </div>
            <div className={styles.arrowsContainer}>
              <Button variant="default" className={styles.arrowButton} onClick={addMinute}>
                <ChevronUp size={24} className={styles.icon} />
              </Button>
              {t('9ck8RNKCLHTRYqZxXLULY')}
              <Button variant="default" className={styles.arrowButton} onClick={substractMinute}>
                <ChevronDown size={24} className={styles.icon} />
              </Button>
            </div>
          </div>
          <div className={styles.buttonsContainer}>
            <Button
              variant="secondary"
              type="button"
              className={styles.button}
              onClick={() => setOpen(false)}
            >
              {t('hGBYhJKUK2tCg9j_xaosr')}
            </Button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default TimeSelectPopup;

import { cn } from '@/utils/helper/tailwind_cn';
import style from './index.module.css';

const DisplayMessage = ({
  message,
}: {
  message: {
    type: '' | 'error' | 'success';
    message: string | React.JSX.Element;
  };
}) => {
  if (!message) return null;
  return (
    <>
      {message.message && (
        <div className={style.container}>
          <p className={cn(style.message, message.type === 'error' ? style.error : style.success)}>
            {message.message}
          </p>
        </div>
      )}
    </>
  );
};

export default DisplayMessage;

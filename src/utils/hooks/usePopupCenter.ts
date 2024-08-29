import { useCallback } from 'react';

const usePopupCenter = () => {
  const popupCenter = useCallback(
    (url: string, width: number = 500, height: number = 550) => {
      const screenLeft =
        window.screenLeft !== undefined ? window.screenLeft : window.screenX;
      const screenTop =
        window.screenTop !== undefined ? window.screenTop : window.screenY;

      // Using window dimensions directly
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Calculate the position for the popup to be centered
      const left = (windowWidth - width) / 2 + screenLeft;
      const top = (windowHeight - height) / 2 + screenTop;

      // Open the popup
      const newWindow = window.open(
        url,
        '_blank',
        `toolbar=yes,scrollbars=yes,resizable=yes, width=${width}, height=${height}, top=${top}, left=${left}`,
      );

      if (newWindow) {
        newWindow.focus();
      }
    },
    [],
  );

  return popupCenter;
};

export default usePopupCenter;

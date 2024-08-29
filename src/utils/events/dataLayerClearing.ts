export const dataLayerClearing = () => {
  if(typeof window !== 'undefined' && window.dataLayer) window.dataLayer.push(function (this: { reset: () => void }) {
    this.reset();
  });
};

export const withDataLayerClearing =
  (fn: (...args: any[]) => any) =>
  (...args: any[]) => {
    dataLayerClearing();
    return fn(...args);
  };

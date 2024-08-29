export const sortAscending = (a: number, b: number) => {
  if (a > b) return 1;
  if (b > a) return -1;
  return 0;
};
export const sortDescending = (a: number, b: number) => {
  if (b > a) return 1;
  if (a > b) return -1;
  return 0;
};

export const formatNumber = (value: number | string) => {
  return new Intl.NumberFormat().format(Number(value));
};

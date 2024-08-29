export const areTwoArraysEqual = (
  arr1: Array<number | string>,
  arr2: Array<number | string>,
) => {
  if (arr1.length != arr2.length) return false;
  arr1.sort();
  arr2.sort();

  // Linearly compare elements
  for (let i = 0; i < arr1.length; i++) if (arr1[i] != arr2[i]) return false;

  // If all elements were same.
  return true;
};

/**
 * Formats the input string by removing periods and replacing spaces with hyphens.
 * Handles spaces around hyphens correctly.
 *
 * @param {string} input - The string to be formatted.
 * @returns {string} The formatted string with periods removed and spaces replaced by hyphens.
 */

export const formatString = (input: string): string => {
  try {
    return input
      .replace(/\./g, '')
      .replace(/ - /g, '-')
      .replace(/ /g, '-');
  } catch (err) {
    return input;
  }
};

import { debounce } from 'lodash';
import { revalidateTag } from 'next/cache';

const activeRevalidations = new Set<string>();

/**
 * Debounced function to handle revalidation of cache tags.
 * This ensures that revalidation requests are not sent too frequently.
 *
 * @param {string} tag - The cache tag to be revalidated.
 */
const debouncedRevalidate = debounce((tag: string) => {
  if (!activeRevalidations.has(tag)) {
    activeRevalidations.add(tag);

    try {
      // Trigger revalidation for the given tag.
      revalidateTag(tag);
    } finally {
      // Remove the tag from active revalidations after the revalidation process.
      activeRevalidations.delete(tag);
    }
  }
}, 500); // Debounce duration in milliseconds

/**
 * Function to revalidate the cache for a specific tag.
 * Utilizes a debounced function to avoid excessive revalidation requests.
 *
 * @param {string} tag - The cache tag to be revalidated.
 * @returns {Promise<void>} - A promise that resolves when the revalidation is complete.
 */
export async function revalidateData(tag: string): Promise<void> {
  // Call the debounced revalidate function with the provided tag.
  debouncedRevalidate(tag);
}

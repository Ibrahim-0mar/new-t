/**
 * A function that parses JSON data using JSON.parse() but handles the errors if the JSON data is not valid.
 * @param JSONString The JSON data to parse.
 * @returns {object | null} The parsed data, or `null` if the data is not a valid JSON.
 */
export function parse(JSONString: any): any {
  try {
    const parsedData = JSON.parse(JSONString!);

    return parsedData;
  } catch (error) {
    console.error(error?.message || 'Invalid JSON data');
    return null;
  }
}

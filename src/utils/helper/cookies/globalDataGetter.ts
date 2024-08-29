import { getNearbyAirport } from '@/services/apis/common/airports';
import { parse } from '../json';
import { defaultLanguage } from '@/services/data/common';
import { locale } from '@/navigation';
/**
 * // To get data at client side component just call the function directly
 * @example globalDataGetter('client', itemName)
 *
 * // To get data at server side page/component:
 * @requires async - firstly the function component must be async function.
 * @requires await - then when calling the function you need to await it
 *
 * @example await globalDataGetter('server', 'test') // this will return the following:
 * @returns {name: 'test', value: string | object}
 */
export const globalDataGetter = (side: 'client' | 'server', name: string) => {
  if (side === 'client' && typeof window !== 'undefined') {
    return parse(window.localStorage.getItem(name)!);
  } else if (side === 'server') {
    const cookieData = async () => {
      const cookies = (await import('next/headers'))?.cookies();
      const cookie = cookies.get(name)?.value;

      // Making this check because if nearbyAirport = null, it will block the page from loading.
      if (!cookie && name === 'nearbyAirport') {
        const language = parse(cookies.get('language')?.value) || defaultLanguage;

        return (async () => await getNearbyAirport(language.code as locale))();
      }

      if (cookie) return parse(cookie);
    };

    return cookieData();
  }
};

'use server';
import { cookies } from 'next/headers';

type CookieOptions = {
  expires?: number | Date;
  path?: string;
  // Add more options here if needed
};

export async function storeDataInCookies(field: string, data: any, options?: CookieOptions) {
  cookies().set(field, JSON.stringify(data), options);
}
export async function deleteDataFromCookies(field: string) {
  cookies().delete(field);
}

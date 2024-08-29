'use server'

import { headers } from "next/headers"

const getOriginUrl = async () => {
  const headersList = headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const fullUrl = `${protocol}://${host}`;

  return fullUrl
}

export default getOriginUrl
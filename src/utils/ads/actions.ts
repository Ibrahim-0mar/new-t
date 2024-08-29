'use server';
import { cookies } from 'next/headers';
import { v4 as uuid } from 'uuid';
import { storeDataInCookies } from '../helper/cookies/server';

export async function getSessionId() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get('sessionId') as any;

  if (sessionId === 'deleted' || !sessionId) {
    const newSessionId = uuid();
    const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
    const expiryDate = new Date(Date.now() + thirtyMinutes);

    storeDataInCookies('sessionId', newSessionId, {
      expires: expiryDate,
    });

    return newSessionId;
  }
  return sessionId?.value;
}

// utm_source
export async function getUtmSource() {
  const cookieStore = cookies();
  const UtmSource = cookieStore.get('utm_source');

  return UtmSource?.value;
}

// utm_campaign
export async function getUtmCampaign() {
  const cookieStore = cookies();
  const UtmCampaign = cookieStore.get('utm_campaign');

  return UtmCampaign?.value;
}

//utm_term
export async function getUtmTerm() {
  const cookieStore = cookies();
  const UtmTerm = cookieStore.get('utm_term');

  return UtmTerm?.value;
}

// utm_content
export async function getUtmContent() {
  const cookieStore = cookies();
  const UtmContent = cookieStore.get('utm_content');

  return UtmContent?.value;
}

// utm_medium
export async function getUtmMedium() {
  const cookieStore = cookies();
  const UtmMedium = cookieStore.get('utm_medium');

  return UtmMedium?.value;
}

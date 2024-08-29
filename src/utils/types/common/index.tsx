import React from 'react';

export type SearchboxType = {
  activeTab: string;
  data?: FlightSearchData;
};
export type FlightSearchData = {
  origins?: string[];
  destinations?: string[];
};
export type TabType = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

export type activeSearchType = {
  flights: React.ReactNode;
  'airport-transfers': React.ReactNode;
};

export type activeSocialModal =
  | 'main'
  | 'email'
  | 'signup'
  | 'confirm'
  | 'forgot-password'
  | 'newPass';
export type currency = {
  _id: string;
  code: string;
  name: string;
  symbol: string;
  language: string;
};
export type country = {
  name: string;
  _id: string;
  currency: currency;
  code: string;
  langauge: string;
};
export type language = {
  name: string;
  code: string;
  locale: string;
  country: string;
  isRTL: boolean;
};
export type selectOptions = language | country | currency;

export type languageType = {
  name: string;
  code: string;
  locale: string;
  country: string;
  isRTL: boolean;
};

export type regionType = {
  _id: string;
  name: string;
  code: string;
  currency: {
    _id: string;
    code: string;
    name: string;
    symbol: string;
  };
};

export type AccordionTopic = {
  name: string;
  contentArray: { title: string; content: string }[];
};

export interface ContactUsForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ShareModalForm {
  yourEmail: string;
  toEmail: string;
  message?: string;
}

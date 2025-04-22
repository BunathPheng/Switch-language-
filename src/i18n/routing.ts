// i18n/routing.ts

import { Pathnames } from "next-intl/routing";


export const locales = ['en', 'kh'] as const;
export type Locale = typeof locales[number];

export const routing = {
  locales,
  defaultLocale: 'en' as const,
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/services': '/services',
    '/contact': '/contact',
  } as Pathnames<typeof locales>,
};
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import Navbar from '../components/Navbar';
import "../globals.css"

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming locale is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Get messages for the current locale
  const messages = await getMessages();

  return (      
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
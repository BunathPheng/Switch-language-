// components/Navbar.tsx
"use client"
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'kh', name: 'ខ្មែរ' }, // Khmer
  // Add more languages as needed
];

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations('Navbar');
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    // Get current path and replace locale
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(`/${locale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    router.push(newPath);
    setIsLangMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLangMenu = () => {
    setIsLangMenuOpen(!isLangMenuOpen);
  };

  return (  
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href={`/${locale}`} className="text-xl font-bold">
                Logo
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href={`/${locale}`} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  {t('home')}
                </Link>
                <Link href={`/${locale}/about`} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  {t('about')}
                </Link>
                <Link href={`/${locale}/services`} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  {t('services')}
                </Link>
                <Link href={`/${locale}/contact`} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  {t('contact')}
                </Link>
              </div>
            </div>
          </div>
          
          {/* Language Switcher */}
          <div className="relative ml-3">
            <button 
              onClick={toggleLangMenu}
              className="flex items-center px-3 py-2 border rounded text-gray-300 border-gray-400 hover:text-white hover:border-white"
            >
              <span>{languages.find(lang => lang.code === locale)?.name || locale}</span>
              <svg className="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {isLangMenuOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`block w-full text-left px-4 py-2 text-sm ${locale === language.code ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} hover:bg-gray-100`}
                      role="menuitem"
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href={`/${locale}`} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
            {t('home')}
          </Link>
          <Link href={`/${locale}/about`} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
            {t('about')}
          </Link>
          <Link href={`/${locale}/services`} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
            {t('services')}
          </Link>
          <Link href={`/${locale}/contact`} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
            {t('contact')}
          </Link>
        </div>
      </div>
    </nav>
  );
}
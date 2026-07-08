'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { categories } from '@/data/categories';

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toursDropdownOpen, setToursDropdownOpen] = useState(false);
  const [mobileToursOpen, setMobileToursOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToursDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
    setToursDropdownOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navLinkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      isActive(href)
        ? 'text-[#1e3a5f] border-b-2 border-amber-400 pb-0.5'
        : 'text-gray-600 hover:text-[#1e3a5f]'
    }`;

  const mobileLinkClass = (href: string) =>
    `block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors min-h-[44px] flex items-center ${
      isActive(href)
        ? 'bg-blue-50 text-[#1e3a5f] border-l-4 border-amber-400'
        : 'text-gray-700 hover:bg-gray-50 hover:text-[#1e3a5f]'
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        {/* Trust signal bar */}
        <div className="bg-[#1e3a5f] text-white text-center py-1.5 px-4">
          <p className="text-xs font-medium tracking-wide flex items-center justify-center gap-3 flex-wrap">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free cancellation on most tours
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 5.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L7.414 11H13a1 1 0 100-2H7.414l2.293-2.293z" clipRule="evenodd" />
              </svg>
              Best price guaranteed
            </span>
          </p>
        </div>

        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <span className="text-base sm:text-lg font-bold text-[#1e3a5f] leading-tight">
                <span className="hidden sm:inline">Best Iceland Tours</span>
                <span className="sm:hidden">Iceland</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Tours dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setToursDropdownOpen(!toursDropdownOpen)}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive('/tours') || isActive('/category')
                      ? 'text-[#1e3a5f] bg-blue-50'
                      : 'text-gray-600 hover:text-[#1e3a5f] hover:bg-gray-50'
                  }`}
                >
                  Tours
                  <svg className={`w-4 h-4 transition-transform duration-200 ${toursDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* Desktop dropdown */}
                {toursDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <Link
                      href="/tours"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#1e3a5f] hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-lg">&#127775;</span>
                      All Tours
                    </Link>
                    <div className="border-t border-gray-100 my-1" />
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1e3a5f] transition-colors"
                      >
                        <span className="text-lg">{cat.icon}</span>
                        {cat.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/about" className={`px-3 py-2 rounded-md ${navLinkClass('/about')}`}>
                About
              </Link>
            </div>

            {/* Right side: CTA + hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/tours"
                className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-[#1e3a5f] font-semibold text-sm px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md min-h-[44px]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                </svg>
                <span className="hidden sm:inline">Book Tours</span>
                <span className="sm:hidden">Book</span>
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-[#1e3a5f] rounded-lg hover:bg-gray-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Open menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile slide-out drawer overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!drawerOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <Link href="/" className="flex items-center" onClick={() => setDrawerOpen(false)}>
              <span className="text-base font-bold text-[#1e3a5f]">Best Iceland Tours</span>
            </Link>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer CTA */}
          <div className="px-5 py-4 bg-gradient-to-r from-[#1e3a5f] to-blue-800">
            <Link
              href="/tours"
              onClick={() => setDrawerOpen(false)}
              className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#1e3a5f] font-bold text-base px-6 py-3.5 rounded-xl transition-all duration-200 shadow-lg min-h-[44px] w-full"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
              </svg>
              Browse All Tours
            </Link>
          </div>

          {/* Drawer nav links */}
          <nav className="flex-1 overflow-y-auto py-3 px-3">
            {/* Tours section (collapsible) */}
            <div className="mb-1">
              <button
                onClick={() => setMobileToursOpen(!mobileToursOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 text-base font-semibold rounded-lg transition-colors min-h-[44px] ${
                  isActive('/tours') || isActive('/category')
                    ? 'bg-blue-50 text-[#1e3a5f]'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">&#127775;</span>
                  Tours
                </span>
                <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${mobileToursOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${mobileToursOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pl-4 py-1 space-y-0.5">
                  <Link href="/tours" onClick={() => setDrawerOpen(false)} className={mobileLinkClass('/tours')}>
                    <span className="flex items-center gap-3">
                      <span className="text-base">&#128205;</span>
                      All Tours
                    </span>
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setDrawerOpen(false)}
                      className={mobileLinkClass(`/category/${cat.slug}`)}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-base">{cat.icon}</span>
                        {cat.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 my-2" />

            <Link href="/guides" onClick={() => setDrawerOpen(false)} className={mobileLinkClass('/guides')}>
              <span className="flex items-center gap-3">
                <span className="text-lg">&#128218;</span>
                Travel Guides
              </span>
            </Link>
            <Link href="/about" onClick={() => setDrawerOpen(false)} className={mobileLinkClass('/about')}>
              <span className="flex items-center gap-3">
                <span className="text-lg">&#8505;&#65039;</span>
                About Us
              </span>
            </Link>
          </nav>

          {/* Drawer footer trust signals */}
          <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free cancellation on most tours
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Best price guaranteed
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Trusted by thousands of visitors
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

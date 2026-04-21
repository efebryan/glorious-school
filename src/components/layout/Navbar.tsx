'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Events', href: '/events' },
    { name: 'Result Checker', href: '/result-checker' },
    { name: 'Contact', href: '/contact' },
  ];

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Explicitly relying on the Backdrop click to close when clicking outside

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
              G
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-bold text-lg text-slate-800">
                Glorious <span className="text-brand-green">Schools</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Ughelli, Delta State</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-brand-green bg-brand-green-50' 
                      : 'text-slate-600 hover:text-brand-green hover:bg-brand-green-50/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <div className="pl-4 flex items-center space-x-3 border-l border-slate-200 ml-2">
              <Link 
                href="/login" 
                className="text-sm font-medium text-slate-600 hover:text-brand-green transition-colors"
              >
                Log in
              </Link>
              <Link 
                href="/signup" 
                className="px-4 py-2 rounded-lg bg-brand-green text-white text-sm font-semibold hover:bg-brand-green-600 transition-colors shadow-sm"
              >
                Sign up
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-slate-600 hover:text-brand-green hover:bg-brand-green-50 focus:outline-none focus:ring-2 focus:ring-brand-green/30 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
            <div className="w-5 h-5 flex flex-col justify-center items-center">
              <span className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[3px]' : '-translate-y-1'}`}></span>
              <span className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[3px]' : 'translate-y-1'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay + Panel */}
      <div
        className={`lg:hidden fixed inset-0 top-20 z-40 transition-all duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Slide-down panel */}
        <div
          className={`relative bg-white border-b border-slate-200 shadow-xl transition-all duration-300 transform ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="px-4 pt-3 pb-6 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-brand-green bg-brand-green-50 font-semibold'
                      : 'text-slate-700 hover:text-brand-green hover:bg-brand-green-50/50 active:bg-brand-green-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-3 rounded-xl bg-brand-green text-white font-semibold hover:bg-brand-green-600 transition-colors shadow-sm"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

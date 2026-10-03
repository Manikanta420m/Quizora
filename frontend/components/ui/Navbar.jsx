'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Button from './Button';
import ThemeSwitch from './ThemeSwitch';
import { motion } from 'framer-motion';

/**
 * Clean & Simple SaaS Navbar
 * Layout:
 * 🤖 Quizora    Home   Features   How It Works   Categories          Login   [Get Started]
 */
export function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLinkClick = (href) => {
    if (href.includes('#')) {
      const hashPart = href.substring(href.indexOf('#'));
      setActiveHash(hashPart);
    } else if (href === '/') {
      setActiveHash('');
    }
    setIsMobileMenuOpen(false);
  };

  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setActiveHash(window.location.hash);
    
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);

    // Setup Intersection Observer for scroll tracking
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Triggers when section is in the middle of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHash(`#${entry.target.id}`);
        }
      });
      
      // If we scroll to the very top (Hero section), reset hash so 'Home' becomes active
      if (window.scrollY < 100) {
        setActiveHash('');
      }
    }, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const isActive = (href) => {
    if (href.includes('#')) {
      const hashPart = href.substring(href.indexOf('#'));
      return pathname === '/' && activeHash === hashPart;
    }
    if (href === '/') {
      return pathname === '/' && !activeHash;
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-xl shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo: 🤖 Quizora */}
        <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-3 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-lg blur-md opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
            <img
              src="/images/quizora-icon.png"
              alt="Quizora"
              className="relative w-8 h-8 rounded-lg object-contain group-hover:scale-105 transition-transform duration-300 shadow-sm"
            />
          </div>
          <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">
            Quizora
          </span>
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 relative px-1.5 py-1.5 bg-slate-100/50 border border-slate-200/80 rounded-full shadow-[inset_0_1px_4px_rgba(0,0,0,0.04)]" onMouseLeave={() => setHoveredIndex(null)}>
          {[
            { name: isAuthenticated ? 'Dashboard' : 'Home', href: isAuthenticated ? '/dashboard' : '/' },
            { name: 'Features', href: '/#features' },
            { name: 'How It Works', href: '/#how-it-works' },
            { name: 'Leaderboard', href: '/#leaderboard' },
            { name: 'Categories', href: '/#categories' }
          ].map((item, idx) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleLinkClick(item.href)}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`relative px-4 py-1.5 text-sm font-semibold transition-colors z-10 ${
                  active ? 'text-[#0F172A]' : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-white rounded-full -z-10 shadow-sm border border-slate-200/80"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                {!active && hoveredIndex === idx && (
                  <motion.div
                    layoutId="hover-nav-pill"
                    className="absolute inset-0 bg-slate-200/60 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Theme Toggle & Login / [Get Started] */}
        <div className="flex items-center gap-4">
          {/* Dark / Light Mode Switch */}
          <ThemeSwitch size="sm" />

          {isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-[#0F172A] hover:text-[#2563EB] transition-colors"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={logout}
                className="text-sm font-medium text-[#64748B] hover:text-[#EF4444] transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors"
              >
                Login
              </Link>
              <Link href="/register">
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2E8F0] bg-white px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-lg">
          <nav className="flex flex-col space-y-1">
            <Link
              href={isAuthenticated ? "/dashboard" : "/"}
              onClick={() => handleLinkClick(isAuthenticated ? "/dashboard" : "/")}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                (isAuthenticated ? isActive('/dashboard') : (isActive('/') && pathname === '/'))
                  ? 'text-[#2563EB] bg-blue-50 font-semibold'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              {isAuthenticated ? 'Dashboard' : 'Home'}
            </Link>
            <Link
              href="/#features"
              onClick={() => handleLinkClick('/#features')}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                isActive('/#features')
                  ? 'text-[#2563EB] bg-blue-50 font-semibold'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => handleLinkClick('/#how-it-works')}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                isActive('/#how-it-works')
                  ? 'text-[#2563EB] bg-blue-50 font-semibold'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              How It Works
            </Link>
            <Link
              href="/#leaderboard"
              onClick={() => handleLinkClick('/#leaderboard')}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                isActive('/#leaderboard')
                  ? 'text-[#2563EB] bg-blue-50 font-semibold'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              Leaderboard
            </Link>
            <Link
              href="/#categories"
              onClick={() => handleLinkClick('/#categories')}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                isActive('/#categories')
                  ? 'text-[#2563EB] bg-blue-50 font-semibold'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              Categories
            </Link>
            {isAuthenticated && (
              <Link
                href="/dashboard"
                onClick={closeMobileMenu}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {!isAuthenticated ? (
            <div className="pt-2 border-t border-[#E2E8F0] flex items-center gap-2">
              <Link href="/login" onClick={closeMobileMenu} className="flex-1">
                <Button variant="secondary" size="md" className="w-full text-xs">
                  Login
                </Button>
              </Link>
              <Link href="/register" onClick={closeMobileMenu} className="flex-1">
                <Button variant="primary" size="md" className="w-full text-xs">
                  Get Started
                </Button>
              </Link>
            </div>
          ) : (
            <div className="pt-2 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => {
                  logout();
                  closeMobileMenu();
                }}
                className="w-full py-2 text-center text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;

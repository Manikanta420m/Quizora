'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Button from './Button';
import ThemeSwitch from './ThemeSwitch';

/**
 * Clean & Simple SaaS Navbar
 * Layout:
 * 🤖 Quizora    Home   Features   How It Works   Categories          Login   [Get Started]
 */
export function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo: 🤖 Quizora */}
        <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/quizora-icon.png"
            alt="Quizora"
            className="w-8 h-8 rounded-lg object-contain group-hover:scale-105 transition-transform duration-200"
          />
          <span className="font-extrabold text-xl text-[#0F172A] tracking-tight">Quizora</span>
        </Link>

        {/* Center Desktop Navigation Links: Home / Dashboard | Features | How It Works | Categories */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href={isAuthenticated ? "/dashboard" : "/"}
            className={`text-sm font-medium transition-colors ${
              (isAuthenticated ? isActive('/dashboard') : (isActive('/') && pathname === '/'))
                ? 'text-[#2563EB] font-semibold'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            {isAuthenticated ? 'Dashboard' : 'Home'}
          </Link>
          <Link
            href="/#features"
            className="text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/quizzes"
            className={`text-sm font-medium transition-colors ${
              isActive('/quizzes')
                ? 'text-[#2563EB] font-semibold'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Categories
          </Link>
          <Link
            href="/leaderboard"
            className={`text-sm font-medium transition-colors ${
              isActive('/leaderboard')
                ? 'text-[#2563EB] font-semibold'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Leaderboard
          </Link>
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
              onClick={closeMobileMenu}
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
              onClick={closeMobileMenu}
              className="px-3 py-2 rounded-lg text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              onClick={closeMobileMenu}
              className="px-3 py-2 rounded-lg text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
            >
              How It Works
            </Link>
            <Link
              href="/quizzes"
              onClick={closeMobileMenu}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                isActive('/quizzes')
                  ? 'text-[#2563EB] bg-blue-50 font-semibold'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              Categories
            </Link>
            <Link
              href="/leaderboard"
              onClick={closeMobileMenu}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                isActive('/leaderboard')
                  ? 'text-[#2563EB] bg-blue-50 font-semibold'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              Leaderboard
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

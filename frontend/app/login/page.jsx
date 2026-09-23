'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Brain, LogIn, AlertCircle, Sparkles, UserCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';

// Login form schema
const loginFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default function LoginPage() {
  const { login, register: authRegister, isAuthenticated } = useAuth();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // If already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data) => {
    setErrorMessage('');
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      router.replace('/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * One-click demo login helper to quickly test the application
   */
  const handleQuickDemo = async (role) => {
    setErrorMessage('');
    setIsSubmitting(true);
    const demoData =
      role === 'student'
        ? {
            name: 'Demo Student',
            email: 'student@demo.com',
            password: 'password123',
            role: 'student',
          }
        : {
            name: 'Demo Teacher',
            email: 'teacher@demo.com',
            password: 'password123',
            role: 'teacher',
          };

    try {
      // First attempt to login
      try {
        await login(demoData.email, demoData.password);
      } catch (loginErr) {
        // If user does not exist yet, auto-register the demo user!
        await authRegister(demoData);
      }
      router.replace('/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to initialize demo session');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-auth-light text-[#111827] relative overflow-hidden">


      {/* Brand Header */}
      <div className="mb-8 text-center space-y-3 relative z-10">
        <Link href="/" className="inline-flex flex-col items-center group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/quizora-logo.png"
            alt="Quizora - Turn Knowledge into Quizzes"
            className="w-32 h-auto object-contain rounded-2xl shadow-sm group-hover:scale-105 transition-transform duration-200 border border-[#E2E8F0] bg-white p-2"
          />
        </Link>
        <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Welcome back</h1>
        <p className="text-xs text-[#64748B]">Sign in to continue your quizzes and view your analytics</p>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border border-[#E2E8F0] shadow-xl p-6 sm:p-8 rounded-2xl relative z-10">
        <CardContent className="p-0 space-y-5">
          {/* Google Sign-In Button */}
          <GoogleSignInButton
            mode="continue"
            onError={(msg) => setErrorMessage(msg)}
          />

          {/* Elegant Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#E2E8F0] w-full" />
            <span className="bg-white px-3 text-[11px] font-bold tracking-wider text-[#64748B] uppercase shrink-0">
              Or with email
            </span>
            <div className="border-t border-[#E2E8F0] w-full" />
          </div>

          {/* Quick Demo Login Bar */}
          <div className="p-3 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1E40AF]">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>One-Click Demo Accounts</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleQuickDemo('student')}
                className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#F8FAFC] border border-[#BFDBFE] text-xs font-medium text-[#1E40AF] text-center transition-colors shadow-sm cursor-pointer"
              >
                Demo Student
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleQuickDemo('teacher')}
                className="px-2.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] border border-[#2563EB] text-xs font-medium text-white text-center transition-colors shadow-sm cursor-pointer"
              >
                Demo Teacher
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] flex items-start gap-2.5 text-xs text-[#EF4444]">
              <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              error={errors.email?.message}
              {...register('email')}
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
              isLoading={isSubmitting}
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Button>
          </form>

          {/* Footer Navigation */}
          <div className="pt-2 text-center text-xs text-[#64748B] border-t border-[#E2E8F0]">
            Don&apos;t have an account yet?{' '}
            <Link
              href="/register"
              className="text-[#2563EB] hover:text-[#1D4ED8] font-semibold underline-offset-4 hover:underline"
            >
              Create an account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

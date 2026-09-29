'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Brain, Sparkles, User, Mail, Lock, GraduationCap, School, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';

// Registration form validation schema using Zod
const registerFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['student', 'teacher']).default('student'),
});

export default function RegisterPage() {
  const { register: authRegister, isAuthenticated } = useAuth();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'student',
    },
  });

  const selectedRole = useWatch({ control, name: 'role', defaultValue: 'student' });

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
      await authRegister(data);
      router.replace('/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please check your details.');
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
        <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Create your account</h1>
        <p className="text-xs text-[#64748B]">Join students & educators mastering new topics with AI</p>
      </div>

      {/* Registration Card */}
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border border-[#E2E8F0] shadow-xl p-6 sm:p-8 rounded-2xl relative z-10">
        <CardContent className="p-0 space-y-5">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] flex items-start gap-2.5 text-xs text-[#EF4444]">
              <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Role Selection (Also applies to Google signup) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#0F172A]">I am joining as:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setValue('role', 'student')}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all duration-200 cursor-pointer ${
                  selectedRole === 'student'
                    ? 'bg-[#EFF6FF] border-[#2563EB] text-[#0F172A] shadow-sm ring-1 ring-[#2563EB]/30'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]'
                }`}
              >
                <GraduationCap className={`w-4 h-4 shrink-0 ${selectedRole === 'student' ? 'text-[#2563EB]' : 'text-[#64748B]'}`} />
                <div>
                  <div className="text-xs font-semibold">Student</div>
                  <div className="text-[10px] text-[#64748B]">Take & learn</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setValue('role', 'teacher')}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all duration-200 cursor-pointer ${
                  selectedRole === 'teacher'
                    ? 'bg-[#EFF6FF] border-[#2563EB] text-[#0F172A] shadow-sm ring-1 ring-[#2563EB]/30'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]'
                }`}
              >
                <School className={`w-4 h-4 shrink-0 ${selectedRole === 'teacher' ? 'text-[#2563EB]' : 'text-[#64748B]'}`} />
                <div>
                  <div className="text-xs font-semibold">Teacher</div>
                  <div className="text-[10px] text-[#64748B]">Create & teach</div>
                </div>
              </button>
            </div>
          </div>

          {/* Sign Up with Google Button */}
          <GoogleSignInButton
            mode="signup"
            role={selectedRole}
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Name */}
            <Input
              label="Full Name"
              placeholder="e.g. Marie Curie"
              error={errors.name?.message}
              {...register('name')}
            />

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
              helperText="Must be at least 6 characters long"
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
              <Sparkles className="w-4 h-4" />
              Create Account
            </Button>
          </form>

          {/* Footer Navigation */}
          <div className="pt-2 text-center text-xs text-[#64748B] border-t border-[#E2E8F0]">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[#2563EB] hover:text-[#1D4ED8] font-semibold underline-offset-4 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

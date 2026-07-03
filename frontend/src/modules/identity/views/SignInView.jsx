/**
 * Workspace Flow — SignInView
 * @author Abdelfatah
 * Split-screen login page: branding on left, form on right.
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Zap, ArrowRight, Lock, Mail } from 'lucide-react';
import { useSignInMutation } from '../hooks/useIdentity';
import { signInSchema } from '../schemas/identitySchemas';
import FormField from '@/shared/components/FormField';
import ActionButton from '@/shared/components/ActionButton';

const SignInView = () => {
  const navigate  = useNavigate();
  const { mutate: signIn, isPending } = useSignInMutation();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data) => {
    signIn(data, {
      onSuccess: () => {
        toast.success('Welcome back!');
        navigate('/');
      },
      onError: (err) => {
        const msg = err?.response?.data?.message || 'Invalid credentials. Please try again.';
        toast.error(msg);
      },
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary flex-col justify-between p-12 text-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">Workspace Flow</span>
          </div>

          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            Your ideas,<br />organized.
          </h2>
          <p className="text-white/70 text-lg max-w-sm">
            Capture thoughts, manage projects, and stay productive — all in one beautiful workspace.
          </p>
        </div>

        <div className="relative z-10 flex gap-4">
          {['Secure', 'Fast', 'Organized'].map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-full bg-white/15 text-sm font-medium backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-surface-50 dark:bg-surface-950">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-surface-900 dark:text-white">Workspace Flow</span>
          </div>

          <div className="glass-card dark:bg-surface-900/60 rounded-2xl p-8 shadow-xl">
            <div className="mb-7">
              <h1 className="text-2xl font-extrabold text-surface-900 dark:text-white mb-1">
                Welcome back
              </h1>
              <p className="text-sm text-surface-500 dark:text-surface-400">
                Sign in to your workspace
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                label="Email"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email')}
              />
              <FormField
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
              />

              <ActionButton
                type="submit"
                isLoading={isPending}
                icon={ArrowRight}
                className="w-full mt-2"
              >
                Sign In
              </ActionButton>
            </form>

            <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-primary-600 dark:text-primary-400 hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInView;

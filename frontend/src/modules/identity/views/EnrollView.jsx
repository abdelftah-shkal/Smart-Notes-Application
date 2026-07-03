/**
 * Workspace Flow — EnrollView
 * @author Abdelfatah
 * Split-screen registration page.
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Zap, UserPlus } from 'lucide-react';
import { useEnrollmentMutation } from '../hooks/useIdentity';
import { enrollmentSchema } from '../schemas/identitySchemas';
import FormField from '@/shared/components/FormField';
import ActionButton from '@/shared/components/ActionButton';

const EnrollView = () => {
  const navigate = useNavigate();
  const { mutate: enroll, isPending } = useEnrollmentMutation();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(enrollmentSchema),
  });

  const onSubmit = (data) => {
    enroll(data, {
      onSuccess: () => {
        toast.success('Account created! Please sign in.');
        navigate('/login');
      },
      onError: (err) => {
        const msg = err?.response?.data?.message || 'Registration failed. Please try again.';
        toast.error(msg);
      },
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary flex-col justify-between p-12 text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">Workspace Flow</span>
          </div>
          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            Start your<br />journey today.
          </h2>
          <p className="text-white/70 text-lg max-w-sm">
            Join thousands of people who use Workspace Flow to stay on top of their work, ideas, and goals.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-3 max-w-xs">
          {[
            { label: 'Notes', value: '∞' },
            { label: 'Categories', value: '6+' },
            { label: 'Tags', value: '∞' },
            { label: 'Devices', value: 'All' },
          ].map((item) => (
            <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-xs text-white/70 mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-surface-50 dark:bg-surface-950">
        <div className="w-full max-w-md animate-slide-up">
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-surface-900 dark:text-white">Workspace Flow</span>
          </div>

          <div className="glass-card dark:bg-surface-900/60 rounded-2xl p-8 shadow-xl">
            <div className="mb-7">
              <h1 className="text-2xl font-extrabold text-surface-900 dark:text-white mb-1">
                Create account
              </h1>
              <p className="text-sm text-surface-500 dark:text-surface-400">
                Get started with Workspace Flow
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                label="Full Name"
                type="text"
                placeholder="Abdelfatah"
                error={errors.name?.message}
                {...register('name')}
              />
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
                placeholder="At least 6 characters"
                error={errors.password?.message}
                {...register('password')}
              />

              <ActionButton
                type="submit"
                isLoading={isPending}
                icon={UserPlus}
                className="w-full mt-2"
              >
                Create Account
              </ActionButton>
            </form>

            <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollView;

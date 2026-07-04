/**
 * Workspace Flow — EnrollView
 * @author Abdelfatah
 * Vintage notebook registration page.
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
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface-800 dark:bg-surface-700 border border-surface-400 dark:border-surface-600">
            <Zap className="w-5 h-5 text-paper-50" />
          </div>
          <span className="text-2xl font-hand font-bold text-surface-800 dark:text-paper-50">Notebook</span>
        </div>

        <div className="vintage-card p-8">
          <div className="mb-7">
            <h1 className="text-2xl font-heading font-bold text-surface-800 dark:text-paper-50 mb-1">
              Create account
            </h1>
            <p className="text-sm font-body text-surface-500 dark:text-surface-500">
              Start your notebook journal
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              label="Full Name"
              type="text"
              placeholder="Your name"
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

          <p className="mt-6 text-center text-sm font-body text-surface-500 dark:text-surface-500">
            Already have an account?{' '}
            <Link to="/login" className="font-heading font-semibold text-surface-700 dark:text-surface-400 hover:text-surface-900 dark:hover:text-paper-50 underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnrollView;

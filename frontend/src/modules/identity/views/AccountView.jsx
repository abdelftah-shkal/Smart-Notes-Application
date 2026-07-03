/**
 * Workspace Flow — AccountView
 * @author Abdelfatah
 * User profile / settings page.
 */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { UserCircle, Mail, Calendar, Shield } from 'lucide-react';

const AccountView = () => {
  const account = useSelector((s) => s.identity.account);
  const [activeTab, setActiveTab] = useState('profile');

  const initials = account?.name
    ? account.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'WF';

  const tabs = [
    { id: 'profile',  label: 'Profile'  },
    { id: 'security', label: 'Security' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
      {/* Profile Card */}
      <div className="glass-card dark:bg-surface-900/60 rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 text-white text-2xl font-extrabold shadow-lg select-none">
            {initials}
          </div>
          <div>
            <h2 className="text-xl font-bold text-surface-900 dark:text-white">
              {account?.name || '—'}
            </h2>
            <p className="text-sm text-surface-500 dark:text-surface-400 mt-0.5">
              {account?.email || '—'}
            </p>
            <span className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 text-xs font-semibold">
              <Shield className="w-3 h-3" /> Active Account
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-100 dark:bg-surface-900 p-1 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-white dark:bg-surface-800 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <div className="glass-card dark:bg-surface-900/60 rounded-2xl p-6 shadow-md space-y-4 animate-fade-in">
          <h3 className="text-base font-bold text-surface-900 dark:text-white mb-4">
            Profile Information
          </h3>

          <InfoRow icon={UserCircle} label="Full Name" value={account?.name || '—'} />
          <InfoRow icon={Mail}       label="Email"     value={account?.email || '—'} />
          <InfoRow icon={Calendar}   label="Member Since" value="Workspace Flow Member" />

          <p className="text-xs text-surface-400 dark:text-surface-500 pt-2 border-t border-surface-200 dark:border-surface-700">
            To update your profile information, please contact support or use the API directly.
          </p>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="glass-card dark:bg-surface-900/60 rounded-2xl p-6 shadow-md animate-fade-in space-y-4">
          <h3 className="text-base font-bold text-surface-900 dark:text-white mb-1">
            Security Settings
          </h3>
          <p className="text-sm text-surface-500 dark:text-surface-400">
            Your account is protected with a hashed password. Keep your credentials safe.
          </p>

          <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent-50 dark:bg-accent-500/10">
                <Shield className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-surface-800 dark:text-surface-200">
                  Password Protected
                </p>
                <p className="text-xs text-surface-500 dark:text-surface-400">
                  Your password is securely hashed and stored.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 py-3 border-b border-surface-100 dark:border-surface-800 last:border-0">
    <div className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400 shrink-0">
      <Icon className="w-4 h-4" />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-surface-400 dark:text-surface-500 font-medium uppercase tracking-wider">
        {label}
      </p>
      <p className="text-sm font-semibold text-surface-800 dark:text-surface-200 truncate">
        {value}
      </p>
    </div>
  </div>
);

export default AccountView;

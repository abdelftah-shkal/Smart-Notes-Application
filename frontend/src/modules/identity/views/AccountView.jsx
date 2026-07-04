/**
 * Workspace Flow — AccountView
 * @author Abdelfatah
 * User profile / settings page.
 */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { User, Mail, Calendar, Shield } from 'lucide-react';

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
      <div className="vintage-card p-6">
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-surface-800 dark:bg-surface-700 border border-surface-400 dark:border-surface-600 text-paper-50 text-2xl font-heading font-bold select-none">
            {initials}
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-surface-800 dark:text-paper-50">
              {account?.name || '—'}
            </h2>
            <p className="text-sm font-body text-surface-500 dark:text-surface-500 mt-0.5">
              {account?.email || '—'}
            </p>
            <span className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-surface-300 dark:border-surface-600 text-surface-600 dark:text-surface-400 text-xs font-body">
              <Shield className="w-3 h-3" /> Active Account
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-100 dark:bg-surface-800 p-1 rounded-lg border border-surface-300 dark:border-[#5D5246] w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-body transition-all duration-200 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-paper-50 dark:bg-[#2A241F] text-surface-800 dark:text-paper-50 border border-surface-300 dark:border-surface-600'
                : 'text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <div className="vintage-card p-6 space-y-4 animate-fade-in">
          <h3 className="text-base font-heading font-bold text-surface-800 dark:text-paper-50 mb-4">
            Profile Information
          </h3>

          <InfoRow icon={User} label="Full Name" value={account?.name || '—'} />
          <InfoRow icon={Mail}       label="Email"     value={account?.email || '—'} />
          <InfoRow icon={Calendar}   label="Member Since" value="Notebook Member" />

          <p className="text-xs font-body text-surface-400 dark:text-surface-500 pt-2 border-t border-surface-300 dark:border-[#5D5246]">
            To update your profile information, please contact support or use the API directly.
          </p>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="vintage-card p-6 animate-fade-in space-y-4">
          <h3 className="text-base font-heading font-bold text-surface-800 dark:text-paper-50 mb-1">
            Security Settings
          </h3>
          <p className="text-sm font-body text-surface-500 dark:text-surface-500">
            Your account is protected with a hashed password. Keep your credentials safe.
          </p>

          <div className="p-4 rounded-lg vintage-card-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-300 dark:border-surface-600">
                <Shield className="w-5 h-5 text-surface-600 dark:text-surface-400" />
              </div>
              <div>
                <p className="text-sm font-heading font-semibold text-surface-700 dark:text-paper-50">
                  Password Protected
                </p>
                <p className="text-xs font-body text-surface-500 dark:text-surface-500">
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
  <div className="flex items-center gap-4 py-3 border-b border-surface-200 dark:border-[#5D5246]/50 last:border-0">
    <div className="p-2 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-300 dark:border-surface-600 text-surface-500 dark:text-surface-400 shrink-0">
      <Icon className="w-4 h-4" />
    </div>
    <div className="min-w-0">
      <p className="text-xs font-body text-surface-400 dark:text-surface-500 font-medium uppercase tracking-wider">
        {label}
      </p>
      <p className="text-sm font-heading font-semibold text-surface-700 dark:text-paper-50 truncate">
        {value}
      </p>
    </div>
  </div>
);

export default AccountView;

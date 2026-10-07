import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, Building, ShieldCheck, Key, Bell, Palette, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('organization');

  const tabs = [
    { id: 'profile', name: 'My Profile', icon: User },
    { id: 'organization', name: 'Organization', icon: Building },
    { id: 'security', name: 'Security & Roles', icon: ShieldCheck },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'integrations', name: 'Integrations', icon: Key },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Settings</h1>
        <p className="text-sm text-slate-400">Manage your account and organization preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 shrink-0 flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                activeTab === tab.id 
                  ? "bg-blue-500/10 text-blue-400" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === 'organization' && (
            <div className="space-y-6">
              <Card className="bg-[color:var(--color-nexus-surface)] border-[color:var(--color-nexus-border)]">
                <CardHeader>
                  <CardTitle className="text-white">Organization Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-xl bg-[color:var(--color-nexus-ink)] border border-[color:var(--color-nexus-border)] flex items-center justify-center">
                      <span className="text-2xl font-bold text-slate-500">NX</span>
                    </div>
                    <div>
                      <Button variant="outline" className="border-[color:var(--color-nexus-border)] text-white hover:bg-white/5 mb-2">
                        Upload Logo
                      </Button>
                      <p className="text-xs text-slate-500">PNG, JPG up to 2MB</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Company Name</label>
                      <Input defaultValue="Nexus IT Services" className="bg-[color:var(--color-nexus-ink)] border-[color:var(--color-nexus-border)] text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">TRN / Tax Number</label>
                      <Input defaultValue="100234567890003" className="bg-[color:var(--color-nexus-ink)] border-[color:var(--color-nexus-border)] text-white" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm font-medium text-slate-300">Primary Address</label>
                      <Input defaultValue="Dubai Internet City, Building 1, Dubai, UAE" className="bg-[color:var(--color-nexus-ink)] border-[color:var(--color-nexus-border)] text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[color:var(--color-nexus-surface)] border-[color:var(--color-nexus-border)]">
                <CardHeader>
                  <CardTitle className="text-white">Regional Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Default Currency</label>
                      <select className="flex h-10 w-full rounded-md border border-[color:var(--color-nexus-border)] bg-[color:var(--color-nexus-ink)] px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                        <option value="AED">AED - UAE Dirham</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Timezone</label>
                      <select className="flex h-10 w-full rounded-md border border-[color:var(--color-nexus-border)] bg-[color:var(--color-nexus-ink)] px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                        <option value="Asia/Dubai">Asia/Dubai (+04:00)</option>
                        <option value="UTC">UTC (00:00)</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2">
                <Button variant="outline" className="border-[color:var(--color-nexus-border)] text-white hover:bg-white/5">
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeTab !== 'organization' && (
            <Card className="bg-[color:var(--color-nexus-surface)] border-[color:var(--color-nexus-border)] h-64 flex items-center justify-center">
              <div className="text-slate-400 text-sm">
                Settings module configuration pane (Mock)
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

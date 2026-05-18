"use client";

import { SettingsForm } from "@/components/settings/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]">Settings</h1>
        <p className="text-pink-200/60 mt-1 font-medium">Manage your API keys and application preferences.</p>
      </div>

      <SettingsForm />
    </div>
  );
}

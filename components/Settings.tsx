
import React from 'react';
import { Palette, RefreshCcw, Bell, Shield, ChevronRight } from 'lucide-react';
import { ThemeColor } from '../types';

interface SettingsProps {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
}

const Settings: React.FC<SettingsProps> = ({ theme, setTheme }) => {
  const themes: { id: ThemeColor; name: string; color: string }[] = [
    { id: 'indigo', name: 'Classic Indigo', color: 'bg-indigo-600' },
    { id: 'emerald', name: 'Emerald Mint', color: 'bg-emerald-600' },
    { id: 'rose', name: 'Rose Quartz', color: 'bg-rose-600' },
    { id: 'slate', name: 'Midnight Slate', color: 'bg-slate-800' },
  ];

  const handleManualReset = () => {
    if (window.confirm("Are you sure you want to clear all transactions and reset your budget manually?")) {
      localStorage.removeItem('finflow_transactions');
      window.location.reload();
    }
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-2xl font-black text-slate-900">App Settings</h2>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Personalize your experience</p>
      </header>

      {/* Theme Selection */}
      <section className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <Palette className="text-slate-400" size={20} />
          <h3 className="font-bold text-slate-900">Appearance</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`flex flex-col items-center gap-3 p-4 rounded-3xl border-2 transition-all ${
                theme === t.id ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-50 bg-slate-50/50 hover:border-slate-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-full ${t.color} shadow-lg`} />
              <span className="text-[10px] font-black uppercase tracking-tighter text-slate-600">{t.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Data Management */}
      <section className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <RefreshCcw className="text-slate-400" size={20} />
          <h3 className="font-bold text-slate-900">Data & Privacy</h3>
        </div>

        <button 
          onClick={handleManualReset}
          className="w-full flex items-center justify-between p-4 bg-rose-50 rounded-2xl group active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600">
              <RefreshCcw size={18} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-rose-900">Reset All Data</p>
              <p className="text-[10px] text-rose-400 font-bold uppercase">Manual Weekly Refresh</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-rose-300 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center text-slate-500">
            <Shield size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-700">Auto-Refresh</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Enabled (Every Monday)</p>
          </div>
        </div>
      </section>

      <footer className="text-center py-8">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">FinFlow v2.5.0</p>
      </footer>
    </div>
  );
};

export default Settings;

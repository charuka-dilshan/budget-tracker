
import React from 'react';
import { LayoutDashboard, Receipt, Wallet, Sparkles, Plus, Settings as SettingsIcon } from 'lucide-react';
import { View, ThemeColor } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  setActiveView: (view: View) => void;
  onAddClick: () => void;
  theme: ThemeColor;
}

const themeClasses = {
  indigo: {
    primary: 'bg-indigo-600',
    text: 'text-indigo-600',
    bg: 'bg-indigo-50',
    shadow: 'shadow-indigo-400',
    ring: 'ring-indigo-50'
  },
  emerald: {
    primary: 'bg-emerald-600',
    text: 'text-emerald-600',
    bg: 'bg-emerald-50',
    shadow: 'shadow-emerald-400',
    ring: 'ring-emerald-50'
  },
  rose: {
    primary: 'bg-rose-600',
    text: 'text-rose-600',
    bg: 'bg-rose-50',
    shadow: 'shadow-rose-400',
    ring: 'ring-rose-50'
  },
  slate: {
    primary: 'bg-slate-800',
    text: 'text-slate-800',
    bg: 'bg-slate-100',
    shadow: 'shadow-slate-400',
    ring: 'ring-slate-100'
  }
};

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, onAddClick, theme }) => {
  const currentTheme = themeClasses[theme];
  
  const navItems = [
    { id: View.DASHBOARD, icon: LayoutDashboard, label: 'Home' },
    { id: View.EXPENSES, icon: Receipt, label: 'History' },
    { id: View.ACCOUNTS, icon: Wallet, label: 'Cards' },
    { id: View.AI_ADVISOR, icon: Sparkles, label: 'AI' },
  ];

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-slate-50 relative shadow-xl overflow-hidden">
      {/* Header */}
      <header className="pt-8 px-6 pb-4 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-40">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">FinFlow</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Weekly Budgeting</p>
        </div>
        <button 
          onClick={() => setActiveView(View.SETTINGS)}
          className={`w-10 h-10 rounded-full ring-2 ${currentTheme.ring} p-0.5 overflow-hidden transition-all active:scale-90`}
        >
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${theme}`} alt="Profile" className="bg-slate-100" />
        </button>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto pb-32">
        {children}
      </main>

      {/* FAB */}
      <button 
        onClick={onAddClick}
        className={`fixed bottom-24 right-6 w-14 h-14 ${currentTheme.primary} text-white rounded-full shadow-2xl ${currentTheme.shadow} flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 border-4 border-white`}
      >
        <Plus size={28} strokeWidth={3} />
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 pt-4 pb-8 flex justify-between items-center z-40 rounded-t-[2.5rem] shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              activeView === item.id ? currentTheme.text : 'text-slate-400'
            }`}
          >
            <div className={`p-2 rounded-2xl transition-all ${activeView === item.id ? currentTheme.bg : ''}`}>
              <item.icon size={20} strokeWidth={activeView === item.id ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
        <button
          onClick={() => setActiveView(View.SETTINGS)}
          className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
            activeView === View.SETTINGS ? currentTheme.text : 'text-slate-400'
          }`}
        >
          <div className={`p-2 rounded-2xl transition-all ${activeView === View.SETTINGS ? currentTheme.bg : ''}`}>
            <SettingsIcon size={20} strokeWidth={activeView === View.SETTINGS ? 2.5 : 2} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Theme</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;

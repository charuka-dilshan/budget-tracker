
import React from 'react';
import { MOCK_ACCOUNTS } from '../constants';
import { Plus, CreditCard, ShieldCheck } from 'lucide-react';
import { ThemeColor } from '../types';

interface AccountsProps {
  // Added theme prop to fix TS error: Type '{ theme: ThemeColor; }' is not assignable to type 'IntrinsicAttributes'.
  theme: ThemeColor;
}

const Accounts: React.FC<AccountsProps> = ({ theme }) => {
  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">Your Cards</h2>
        <button className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg ${theme === 'slate' ? 'bg-slate-800 shadow-slate-200' : 'bg-indigo-600 shadow-indigo-200'}`}>
          <Plus size={20} />
        </button>
      </header>

      {/* Active Card */}
      {MOCK_ACCOUNTS.map((account) => (
        <div 
          key={account.id}
          className="relative p-8 rounded-[2.5rem] text-white shadow-2xl overflow-hidden aspect-[1.6/1]"
          style={{ backgroundColor: account.color }}
        >
          {/* Decorative background circle */}
          <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-white/10 rounded-full" />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium opacity-80 mb-1">{account.name}</p>
                <h3 className="text-3xl font-bold tracking-tight">Rs. {account.balance.toLocaleString()}</h3>
              </div>
              <CreditCard size={32} strokeWidth={1.5} />
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-mono tracking-[0.2em] opacity-80">**** **** **** {account.lastFour}</p>
                <div className="flex gap-8 mt-2">
                  <div>
                    <p className="text-[10px] uppercase opacity-60">CVV</p>
                    <p className="text-xs font-bold">1919</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase opacity-60">Expire</p>
                    <p className="text-xs font-bold">12/28</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-bold">Primary</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Summary Section */}
      <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <h4 className="font-bold text-slate-900 text-sm">Monthly Limits</h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500">Daily spending</span>
              <span className="font-bold text-slate-900">Rs. 1,200 / Rs. 5,000</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className={`h-full w-[24%] ${theme === 'emerald' ? 'bg-emerald-600' : theme === 'rose' ? 'bg-rose-600' : theme === 'slate' ? 'bg-slate-800' : 'bg-indigo-600'}`} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500">Savings goal</span>
              <span className="font-bold text-slate-900">Rs. 25,000 / Rs. 50,000</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[50%]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Accounts;

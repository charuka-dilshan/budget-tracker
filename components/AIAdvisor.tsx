
import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, RefreshCw, CheckCircle2 } from 'lucide-react';
import { getFinancialAdvice } from '../services/geminiService';
import { Transaction, ThemeColor } from '../types';

interface AIAdvisorProps {
  transactions: Transaction[];
  // Added theme prop to fix TS error: Type '{ transactions: Transaction[]; theme: ThemeColor; }' is not assignable to type 'IntrinsicAttributes & AIAdvisorProps'.
  theme: ThemeColor;
}

const themeTextClasses = {
  indigo: 'text-indigo-600',
  emerald: 'text-emerald-600',
  rose: 'text-rose-600',
  slate: 'text-slate-800'
};

const themeBgClasses = {
  indigo: 'bg-indigo-600',
  emerald: 'bg-emerald-600',
  rose: 'bg-rose-600',
  slate: 'bg-slate-800'
};

const AIAdvisor: React.FC<AIAdvisorProps> = ({ transactions, theme }) => {
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAdvice = async () => {
    setLoading(true);
    // Use real transactions for the AI context
    const result = await getFinancialAdvice(transactions, 4893.90);
    setAdvice(result || 'Unable to generate advice at this moment.');
    setLoading(false);
  };

  useEffect(() => {
    if (transactions.length > 0) {
      fetchAdvice();
    } else {
      setAdvice("Start entering your daily spending so I can give you personalized financial advice!");
    }
  }, []);

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <div className={`${themeBgClasses[theme]} w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-lg`}>
            <Sparkles size={16} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Weekly Analyst</h2>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Powered by Google Gemini</p>
      </header>

      {/* Main AI Interaction Area */}
      <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-8 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] rotate-12">
          <BrainCircuit size={160} />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="bg-slate-50 p-6 rounded-[2rem] min-h-[220px] flex flex-col justify-center border border-slate-100">
            {loading ? (
              <div className="flex flex-col items-center gap-4 py-8">
                <RefreshCw className={`animate-spin ${themeTextClasses[theme]}`} size={32} strokeWidth={3} />
                <p className={`text-[10px] font-black uppercase tracking-widest animate-pulse ${themeTextClasses[theme]}`}>Scanning Expenses...</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="text-slate-900 leading-relaxed font-bold text-sm whitespace-pre-line italic">
                  "{advice}"
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 bg-white/80 w-fit px-4 py-1.5 rounded-full shadow-sm">
                  <CheckCircle2 size={12} strokeWidth={3} />
                  Real-time Analysis
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={fetchAdvice}
            disabled={loading}
            className="w-full bg-slate-900 text-white font-black py-5 rounded-[2rem] flex items-center justify-center gap-2 shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-50"
          >
            <RefreshCw size={18} strokeWidth={3} className={loading ? 'animate-spin' : ''} />
            Update Insights
          </button>
        </div>
      </section>

      {/* Stats Quick View */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
          <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Safe to Spend</p>
          <p className="text-xl font-black text-emerald-950">$42.10</p>
          <p className="text-[10px] font-bold text-emerald-400 mt-1">Daily Avg</p>
        </div>
        <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100">
          <p className="text-[10px] font-black text-amber-600 uppercase mb-1">Top Sector</p>
          <p className="text-xl font-black text-amber-950">Food</p>
          <p className="text-[10px] font-bold text-amber-400 mt-1">32% of total</p>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;

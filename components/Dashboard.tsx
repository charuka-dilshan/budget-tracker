
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getIcon } from '../constants';
import { Transaction, ThemeColor } from '../types';
import { ChevronRight, TrendingDown, PlusCircle } from 'lucide-react';

interface DashboardProps {
  transactions: Transaction[];
  onAddClick: () => void;
  theme: ThemeColor;
}

const themeColors = {
  indigo: '#4F46E5',
  emerald: '#059669',
  rose: '#E11D48',
  slate: '#1E293B'
};

const themeBgClasses = {
  indigo: 'bg-indigo-600',
  emerald: 'bg-emerald-600',
  rose: 'bg-rose-600',
  slate: 'bg-slate-800'
};

const themeTextClasses = {
  indigo: 'text-indigo-600',
  emerald: 'text-emerald-600',
  rose: 'text-rose-600',
  slate: 'text-slate-800'
};

const Dashboard: React.FC<DashboardProps> = ({ transactions, onAddClick, theme }) => {
  const weeklyBudget = 3500;
  
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const weeklySpent = transactions
    .filter(tx => tx.type === 'expense' && new Date(tx.date) >= sevenDaysAgo)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const remaining = Math.max(0, weeklyBudget - weeklySpent);
  const spentPercentage = Math.min(100, Math.round((weeklySpent / weeklyBudget) * 100));

  const data = [
    { name: 'Spent', value: weeklySpent || 0.01 },
    { name: 'Remaining', value: remaining },
  ];
  const COLORS = [themeColors[theme], '#E2E8F0'];

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Weekly Goal Card */}
      <section className={`${themeBgClasses[theme]} p-6 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden transition-colors duration-500`}>
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
        <p className="text-xs font-bold opacity-70 uppercase tracking-widest mb-1">Weekly Budget Status</p>
        <div className="flex justify-between items-end">
          <h2 className="text-4xl font-bold">Rs. {remaining.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-sm font-normal opacity-60">left</span></h2>
          <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-md">
            Limit: Rs. {weeklyBudget}
          </div>
        </div>
        
        <div className="mt-6 space-y-2">
          <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-white h-full transition-all duration-1000 ease-out" 
              style={{ width: `${spentPercentage}%` }} 
            />
          </div>
          <div className="flex justify-between text-[10px] font-bold opacity-80 uppercase">
            <span>{spentPercentage}% Spent</span>
            <span>Progress</span>
          </div>
        </div>
      </section>

      {/* Spending Breakdown Donut */}
      <section className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center">
        <h3 className="w-full font-bold text-slate-800 mb-2">Usage Analysis</h3>
        <div className="h-48 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={75}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <TrendingDown size={20} className={`${themeTextClasses[theme]} mb-1 transition-colors`} />
            <p className="text-lg font-black text-slate-900">Rs. {weeklySpent.toFixed(0)}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Spent</p>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-900 text-lg">Daily Activity</h3>
          <button className={`text-xs font-bold ${themeTextClasses[theme]} flex items-center bg-slate-50 px-3 py-1.5 rounded-full`}>
            History <ChevronRight size={14} />
          </button>
        </div>
        
        <div className="space-y-3">
          {transactions.length > 0 ? (
            transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="bg-white p-4 rounded-3xl flex items-center gap-4 border border-slate-50 shadow-sm transition-all hover:scale-[1.02]">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
                  {getIcon(tx.icon)}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-sm">{tx.category}</h4>
                  <p className="text-[10px] font-medium text-slate-400">{tx.description} • {tx.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-sm ${tx.type === 'expense' ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {tx.type === 'expense' ? '-' : '+'}Rs. {tx.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div 
              onClick={onAddClick}
              className="group cursor-pointer border-2 border-dashed border-slate-200 p-8 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all hover:border-slate-300 hover:bg-slate-50"
            >
              <div className={`w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 transition-colors`}>
                <PlusCircle size={24} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-500">No activity yet</p>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Tap to add your first expense</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

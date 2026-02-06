
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getIcon } from '../constants';
import { Transaction, ThemeColor } from '../types';

interface ExpensesProps {
  transactions: Transaction[];
  // Added theme prop to fix TS error: Type '{ transactions: Transaction[]; theme: ThemeColor; }' is not assignable to type 'IntrinsicAttributes & ExpensesProps'.
  theme: ThemeColor;
}

const Expenses: React.FC<ExpensesProps> = ({ transactions, theme }) => {
  // Aggregate data for the bar chart based on actual transactions
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const chartData = days.map(day => {
    const amount = transactions
      .filter(tx => {
        const txDate = new Date(tx.date);
        return days[txDate.getDay()] === day;
      })
      .reduce((sum, tx) => sum + tx.amount, 0);
    return { day, amount };
  });

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">Spending Log</h2>
        <div className="bg-white px-4 py-1.5 rounded-full border border-slate-100 text-[10px] font-black text-indigo-600 shadow-sm uppercase">
          This Week
        </div>
      </header>

      {/* Chart */}
      <section className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 h-64 flex flex-col">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Weekly Totals (Rs.)</p>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: '#cbd5e1' }} 
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }} 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} 
              formatter={(value: number) => [`Rs. ${value.toFixed(2)}`, 'Spent']}
            />
            <Bar dataKey="amount" radius={[6, 6, 6, 6]} barSize={16}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.amount > 1000 ? '#4F46E5' : '#FBBF24'} 
                  className="transition-all duration-500"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Transaction List */}
      <section className="space-y-6 pb-4">
        <div className="space-y-3">
          {transactions.map((tx, idx) => {
            const isFirstOfDay = idx === 0 || transactions[idx-1].date !== tx.date;
            return (
              <React.Fragment key={tx.id}>
                {isFirstOfDay && (
                  <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] pt-2 px-2">
                    {tx.date === new Date().toISOString().split('T')[0] ? 'Today' : tx.date}
                  </h3>
                )}
                <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-50 shadow-sm transition-transform active:scale-95">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 text-slate-600">
                    {getIcon(tx.icon)}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-800 text-sm truncate pr-2">{tx.category}</h4>
                      <p className="font-black text-slate-900 text-sm">-Rs. {tx.amount.toFixed(2)}</p>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium truncate">{tx.description}</p>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
          {transactions.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-300 font-bold italic">Nothing spent yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Expenses;

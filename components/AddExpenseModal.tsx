
import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Transaction, ThemeColor } from '../types';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (tx: Omit<Transaction, 'id'>) => void;
  theme: ThemeColor;
}

const themeBgClasses = {
  indigo: 'bg-indigo-600 border-indigo-600',
  emerald: 'bg-emerald-600 border-emerald-600',
  rose: 'bg-rose-600 border-rose-600',
  slate: 'bg-slate-800 border-slate-800'
};

const themeFocusRing = {
  indigo: 'ring-indigo-100',
  emerald: 'ring-emerald-100',
  rose: 'ring-rose-100',
  slate: 'ring-slate-200'
};

const CATEGORIES = [
  { name: 'Breakfast', icon: 'breakfast' },
  { name: 'Lunch', icon: 'lunch' },
  { name: 'Dinner', icon: 'dinner' },
  { name: 'Transport', icon: 'car' },
  { name: 'Shopping', icon: 'shopping-bag' },
  { name: 'Housing', icon: 'home' },
  { name: 'Other things', icon: 'other-things' },
];

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ isOpen, onClose, onAdd, theme }) => {
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    onAdd({
      amount: parseFloat(amount),
      description: desc || category.name,
      category: category.name,
      icon: category.icon,
      date: new Date().toISOString().split('T')[0],
      type: 'expense'
    });
    
    setAmount('');
    setDesc('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white rounded-t-[3rem] p-8 shadow-2xl animate-in slide-in-from-bottom-full duration-500 ease-out max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-900">Add Spending</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-300">Rs.</span>
            <input
              autoFocus
              type="number"
              step="0.01"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className={`w-full pl-16 pr-6 py-8 bg-slate-50 rounded-[2rem] text-4xl font-black text-slate-900 outline-none focus:ring-4 ${themeFocusRing[theme]} transition-all placeholder:text-slate-200`}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Daily Activity</label>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-3 px-1 rounded-2xl text-[10px] font-bold transition-all border-2 ${
                    category.name === cat.name 
                    ? `${themeBgClasses[theme]} text-white shadow-lg` 
                    : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Notes</label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="e.g. Rice packet, Tea..."
              className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold text-slate-900 outline-none border-2 border-transparent focus:border-slate-100 transition-all"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-5 ${themeBgClasses[theme]} text-white rounded-[2rem] font-black text-lg shadow-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2`}
          >
            <Check size={24} strokeWidth={3} />
            Confirm Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;

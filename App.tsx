
import React, { useState, useEffect } from 'react';
import { View, Transaction, ThemeColor } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Expenses from './components/Expenses';
import Accounts from './components/Accounts';
import AIAdvisor from './components/AIAdvisor';
import AddExpenseModal from './components/AddExpenseModal';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.DASHBOARD);
  const [theme, setTheme] = useState<ThemeColor>(() => {
    return (localStorage.getItem('finflow_theme') as ThemeColor) || 'indigo';
  });
  
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('finflow_transactions');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Weekly Auto-Reset Logic
  useEffect(() => {
    const checkWeeklyReset = () => {
      const lastReset = localStorage.getItem('finflow_last_reset');
      const now = new Date();
      
      // Get ISO week number
      const getWeek = (date: Date) => {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
      };

      const currentWeek = getWeek(now);
      const lastResetWeek = lastReset ? getWeek(new Date(lastReset)) : currentWeek;

      if (lastReset && currentWeek !== lastResetWeek) {
        // It's a new week! 
        // We archive old transactions by clearing the active list (or you could move them to history)
        // For this app, we refresh the weekly view by starting fresh.
        if (window.confirm("Happy New Week! Would you like to reset your budget and start fresh?")) {
          setTransactions([]);
          localStorage.setItem('finflow_last_reset', now.toISOString());
        }
      } else if (!lastReset) {
        localStorage.setItem('finflow_last_reset', now.toISOString());
      }
    };

    checkWeeklyReset();
  }, []);

  useEffect(() => {
    localStorage.setItem('finflow_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finflow_theme', theme);
  }, [theme]);

  const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTx,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions([transaction, ...transactions]);
    setIsAddModalOpen(false);
  };

  const renderView = () => {
    switch (activeView) {
      case View.DASHBOARD:
        return <Dashboard transactions={transactions} onAddClick={() => setIsAddModalOpen(true)} theme={theme} />;
      case View.EXPENSES:
        return <Expenses transactions={transactions} theme={theme} />;
      case View.ACCOUNTS:
        return <Accounts theme={theme} />;
      case View.AI_ADVISOR:
        return <AIAdvisor transactions={transactions} theme={theme} />;
      case View.SETTINGS:
        return <Settings theme={theme} setTheme={setTheme} />;
      default:
        return <Dashboard transactions={transactions} onAddClick={() => setIsAddModalOpen(true)} theme={theme} />;
    }
  };

  return (
    <div className={`theme-${theme}`}>
      <Layout 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onAddClick={() => setIsAddModalOpen(true)}
        theme={theme}
      >
        {renderView()}
      </Layout>
      <AddExpenseModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddTransaction}
        theme={theme}
      />
    </div>
  );
};

export default App;

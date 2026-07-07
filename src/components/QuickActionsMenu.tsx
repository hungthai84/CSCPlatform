import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Home, Ticket, Users, BarChart, Settings, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const QuickActionsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const actions = [
    { id: 'home', label: 'Trang chủ', icon: Home, action: () => navigate('/') },
    { id: 'tickets', label: 'Quản lý Tickets', icon: Ticket, action: () => navigate('/tickets') },
    { id: 'customers', label: 'Khách hàng', icon: Users, action: () => navigate('/customers') },
    { id: 'reports', label: 'Báo cáo', icon: BarChart, action: () => navigate('/reports') },
    { id: 'help', label: 'Help Center', icon: BookOpen, action: () => navigate('/help') },
    { id: 'settings', label: 'Cài đặt', icon: Settings, action: () => navigate('/settings') },
    { id: 'create_ticket', label: 'Tạo vé mới', icon: Ticket, action: () => { navigate('/tickets'); /* would open ticket modal */ } }
  ];

  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  const executeAction = (action: () => void) => {
    action();
    setIsOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-0">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
          >
            <div className="flex items-center px-4 py-3 border-b border-slate-100">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input
                autoFocus
                type="text"
                placeholder="Tìm kiếm chức năng hoặc chuyển trang..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 bg-slate-100 p-1 rounded-md">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filtered.length > 0 ? (
                filtered.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => executeAction(action.action)}
                      className="w-full flex items-center px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center mr-4">
                        <Icon size={16} />
                      </div>
                      <span className="font-bold text-sm text-slate-700">{action.label}</span>
                    </button>
                  );
                })
              ) : (
                <div className="py-8 text-center text-sm font-semibold text-slate-400">
                  Không tìm thấy kết quả phù hợp.
                </div>
              )}
            </div>
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-[10px] font-bold text-slate-400 text-center">
              Sử dụng <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-500 mx-1">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-500 mx-1">↓</kbd> để di chuyển, <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-500 mx-1">Enter</kbd> để chọn
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

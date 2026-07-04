import React from 'react';
import { Search, Bell, Settings, Command } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex justify-between items-center sticky top-0 z-10 shadow-sm">
      <div className="flex-1 flex items-center">
        <div className="relative w-full max-w-md hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-12 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
            placeholder="Tìm kiếm vé hỗ trợ, khách hàng, bài viết..."
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
             <div className="flex items-center gap-1 text-xs text-slate-400 font-medium px-1.5 py-0.5 border border-slate-200 rounded bg-white">
                <Command size={12} /> K
             </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm overflow-hidden cursor-pointer">
          A
        </div>
      </div>
    </header>
  );
};


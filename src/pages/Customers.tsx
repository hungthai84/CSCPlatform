import React, { useState } from 'react';
import { mockCustomers } from '../data';
import { 
  Search, Plus, Filter, MoreHorizontal, Mail, Phone, 
  Building2, MapPin, ExternalLink, Star 
} from 'lucide-react';
import { Customer } from '../types';
import { cn } from '../lib/utils';

export const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const getVipBadge = (level: Customer['vipLevel']) => {
    switch (level) {
      case 'platinum': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'gold': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'silver': return 'bg-slate-200 text-slate-700 border-slate-300';
      default: return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  const getVipLabel = (level: Customer['vipLevel']) => {
    switch (level) {
      case 'platinum': return 'Platinum';
      case 'gold': return 'Gold';
      case 'silver': return 'Silver';
      default: return 'Standard';
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent flex-1">
      {/* Sub-Header search bar inside main card */}
      <div className="px-6 py-3 border-b border-slate-200/60 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/30">
        <div className="text-xs font-semibold text-slate-500">
          Danh sách khách hàng đang hoạt động trên hệ thống
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <div className="relative flex-1 sm:flex-none">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm khách hàng..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs w-full sm:w-48 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap shadow-sm">
            <Plus className="w-3.5 h-3.5" />
            Thêm khách hàng
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 w-12 text-center">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4">Liên hệ</th>
                <th className="px-6 py-4">Công ty</th>
                <th className="px-6 py-4">Phân hạng</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 w-12 text-center">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 text-blue-700 flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer">
                          {customer.name}
                        </div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-slate-600 text-sm hover:text-blue-600 cursor-pointer w-fit">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {customer.email}
                      </div>
                      {customer.phone && (
                        <div className="flex items-center gap-2 text-slate-600 text-sm hover:text-blue-600 cursor-pointer w-fit">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {customer.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {customer.company ? (
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        {customer.company}
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Cá nhân</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 w-fit",
                      getVipBadge(customer.vipLevel)
                    )}>
                      <Star className="w-3 h-3 fill-current" />
                      {getVipLabel(customer.vipLevel)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Xem hồ sơ">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="Tùy chọn khác">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
          <div>Hiển thị <span className="font-medium text-slate-900">{mockCustomers.length}</span> khách hàng</div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50">Trước</button>
            <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50">Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
};

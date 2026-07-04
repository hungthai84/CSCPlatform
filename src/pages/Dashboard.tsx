import React from 'react';
import { Users, Ticket, CheckCircle2, Clock } from 'lucide-react';
import { mockTickets, mockCustomers } from '../data';
import { formatDistanceToNow } from 'date-fns';

export const Dashboard = () => {
  const newTickets = mockTickets.filter(t => t.status === 'new').length;
  const inProgressTickets = mockTickets.filter(t => t.status === 'in_progress').length;
  
  return (
    <div className="space-y-6 p-6 overflow-y-auto flex-1">
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Ticket size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Vé chưa giải quyết</p>
              <h3 className="text-2xl font-bold text-slate-900">{newTickets + inProgressTickets}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">TG phản hồi lần đầu</p>
              <h3 className="text-2xl font-bold text-slate-900">14p</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Vé đã giải quyết (H.nay)</p>
              <h3 className="text-2xl font-bold text-slate-900">128</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Khách hàng hoạt động</p>
              <h3 className="text-2xl font-bold text-slate-900">{mockCustomers.length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-semibold text-slate-800">Vé hỗ trợ gần đây</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Xem tất cả</button>
          </div>
          <div className="p-0 flex-1 overflow-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-5 py-3 border-b border-slate-200">Vé hỗ trợ</th>
                  <th className="px-5 py-3 border-b border-slate-200">Trạng thái</th>
                  <th className="px-5 py-3 border-b border-slate-200">Độ ưu tiên</th>
                  <th className="px-5 py-3 border-b border-slate-200">Đã tạo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockTickets.map(ticket => (
                  <tr key={ticket.id} className="hover:bg-slate-50 cursor-pointer transition-colors">
                    <td className="px-5 py-3">
                      <div className="font-medium text-slate-900">{ticket.subject}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{ticket.id} • {ticket.customer?.name}</div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium capitalize
                        ${ticket.priority === 'urgent' ? 'bg-red-50 text-red-700' : 
                          ticket.priority === 'high' ? 'bg-orange-50 text-orange-700' : 
                          ticket.priority === 'medium' ? 'bg-blue-50 text-blue-700' : 
                          'bg-slate-100 text-slate-700'}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-500">
                      {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-5 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Trợ lý AI</h2>
          </div>
          <div className="p-5 flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg shadow-blue-500/20">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 className="font-medium text-slate-900 mb-1">OmniAI đang hoạt động</h3>
            <p className="text-sm text-slate-500 mb-4">AI đã tự động phân loại 45 vé và đề xuất 120 câu trả lời hôm nay.</p>
            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors w-full">
              Xem thông tin chi tiết AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

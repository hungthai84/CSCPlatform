import React, { useState } from 'react';
import { mockTickets } from '../data';
import { formatDistanceToNow, format } from 'date-fns';
import { 
  Filter, Search, Plus, MoreHorizontal, User, 
  Tag, Clock, AlertCircle, CheckCircle2, Circle, 
  MessageSquare, Mail, Phone, MessageCircle, ChevronDown 
} from 'lucide-react';
import { Ticket, Priority, TicketStatus, Channel } from '../types';
import { cn } from '../lib/utils';

export const Tickets = () => {
  const [activeView, setActiveView] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const views = [
    { id: 'all', label: 'Tất cả vé' },
    { id: 'open', label: 'Vé đang mở' },
    { id: 'unassigned', label: 'Chưa chỉ định' },
    { id: 'mine', label: 'Vé của tôi' },
    { id: 'overdue', label: 'Quá hạn' },
    { id: 'solved', label: 'Đã giải quyết' }
  ];

  const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
      case 'urgent': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'high': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'medium': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'low': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      default: return <Circle className="w-4 h-4 text-slate-300" />;
    }
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'assigned': return 'bg-indigo-100 text-indigo-700';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'solved': return 'bg-emerald-100 text-emerald-700';
      case 'closed': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: TicketStatus) => {
    switch (status) {
      case 'new': return 'Mới';
      case 'assigned': return 'Đã chỉ định';
      case 'in_progress': return 'Đang xử lý';
      case 'pending': return 'Đang chờ';
      case 'solved': return 'Đã giải quyết';
      case 'closed': return 'Đã đóng';
      default: return status;
    }
  };

  const getChannelIcon = (channel: Channel) => {
    switch (channel) {
      case 'email': return <Mail className="w-4 h-4 text-slate-500" />;
      case 'chat': return <MessageSquare className="w-4 h-4 text-slate-500" />;
      case 'call': return <Phone className="w-4 h-4 text-slate-500" />;
      case 'facebook': return <MessageCircle className="w-4 h-4 text-blue-600" />;
      default: return <MessageSquare className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent flex-1">
      {/* Sub-Header bar inside the Main Content Card */}
      <div className="px-6 py-3 border-b border-slate-200/60 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/30">
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {views.map(view => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer",
                activeView === view.id 
                  ? "bg-slate-200/80 text-slate-800" 
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              )}
            >
              {view.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <div className="relative flex-1 sm:flex-none">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm vé..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs w-full sm:w-48 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap shadow-sm">
            <Plus className="w-3.5 h-3.5" />
            Thêm vé mới
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Views */}
        <div className="w-64 border-r border-slate-200 bg-slate-50/30 flex-col py-4 hidden md:flex overflow-y-auto">
          <div className="px-4 mb-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chế độ xem</h3>
          </div>
          <nav className="flex-1 px-2 space-y-1">
            {views.map(view => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors",
                  activeView === view.id 
                    ? "bg-blue-50 text-blue-700 font-medium" 
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <span>{view.label}</span>
                {view.id === 'open' && <span className="bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded text-xs">2</span>}
              </button>
            ))}
          </nav>
          
          <div className="px-4 mt-6 mb-2 border-t border-slate-200 pt-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lọc theo thẻ</h3>
          </div>
          <div className="px-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs cursor-pointer hover:bg-slate-200">
              <Tag className="w-3 h-3" /> VIP
            </span>
            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs cursor-pointer hover:bg-slate-200">
              <Tag className="w-3 h-3" /> Lỗi kỹ thuật
            </span>
            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs cursor-pointer hover:bg-slate-200">
              <Tag className="w-3 h-3" /> Thanh toán
            </span>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 text-slate-500 font-medium text-xs uppercase tracking-wider sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-6 py-4 border-b border-slate-200 w-12 text-center">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="px-6 py-4 border-b border-slate-200">Liên hệ</th>
                <th className="px-6 py-4 border-b border-slate-200">Chủ đề</th>
                <th className="px-6 py-4 border-b border-slate-200">Trạng thái</th>
                <th className="px-6 py-4 border-b border-slate-200">Mức độ</th>
                <th className="px-6 py-4 border-b border-slate-200">Phụ trách</th>
                <th className="px-6 py-4 border-b border-slate-200 text-right">Cập nhật lúc</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {mockTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 w-12 text-center">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold text-xs shrink-0">
                        {ticket.customer?.name.charAt(0) || 'U'}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 text-sm">{ticket.customer?.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          {getChannelIcon(ticket.channel)}
                          {ticket.customer?.company || ticket.channel}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 text-sm mb-0.5 group-hover:text-blue-600 transition-colors">
                      {ticket.subject}
                    </div>
                    <div className="text-xs text-slate-500 font-mono">{ticket.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium border border-transparent whitespace-nowrap", getStatusColor(ticket.status))}>
                      {getStatusLabel(ticket.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5" title={ticket.priority}>
                      {getPriorityIcon(ticket.priority)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {ticket.assignee ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
                          {ticket.assignee.name.charAt(0)}
                        </div>
                        <span className="text-sm text-slate-600 truncate max-w-[100px]">{ticket.assignee.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-400 italic">Chưa có</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-slate-500 whitespace-nowrap">
                    {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

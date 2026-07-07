import React, { useState } from 'react';
import { mockTickets } from '../data';
import { formatDistanceToNow } from 'date-fns';
import { 
  Filter, Search, Plus, MoreHorizontal, User, 
  Tag, Clock, AlertCircle, CheckCircle2, Circle, 
  MessageSquare, Mail, Phone, MessageCircle, ChevronDown,
  LayoutGrid, List, Sparkles, BrainCircuit, Activity,
  Ticket as TicketIcon
} from 'lucide-react';
import { Ticket, Priority, TicketStatus, Channel } from '../types';
import { cn } from '../lib/utils';
import { PageBanner } from '../components/PageBanner';

export const Tickets = () => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'sentiment' | 'routing'>('tickets');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');

  const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
      case 'urgent': return <AlertCircle className="w-4 h-4 text-red-500 animate-pulse" />;
      case 'high': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'medium': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'low': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      default: return <Circle className="w-4 h-4 text-slate-300" />;
    }
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case 'new': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'assigned': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'in_progress': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'pending': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'solved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'closed': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusLabel = (status: TicketStatus) => {
    switch (status) {
      case 'new': return 'Mới nhận';
      case 'assigned': return 'Đã giao';
      case 'in_progress': return 'Đang xử lý';
      case 'pending': return 'Đang chờ';
      case 'solved': return 'Đã giải quyết';
      case 'closed': return 'Đã đóng';
      default: return status;
    }
  };

  const getChannelIcon = (channel: Channel) => {
    switch (channel) {
      case 'email': return <Mail className="w-3.5 h-3.5 text-slate-500" />;
      case 'chat': return <MessageSquare className="w-3.5 h-3.5 text-slate-500" />;
      case 'call': return <Phone className="w-3.5 h-3.5 text-slate-500" />;
      case 'facebook': return <MessageCircle className="w-3.5 h-3.5 text-blue-600" />;
      default: return <MessageSquare className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const getSentimentDetails = (subject: string) => {
    const text = subject.toLowerCase();
    if (text.includes('lỗi') || text.includes('không thể') || text.includes('hỏng') || text.includes('crash') || text.includes('chậm')) {
      return {
        label: 'Tiêu cực',
        class: 'bg-rose-50 text-rose-700 border-rose-200/60',
        dot: 'bg-rose-500',
        emoji: '😠'
      };
    } else if (text.includes('cám ơn') || text.includes('tuyệt vời') || text.includes('thích') || text.includes('hài lòng') || text.includes('chào') || text.includes('hỏi')) {
      return {
        label: 'Tích cực',
        class: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
        dot: 'bg-emerald-500',
        emoji: '😊'
      };
    } else {
      return {
        label: 'Trung lập',
        class: 'bg-slate-50 text-slate-600 border-slate-200/60',
        dot: 'bg-slate-400',
        emoji: '😐'
      };
    }
  };

  const filteredTickets = mockTickets.filter(t => {
    const matchesSearch = t.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (t.customer?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    const matchesChannel = channelFilter === 'all' || t.channel === channelFilter;
    return matchesSearch && matchesPriority && matchesChannel;
  });

  return (
    <div className="flex flex-col gap-6 w-full pb-10 select-none">
      
      {/* 1. BANNER */}
      <PageBanner 
        icon={TicketIcon}
        title="Quản lý Phiếu hỗ trợ (Tickets)"
        description="Xử lý, định tuyến và phân loại mọi yêu cầu từ khách hàng qua đa kênh tập trung."
      />

      {/* 2. TAB: Sub-navigation */}
      <div className="flex border border-slate-200/60 bg-white rounded-[10px] p-1 shadow-sm w-full max-w-[420px]">
        {[
          { id: 'tickets', label: 'Tất cả vé tiếp nhận', icon: LayoutGrid },
          { id: 'sentiment', label: 'Chỉ số cảm xúc AI', icon: Sparkles },
          { id: 'routing', label: 'Quy tắc định tuyến', icon: BrainCircuit }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 rounded-[8px] text-[11.5px] font-bold transition-all cursor-pointer",
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            )}
          >
            <tab.icon size={14} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 3. THẺ THỐNG KÊ (Statistics Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'VÉ CHƯA CHỈ ĐỊNH', value: mockTickets.filter(t => !t.assigneeId).length, sub: 'Cần phân phối nhanh', color: 'text-blue-600' },
          { title: 'VÉ ĐANG XỬ LÝ', value: mockTickets.filter(t => t.status === 'in_progress').length, sub: 'Thời hạn SLA còn tốt', color: 'text-amber-600' },
          { title: 'ĐÃ GIẢI QUYẾT', value: mockTickets.filter(t => t.status === 'solved' || t.status === 'closed').length, sub: 'Trong vòng 24h qua', color: 'text-emerald-600' },
          { title: 'VÉ QUÁ HẠN XỬ LÝ', value: '0 vé', sub: 'Tuyệt vời! Không bị trễ hạn', color: 'text-red-600 animate-pulse' }
        ].map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4.5 hover:shadow-md transition-all">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{card.title}</p>
            <h3 className={cn("text-xl font-black mt-1", card.color)}>{card.value}</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Status: {card.sub}</p>
          </div>
        ))}
      </div>

      {/* 4. NỘI DUNG CHÍNH */}
      {activeTab === 'tickets' ? (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-6">
          
          {/* Toolbar header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-extrabold text-slate-800">Quy trình xử lý vé hỗ trợ</h2>
              <div className="bg-slate-100/80 p-1 rounded-[10px] flex items-center gap-1 border border-slate-200/50 shadow-inner shrink-0">
                <button
                  onClick={() => setViewMode('table')}
                  className={cn(
                    "px-3 py-1 rounded-[8px] text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                    viewMode === 'table' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  )}
                >
                  Dạng bảng
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={cn(
                    "px-3 py-1 rounded-[8px] text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                    viewMode === 'cards' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  )}
                >
                  Dạng thẻ
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-[8px] text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
                <Plus size={13} /> Tạo vé hỗ trợ mới
              </button>
            </div>
          </div>

          {/* Filters row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Search bar */}
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm chủ đề vé, khách hàng, ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold rounded-[10px] w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-slate-400"
              />
            </div>

            {/* Priority filter */}
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 shrink-0">MỨC ĐỘ:</span>
              <select 
                value={priorityFilter} 
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-[10px] py-2 px-3 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">Tất cả mức độ</option>
                <option value="urgent">Khẩn cấp</option>
                <option value="high">Cao</option>
                <option value="medium">Trung bình</option>
                <option value="low">Thấp</option>
              </select>
            </div>

            {/* Channel filter */}
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 shrink-0">KÊNH HỖ TRỢ:</span>
              <select 
                value={channelFilter} 
                onChange={(e) => setChannelFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-[10px] py-2 px-3 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">Tất cả kênh</option>
                <option value="email">Email</option>
                <option value="chat">Livechat</option>
                <option value="facebook">Facebook</option>
                <option value="call">Điện thoại</option>
              </select>
            </div>
          </div>

          {/* Tickets Display */}
          {viewMode === 'table' ? (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 w-12 text-center">
                      <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    </th>
                    <th className="px-6 py-4">Khách hàng</th>
                    <th className="px-6 py-4">Chủ đề</th>
                    <th className="px-6 py-4">Cảm xúc AI</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4">Mức độ</th>
                    <th className="px-6 py-4">Người phụ trách</th>
                    <th className="px-6 py-4 text-right">Cập nhật lúc</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer">
                      <td className="px-6 py-4 w-12 text-center">
                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-800">
                        {ticket.customer?.name}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {ticket.subject}
                        <div className="text-[10px] text-slate-400 font-mono font-semibold mt-0.5">Mã: {ticket.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        {(() => {
                          const sentiment = getSentimentDetails(ticket.subject);
                          return (
                            <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold border whitespace-nowrap shadow-sm", sentiment.class)}>
                              <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", sentiment.dot)} />
                              <span>{sentiment.emoji} {sentiment.label}</span>
                            </span>
                          );
                        })()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-extrabold border whitespace-nowrap uppercase tracking-wider", getStatusColor(ticket.status))}>
                          {getStatusLabel(ticket.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5" title={ticket.priority}>
                          {getPriorityIcon(ticket.priority)}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-700">
                        {ticket.assignee ? ticket.assignee.name : 'Chưa giao'}
                      </td>
                      <td className="px-6 py-4 text-right text-slate-400 font-bold whitespace-nowrap">
                        {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredTickets.map((ticket) => {
                const sentiment = getSentimentDetails(ticket.subject);
                return (
                  <div key={ticket.id} className="border border-slate-200/80 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {ticket.id}
                        </span>
                        <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold border", sentiment.class)}>
                          {sentiment.emoji} {sentiment.label}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{ticket.subject}</h4>
                      <p className="text-[10px] text-slate-500 font-semibold mt-2">Khách hàng: {ticket.customer?.name}</p>
                    </div>

                    <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                      <span className={cn("text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider border", getStatusColor(ticket.status))}>
                        {getStatusLabel(ticket.status)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">
                        {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      ) : activeTab === 'sentiment' ? (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-4">
          <h3 className="text-sm font-extrabold text-slate-800">Chỉ số phân tích cảm xúc (AI-Driven Sentiment)</h3>
          <p className="text-xs text-slate-500 font-semibold">Tự động phân tích tâm trạng khách hàng thông qua từ khóa và giọng điệu để điều phối vé ưu tiên.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="border border-rose-100 bg-rose-50/20 rounded-xl p-5">
              <h4 className="text-xs font-bold text-rose-700 uppercase tracking-widest">Khách hàng tiêu cực</h4>
              <p className="text-2xl font-black text-rose-900 mt-1">67%</p>
              <p className="text-[10px] text-rose-500 font-semibold mt-2">Cần phản hồi hoặc đền bù dịch vụ khẩn cấp.</p>
            </div>
            <div className="border border-emerald-100 bg-emerald-50/20 rounded-xl p-5">
              <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Khách hàng hài lòng</h4>
              <p className="text-2xl font-black text-emerald-900 mt-1">33%</p>
              <p className="text-[10px] text-emerald-500 font-semibold mt-2">Đánh giá tốt hoặc phản hồi tích cực.</p>
            </div>
            <div className="border border-slate-200 bg-slate-50 rounded-xl p-5">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Trung lập</h4>
              <p className="text-2xl font-black text-slate-900 mt-1">0%</p>
              <p className="text-[10px] text-slate-500 font-semibold mt-2">Các câu hỏi hoặc thắc mắc cơ bản.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-4">
          <h3 className="text-sm font-extrabold text-slate-800">Quy tắc định tuyến tự động</h3>
          <p className="text-xs text-slate-500 font-semibold">Cấu hình các kịch bản định tuyến tự động phân phối vé tiếp nhận đến đúng nhân viên trực ca dựa trên kỹ năng.</p>
          <div className="border border-slate-200 rounded-xl p-8 text-center text-slate-400 mt-2">
            <Activity className="mx-auto mb-2 text-slate-300" />
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-widest">Đang tải cấu hình định tuyến</h4>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Hệ thống đang đồng bộ với kịch bản máy học OmiAI...</p>
          </div>
        </div>
      )}

    </div>
  );
};

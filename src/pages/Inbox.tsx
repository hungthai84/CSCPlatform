import React, { useState } from 'react';
import { mockTickets, mockMessages } from '../data';
import { formatDistanceToNow, format } from 'date-fns';
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Phone, 
  Video, 
  Info, 
  Inbox, 
  MessageSquare,
  Users,
  Activity,
  Search,
  Filter,
  Layers,
  Sparkles,
  CheckCircle,
  HelpCircle,
  Plus
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Ticket, Message } from '../types';
import { PageBanner } from '../components/PageBanner';

export const OmnichannelInbox = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'assigned' | 'unassigned'>('all');
  const [viewMode, setViewMode] = useState<'inbox' | 'history'>('inbox');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(mockTickets[1].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [channelFilter, setChannelFilter] = useState('all');

  const selectedTicket = mockTickets.find(t => t.id === selectedTicketId);
  const ticketMessages = mockMessages.filter(m => m.ticketId === selectedTicketId);

  // Filter messages based on tab & search
  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChannel = channelFilter === 'all' || ticket.channel === channelFilter;
    
    if (activeTab === 'assigned') {
      return matchesSearch && matchesChannel && ticket.assigneeId;
    }
    if (activeTab === 'unassigned') {
      return matchesSearch && matchesChannel && !ticket.assigneeId;
    }
    return matchesSearch && matchesChannel;
  });

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      
      {/* 1. BANNER */}
      <PageBanner 
        icon={Inbox}
        title="Hộp thư đa kênh (Omnichannel Inbox)"
        description="Tiếp nhận, quản lý và phản hồi tương tác khách hàng từ tất cả các kênh tập trung tại một màn hình duy nhất."
      />

      {/* 2. TAB: Sub-navigation */}
      <div className="flex border border-slate-200/60 bg-white rounded-[10px] p-1 shadow-sm w-full max-w-[420px]">
        {[
          { id: 'all', label: 'Tất cả hội thoại', icon: MessageSquare },
          { id: 'assigned', label: 'Đã phân công', icon: Users },
          { id: 'unassigned', label: 'Chờ tiếp nhận', icon: Activity }
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { 
            title: 'HỘI THOẠI CHƯA ĐÓNG', 
            value: mockTickets.filter(t => t.status !== 'closed').length, 
            sub: 'Đang phản hồi trực tiếp',
            color: 'bg-blue-600'
          },
          { 
            title: 'THỜI GIAN PHẢN HỒI TB', 
            value: '4.2 phút', 
            sub: 'SLA cam kết dưới 15 phút',
            color: 'bg-emerald-600'
          },
          { 
            title: 'TỶ LỆ TỰ ĐỘNG GIẢI QUYẾT', 
            value: '35.4%', 
            sub: 'Xử lý qua bot thông minh',
            color: 'bg-violet-600'
          }
        ].map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{card.title}</p>
            <h3 className="text-xl font-black text-slate-800 mt-1">{card.value}</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Status: {card.sub}</p>
          </div>
        ))}
      </div>

      {/* 4. NỘI DUNG CHÍNH */}
      <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-6">
        
        {/* Toolbar header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-extrabold text-slate-800">Trạm xử lý tin nhắn đa kênh</h2>
            <div className="bg-slate-100/80 p-1 rounded-[10px] flex items-center gap-1 border border-slate-200/50 shadow-inner shrink-0">
              <button
                onClick={() => setViewMode('inbox')}
                className={cn(
                  "px-3 py-1 rounded-[8px] text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                  viewMode === 'inbox' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                )}
              >
                Hộp thư chính
              </button>
              <button
                onClick={() => setViewMode('history')}
                className={cn(
                  "px-3 py-1 rounded-[8px] text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                  viewMode === 'history' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                )}
              >
                Nhật ký lưu trữ
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSelectedTicketId(mockTickets[0].id)}
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100/80 px-3 py-1.5 rounded-[8px] text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <Plus size={13} /> Tạo hội thoại mới
            </button>
          </div>
        </div>

        {viewMode === 'inbox' ? (
          <div className="flex flex-col gap-4">
            {/* Search and filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên khách hoặc tiêu đề cuộc trò chuyện..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-[10px] py-2 pl-9 pr-4 text-xs font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 shrink-0">KÊNH ĐỔ VỀ:</span>
                <select
                  value={channelFilter}
                  onChange={(e) => setChannelFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-[10px] py-2 px-3 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                >
                  <option value="all">Tất cả kênh</option>
                  <option value="email">Email</option>
                  <option value="chat">Livechat</option>
                  <option value="call">Điện thoại</option>
                </select>
              </div>
            </div>

            {/* Split layout */}
            <div className="border border-slate-200 rounded-xl overflow-hidden flex h-[500px] w-full relative">
              {/* Left Sidebar - Ticket List */}
              <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50/50 shrink-0">
                <div className="flex-1 overflow-y-auto">
                  {filteredTickets.length > 0 ? (
                    filteredTickets.map(ticket => (
                      <div 
                        key={ticket.id}
                        onClick={() => setSelectedTicketId(ticket.id)}
                        className={cn(
                          "p-4 border-b border-slate-100 cursor-pointer transition-all relative",
                          selectedTicketId === ticket.id ? "bg-blue-50/70" : "hover:bg-slate-50"
                        )}
                      >
                        {selectedTicketId === ticket.id && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
                        )}
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-extrabold text-slate-900 text-xs truncate pr-2">{ticket.customer?.name}</span>
                          <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">
                            {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: false })}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-semibold truncate mb-1">{ticket.subject}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={cn("text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider",
                            ticket.channel === 'email' ? 'bg-purple-100 text-purple-700' :
                            ticket.channel === 'chat' ? 'bg-blue-100 text-blue-700' :
                            'bg-emerald-100 text-emerald-700'
                          )}>
                            {ticket.channel}
                          </span>
                          <span className={cn("text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider",
                            ticket.status === 'new' ? 'bg-red-100 text-red-700' :
                            ticket.status === 'in_progress' ? 'bg-amber-100 text-amber-700' :
                            'bg-slate-100 text-slate-700'
                          )}>
                            {ticket.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-xs text-slate-400 font-bold">Không tìm thấy hội thoại.</div>
                  )}
                </div>
              </div>

              {/* Center - Conversation View */}
              {selectedTicket ? (
                <div className="flex-1 flex flex-col bg-white min-w-0">
                  {/* Header */}
                  <div className="h-14 border-b border-slate-200 flex items-center justify-between px-6 bg-white shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-blue-700 font-black text-xs">
                        {selectedTicket.customer?.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          {selectedTicket.customer?.name}
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        </h3>
                        <p className="text-[10px] text-slate-500 font-semibold">{selectedTicket.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <button className="p-1.5 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors"><Phone size={15} /></button>
                      <button className="p-1.5 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors"><Video size={15} /></button>
                    </div>
                  </div>
                  
                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
                    {ticketMessages.map((msg, idx) => {
                      const isCustomer = msg.senderType === 'customer';
                      return (
                        <div key={msg.id} className={cn("flex max-w-[80%]", isCustomer ? "justify-start" : "justify-end ml-auto")}>
                          {isCustomer && (
                             <div className="w-6 h-6 rounded-full bg-blue-100 flex-shrink-0 mr-2 mt-1 flex items-center justify-center text-blue-700 text-[10px] font-bold">
                               {selectedTicket.customer?.name.charAt(0)}
                             </div>
                          )}
                          <div className={cn(
                            "p-3 rounded-xl shadow-sm text-xs",
                            isCustomer 
                              ? "bg-white border border-slate-200 text-slate-800 rounded-tl-none font-medium" 
                              : "bg-blue-600 text-white rounded-tr-none font-bold"
                          )}>
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                            <div className={cn("text-[9px] mt-1.5 flex items-center gap-1", isCustomer ? "text-slate-400" : "text-blue-200")}>
                              {format(new Date(msg.createdAt), 'h:mm a')}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Composer */}
                  <div className="p-3 border-t border-slate-200 bg-white shrink-0">
                    <div className="flex items-center justify-between mb-1 px-1">
                      <div className="flex gap-3 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                        <button className="hover:text-blue-600 text-blue-600 cursor-pointer">Trả lời trực tiếp</button>
                        <button className="hover:text-amber-600 cursor-pointer">Ghi chú nội bộ</button>
                      </div>
                      <button className="flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded hover:bg-purple-100 transition-colors cursor-pointer">
                        <Sparkles size={11} /> Gợi ý AI
                      </button>
                    </div>
                    <div className="border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all bg-white flex items-center px-3">
                      <input 
                        className="w-full py-2.5 outline-none text-xs bg-transparent"
                        placeholder="Nhập câu trả lời gửi đến khách hàng..."
                      />
                      <button className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-lg flex items-center justify-center cursor-pointer transition-colors shrink-0 ml-2">
                        <Send size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-slate-50 text-slate-400 flex-col">
                  <Inbox size={42} className="mb-2 text-slate-300" />
                  <p className="text-xs font-bold">Chọn cuộc hội thoại để bắt đầu</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-8 text-center text-slate-400">
            <Inbox size={32} className="mx-auto mb-2 text-slate-300" />
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-widest">Lịch sử tương tác lưu trữ</h4>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Các phiên giao tiếp cũ đã được phân loại lưu hồ sơ đầy đủ.</p>
          </div>
        )}
      </div>

    </div>
  );
};

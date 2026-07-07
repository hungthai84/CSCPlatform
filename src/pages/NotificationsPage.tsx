import React, { useState } from 'react';
import { 
  Bell, Check, Clock, Trash2, ShieldAlert, Search, Filter, 
  Settings, Mail, Eye, Info, Volume2, Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';
import { PageBanner } from '../components/PageBanner';

export const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'tickets' | 'alerts'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'ticket', title: 'Yêu cầu hỗ trợ mới #1042', description: 'Khách hàng Nguyễn Văn A vừa mở vé hỗ trợ mới về lỗi "Hóa đơn thanh toán".', time: '5 phút trước', read: false },
    { id: 2, type: 'alert', title: 'Cập nhật hệ thống v2.5 hoàn tất', description: 'Đã loại bỏ thanh header, tích hợp toàn bộ tùy chọn vào Profile Sidebar và tối ưu hóa diện tích.', time: '2 giờ trước', read: false },
    { id: 3, type: 'alert', title: 'Vé hỗ trợ #1029 quá hạn xử lý (SLA)', description: 'Mức độ ưu tiên cao nhưng đã vượt quá 4 giờ quy chuẩn phản hồi.', time: '1 ngày trước', read: true },
    { id: 4, type: 'ticket', title: 'Phản hồi mới từ khách hàng Trần Thảo', description: 'Khách hàng đã trả lời vé #1011 của bạn: "Tôi đã thử lại và thành công..."', time: '2 ngày trước', read: true }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                       (activeTab === 'tickets' && n.type === 'ticket') || 
                       (activeTab === 'alerts' && n.type === 'alert');
    return matchesSearch && matchesTab;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount = notifications.filter(n => n.read).length;
  const criticalCount = notifications.filter(n => n.title.includes('SLA') || n.title.includes('quá hạn')).length;

  return (
    <div className="flex flex-col gap-6 w-full pb-10 select-none">
      
      {/* 1. BANNER */}
      <PageBanner 
        icon={Bell}
        title="Trung tâm Thông báo"
        description="Theo dõi hoạt động, cập nhật hệ thống và cảnh báo ưu tiên từ tất cả các Module."
      />

      {/* 2. TAB: Sub-navigation */}
      <div className="flex border border-slate-200/60 bg-white rounded-[10px] p-1 shadow-sm w-full max-w-[420px]">
        {[
          { id: 'all', label: 'Tất cả thông báo', icon: Bell },
          { id: 'tickets', label: 'Vé hỗ trợ mới', icon: Mail },
          { id: 'alerts', label: 'Cảnh báo hệ thống', icon: ShieldAlert }
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'CHƯA ĐỌC', value: unreadCount + ' tin nhắn', sub: 'Cần cập nhật kịp thời', color: 'text-blue-600' },
          { title: 'ĐÃ ĐỌC', value: readCount + ' tin nhắn', sub: 'Lưu trữ lịch sử an toàn', color: 'text-slate-500' },
          { title: 'CẢNH BÁO QUÁ HẠN SLA', value: criticalCount + ' cảnh báo', sub: 'Cần xử lý khẩn cấp', color: 'text-rose-600 font-extrabold animate-pulse' },
          { title: 'TỐC ĐỘ GỬI TIN', value: 'Instant (< 1s)', sub: 'Đồng bộ OmiAI rảnh tay', color: 'text-emerald-600' }
        ].map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4.5 hover:shadow-md transition-all">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{card.title}</p>
            <h3 className={cn("text-xl font-black mt-1", card.color)}>{card.value}</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Status: {card.sub}</p>
          </div>
        ))}
      </div>

      {/* 4. NỘI DUNG CHÍNH */}
      <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-6">
        
        {/* Toolbar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-extrabold text-slate-800">Hộp thư thông báo vận hành</h2>
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Giữ kết nối với tất cả cập nhật, hoạt động của vé hỗ trợ và tin nhắn của khách hàng.</p>
          </div>
          <button 
            type="button"
            onClick={markAllRead}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-1.5 rounded-[8px] text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200/50 shadow-sm"
          >
            <Check size={13} /> Đánh dấu đã đọc tất cả
          </button>
        </div>

        {/* Filter / Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm tiêu đề hoặc nội dung thông báo..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 py-2 border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold rounded-[10px] w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-slate-400"
          />
        </div>

        {/* Notification list display */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs font-semibold">
              Hộp thư thông báo của bạn trống sạch sẽ!
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div 
                key={notif.id} 
                className={cn(
                  "p-5 flex gap-4 hover:bg-slate-50/50 transition-colors relative group",
                  !notif.read ? "bg-blue-50/20" : ""
                )}
              >
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center border shrink-0",
                  notif.title.includes('SLA') 
                    ? "bg-rose-50 text-rose-600 border-rose-100" 
                    : !notif.read 
                    ? "bg-blue-50 text-blue-600 border-blue-100" 
                    : "bg-slate-50 text-slate-400 border-slate-200"
                )}>
                  {notif.title.includes('SLA') ? <ShieldAlert size={16} className="animate-pulse" /> : <Bell size={16} />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className={cn(
                      "text-xs truncate",
                      !notif.read ? "font-extrabold text-slate-900" : "font-bold text-slate-700"
                    )}>
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-bold shrink-0 flex items-center gap-1">
                      <Clock size={11} /> {notif.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-semibold">
                    {notif.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                  <button 
                    onClick={() => deleteNotification(notif.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Xóa thông báo"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  mockTickets, 
  mockCustomers, 
  mockAgents 
} from '../data';
import { 
  Ticket as TicketIcon, 
  Clock, 
  Smile, 
  Users, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  ArrowUpRight, 
  TrendingUp, 
  RefreshCw,
  Plus,
  HelpCircle,
  FileText
} from 'lucide-react';
import { cn } from '../lib/utils';
import { formatDistanceToNow } from 'date-fns';

import { PageBanner } from '../components/PageBanner';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'channels'>('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [tickets, setTickets] = useState(mockTickets);

  // Statistics calculations
  const totalTickets = tickets.length;
  const newTickets = tickets.filter(t => t.status === 'new').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in_progress').length;
  const pendingTickets = tickets.filter(t => t.status === 'pending' || t.status === 'assigned').length;

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (t.customer?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const handleCreateQuickTicket = () => {
    const newTkt = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: 'Yêu cầu hỗ trợ khẩn cấp qua kênh trực tiếp',
      status: 'new' as const,
      priority: 'high' as const,
      channel: 'chat' as const,
      customerId: 'c1',
      customer: mockCustomers[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTickets([newTkt, ...tickets]);
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      
      {/* 1. BANNER */}
      <PageBanner 
        icon={LayoutGrid}
        title="Tổng quan Bảng điều khiển (Dashboard)"
        description="Theo dõi toàn diện các chỉ số hiệu suất, SLA giải quyết và phân bổ vé theo thời gian thực."
      />

      {/* 2. TAB: Sub-navigation */}
      <div className="flex border border-slate-200/60 bg-white rounded-[10px] p-1 shadow-sm w-full max-w-[420px]">
        {[
          { id: 'overview', label: 'Tổng quan vận hành', icon: LayoutGrid },
          { id: 'performance', label: 'SLA & Hiệu suất', icon: TrendingUp },
          { id: 'channels', label: 'Kênh tương tác', icon: Users }
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
          { 
            title: 'YÊU CẦU CHƯA XỬ LÝ', 
            value: newTickets + pendingTickets, 
            sub: `${newTickets} vé mới tinh`, 
            color: 'from-blue-500 to-indigo-600', 
            icon: TicketIcon,
            trend: '+12% so với hôm qua'
          },
          { 
            title: 'SLA ĐÁP ỨNG', 
            value: '98.4%', 
            sub: 'Thời gian phản hồi ~12ph', 
            color: 'from-emerald-500 to-teal-600', 
            icon: Clock,
            trend: 'Giữ vững mục tiêu cam kết'
          },
          { 
            title: 'ĐỘ HÀI LÒNG CSAT', 
            value: '4.85 / 5', 
            sub: 'Dựa trên 142 phản hồi', 
            color: 'from-violet-500 to-purple-600', 
            icon: Smile,
            trend: 'Tăng 0.1 điểm tuần này'
          },
          { 
            title: 'ĐẠI DIỆN TRỰC CA', 
            value: `${mockAgents.length} nhân sự`, 
            sub: 'Đang hoạt động trực tiếp', 
            color: 'from-amber-500 to-orange-600', 
            icon: Users,
            trend: 'Đủ năng lực tải hệ thống'
          }
        ].map((card, idx) => (
          <div 
            key={idx} 
            className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-all hover:scale-[1.01] group relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{card.title}</p>
                <h3 className="text-2xl font-black text-slate-800 mt-1">{card.value}</h3>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 transition-colors">
                <card.icon size={18} />
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold border-t border-slate-100 pt-3">
              <span className="text-emerald-600 text-[10px] font-bold bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <ArrowUpRight size={10} />
                {card.trend}
              </span>
              <span className="text-[10px] text-slate-400">| {card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. NỘI DUNG CHÍNH */}
      <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-6">
        
        {/* Toolbar header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-extrabold text-slate-800">Thông tin vận hành trực quan</h2>
            <div className="bg-slate-100/80 p-1 rounded-[10px] flex items-center gap-1 border border-slate-200/50 shadow-inner shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "px-3 py-1 rounded-[8px] text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                  viewMode === 'grid' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                )}
              >
                <LayoutGrid size={13} /> Dạng lưới
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={cn(
                  "px-3 py-1 rounded-[8px] text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                  viewMode === 'table' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                )}
              >
                <List size={13} /> Dạng bảng
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleCreateQuickTicket} 
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100/80 px-3 py-1.5 rounded-[8px] text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <Plus size={13} /> Tạo vé khẩn cấp
            </button>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-[8px] text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <RefreshCw size={13} /> Tải lại dữ liệu
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="flex flex-col gap-6">
            {/* Filters section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm vé theo chủ đề, tên khách hàng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-[10px] py-2 pl-9 pr-4 text-xs font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 shrink-0">ĐỘ ƯU TIÊN:</span>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-[10px] py-2 px-3 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                >
                  <option value="all">Tất cả độ ưu tiên</option>
                  <option value="urgent">Khẩn cấp</option>
                  <option value="high">Cao</option>
                  <option value="medium">Trung bình</option>
                  <option value="low">Thấp</option>
                </select>
              </div>
            </div>

            {/* Display contents */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredTickets.map(tkt => (
                  <div key={tkt.id} className="border border-slate-200/70 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {tkt.id}
                      </span>
                      <span className={cn(
                        "text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider",
                        tkt.priority === 'urgent' ? 'bg-red-50 text-red-600 border border-red-100' :
                        tkt.priority === 'high' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                        'bg-slate-50 text-slate-600 border border-slate-100'
                      )}>
                        {tkt.priority}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{tkt.subject}</h4>
                      <p className="text-[10px] text-slate-500 font-semibold mt-1">Khách hàng: {tkt.customer?.name}</p>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-1">
                      <span className={cn(
                        "text-[9px] font-extrabold px-1.5 py-0.5 rounded-md",
                        tkt.status === 'new' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                        tkt.status === 'in_progress' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                        'bg-slate-100 text-slate-600'
                      )}>
                        {tkt.status}
                      </span>
                      <span className="text-[9px] text-slate-400 font-bold">
                        {formatDistanceToNow(new Date(tkt.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="p-3 text-[10px] font-bold uppercase text-slate-400">Mã vé</th>
                      <th className="p-3 text-[10px] font-bold uppercase text-slate-400">Chủ đề</th>
                      <th className="p-3 text-[10px] font-bold uppercase text-slate-400">Khách hàng</th>
                      <th className="p-3 text-[10px] font-bold uppercase text-slate-400">Độ ưu tiên</th>
                      <th className="p-3 text-[10px] font-bold uppercase text-slate-400">Trạng thái</th>
                      <th className="p-3 text-[10px] font-bold uppercase text-slate-400">Tạo lúc</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.map(tkt => (
                      <tr key={tkt.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-all text-xs">
                        <td className="p-3 font-mono font-bold text-slate-500">{tkt.id}</td>
                        <td className="p-3 font-bold text-slate-800">{tkt.subject}</td>
                        <td className="p-3 font-medium text-slate-600">{tkt.customer?.name}</td>
                        <td className="p-3">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                            tkt.priority === 'urgent' ? 'bg-red-50 text-red-600' :
                            tkt.priority === 'high' ? 'bg-orange-50 text-orange-600' :
                            'bg-slate-50 text-slate-600'
                          )}>
                            {tkt.priority}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                            tkt.status === 'new' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'
                          )}>
                            {tkt.status}
                          </span>
                        </td>
                        <td className="p-3 text-slate-400 font-bold">
                          {formatDistanceToNow(new Date(tkt.createdAt), { addSuffix: true })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Chỉ số đáp ứng SLA</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-slate-200 rounded-xl p-5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thời gian phản hồi đầu</p>
                <div className="text-xl font-extrabold text-slate-800 mt-1">11.4 phút</div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
                <p className="text-[9px] text-emerald-600 font-bold mt-2">Nhanh hơn 8% so với tuần trước</p>
              </div>
              <div className="border border-slate-200 rounded-xl p-5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thời gian giải quyết trung bình (AHT)</p>
                <div className="text-xl font-extrabold text-slate-800 mt-1">2.4 giờ</div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-[9px] text-blue-600 font-bold mt-2">Đáp ứng cam kết vàng (&lt;4h)</p>
              </div>
              <div className="border border-slate-200 rounded-xl p-5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tỷ lệ giải quyết cuộc đầu</p>
                <div className="text-xl font-extrabold text-slate-800 mt-1">74.2%</div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '74%' }}></div>
                </div>
                <p className="text-[9px] text-purple-600 font-bold mt-2">Cao hơn trung bình ngành 4.2%</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'channels' && (
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Phân bố lưu lượng theo kênh liên lạc</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                {[
                  { name: 'Email', percentage: '45%', count: 124, color: 'bg-purple-500' },
                  { name: 'Livechat trực tiếp', percentage: '30%', count: 82, color: 'bg-blue-500' },
                  { name: 'Facebook Messenger', percentage: '15%', count: 41, color: 'bg-indigo-500' },
                  { name: 'Zalo OA', percentage: '10%', count: 27, color: 'bg-sky-500' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-2">
                        <span className={cn("w-2.5 h-2.5 rounded-full", item.color)}></span>
                        {item.name}
                      </span>
                      <span>{item.count} yêu cầu ({item.percentage})</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", item.color)} style={{ width: item.percentage }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 text-center flex flex-col gap-2">
                <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-widest">Tổng hợp tin nhắn đa kênh</h4>
                <p className="text-[11px] text-slate-500 font-semibold">Tất cả luồng dữ liệu đều được chuyển giao qua cổng kết nối trung tâm để tránh bỏ sót thông tin liên lạc.</p>
                <div className="flex gap-2 justify-center mt-3">
                  <span className="text-[9px] font-bold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full">Email</span>
                  <span className="text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">Chat</span>
                  <span className="text-[9px] font-bold bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-full">Zalo</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

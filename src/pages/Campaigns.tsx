import React, { useState } from 'react';
import { 
  Megaphone, Mail, FileText, CheckCircle, BarChart3, Plus, ArrowUpRight,
  Search, Filter, HelpCircle, Star, MessageSquareCode, Percent
} from 'lucide-react';
import { cn } from '../lib/utils';
import { PageBanner } from '../components/PageBanner';

export const Campaigns = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'templates' | 'reports'>('campaigns');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [campaigns] = useState([
    { id: 1, name: 'Khảo sát CSAT - Quý 2/2026', type: 'Email', status: 'Đang chạy', sent: 1250, responseRate: '78%', rating: '4.8/5' },
    { id: 2, name: 'Chiến dịch giới thiệu tính năng Omnichannel', type: 'Thông báo', status: 'Sắp diễn ra', sent: 0, responseRate: '0%', rating: '-' },
    { id: 3, name: 'Khảo sát trải nghiệm sau bàn giao VIP', type: 'Email', status: 'Đã hoàn thành', sent: 480, responseRate: '92%', rating: '4.9/5' }
  ]);

  const [templates] = useState([
    { id: 'T-1', title: 'Mẫu đánh giá CSAT sau dịch vụ', type: 'Khảo sát ngắn', fields: 3, lastUpdated: '1 ngày trước' },
    { id: 'T-2', title: 'Khảo sát NPS hàng năm', type: 'Thang điểm 10', fields: 2, lastUpdated: '1 tuần trước' },
    { id: 'T-3', title: 'Biểu mẫu phản hồi tính năng beta', type: 'Trắc nghiệm tự luận', fields: 5, lastUpdated: '3 tuần trước' }
  ]);

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'running' && c.status === 'Đang chạy') || 
                          (statusFilter === 'completed' && c.status === 'Đã hoàn thành') || 
                          (statusFilter === 'upcoming' && c.status === 'Sắp diễn ra');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 w-full pb-10 select-none">
      
      {/* 1. BANNER */}
      <PageBanner 
        icon={Megaphone}
        title="Quản lý Chiến dịch & Khảo sát"
        description="Tạo và tự động hóa các chiến dịch tiếp cận khách hàng, thu thập phản hồi và khảo sát độ hài lòng (CSAT)."
      />

      {/* 2. TAB: Sub-navigation */}
      <div className="flex border border-slate-200/60 bg-white rounded-[10px] p-1 shadow-sm w-full max-w-[420px]">
        {[
          { id: 'campaigns', label: 'Chiến dịch chủ động', icon: Megaphone },
          { id: 'templates', label: 'Biểu mẫu khảo sát', icon: FileText },
          { id: 'reports', label: 'Báo cáo hiệu suất', icon: BarChart3 }
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
          { title: 'CHIẾN DỊCH HOẠT ĐỘNG', value: campaigns.filter(c => c.status === 'Đang chạy').length + ' chiến dịch', sub: 'Đang trực tiếp khảo sát', color: 'text-blue-600' },
          { title: 'TỶ LỆ PHẢN HỒI (AVG)', value: '85%', sub: 'Cao hơn 4.2% so với quý trước', color: 'text-emerald-600' },
          { title: 'LƯỢT ĐÁNH GIÁ ĐÃ NHẬN', value: '1,730 lượt', sub: '94% ý kiến tích cực', color: 'text-indigo-600' },
          { title: 'ĐIỂM CSAT TRUNG BÌNH', value: '4.85 / 5', sub: 'Hạng cực kỳ hài lòng', color: 'text-amber-500 font-extrabold' }
        ].map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4.5 hover:shadow-md transition-all">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{card.title}</p>
            <h3 className={cn("text-xl font-black mt-1", card.color)}>{card.value}</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">CSAT: {card.sub}</p>
          </div>
        ))}
      </div>

      {/* 4. NỘI DUNG CHÍNH */}
      {activeTab === 'campaigns' ? (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-6">
          
          {/* Toolbar Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-800">Chiến dịch chăm sóc chủ động</h2>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Tiếp cận khách hàng thông qua khảo sát thông minh để thu thập phản hồi chất lượng cao.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-[8px] text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
              <Plus size={13} /> Thêm chiến dịch mới
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm chiến dịch theo tên..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold rounded-[10px] w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-slate-400"
              />
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 shrink-0">TRẠNG THÁI:</span>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-[10px] py-2 px-3 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">Tất cả chiến dịch</option>
                <option value="running">Đang chạy</option>
                <option value="completed">Đã hoàn thành</option>
                <option value="upcoming">Sắp diễn ra</option>
              </select>
            </div>
          </div>

          {/* Table display */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Tên chiến dịch</th>
                  <th className="px-6 py-4">Hình thức tiếp cận</th>
                  <th className="px-6 py-4">Trạng thái</th>
                  <th className="px-6 py-4">Đã gửi</th>
                  <th className="px-6 py-4">Tỷ lệ trả lời</th>
                  <th className="px-6 py-4 text-right">Điểm CSAT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-semibold text-slate-600">
                {filteredCampaigns.map((camp) => (
                  <tr key={camp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{camp.name}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5">
                        {camp.type === 'Email' ? <Mail size={13} className="text-slate-400" /> : <FileText size={13} className="text-slate-400" />}
                        {camp.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-[9px] font-extrabold border uppercase",
                        camp.status === 'Đang chạy' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        camp.status === 'Sắp diễn ra' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                      )}>
                        {camp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{camp.sent > 0 ? camp.sent.toLocaleString() : '-'}</td>
                    <td className="px-6 py-4 text-slate-900 font-bold">{camp.responseRate}</td>
                    <td className="px-6 py-4 text-right text-blue-600 font-extrabold flex items-center justify-end gap-1">
                      {camp.rating !== '-' && <Star size={11} className="fill-blue-600 text-blue-600" />}
                      <span>{camp.rating}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      ) : activeTab === 'templates' ? (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">Thư viện biểu mẫu khảo sát</h3>
              <p className="text-xs text-slate-500 font-semibold">Tự do thiết lập các trường câu hỏi khảo sát đo lường chỉ số CSAT, NPS, hoặc CES.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-[8px] text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors shadow-sm">
              + Tạo biểu mẫu mới
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map(template => (
              <div key={template.id} className="border border-slate-200 p-5 rounded-xl flex flex-col justify-between hover:border-blue-300 transition-all hover:shadow-md bg-slate-50/20">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800">{template.title}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Phân loại: {template.type}</p>
                </div>
                <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-100">
                  <span className="text-[10px] text-slate-500 font-bold">Số câu hỏi: {template.fields}</span>
                  <span className="text-[10px] text-slate-400 font-bold">{template.lastUpdated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-4">
          <h3 className="text-sm font-extrabold text-slate-800">Báo cáo chỉ số hài lòng toàn diện</h3>
          <p className="text-xs text-slate-500 font-semibold">Báo cáo hiệu suất phản hồi chiến dịch CSAT, phân tích độ hiệu quả tiếp cận khách hàng.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">TỶ LỆ TRUY CẬP ĐƯỜNG LINK</h4>
              <p className="text-2xl font-black text-slate-800 mt-1">94.2%</p>
              <p className="text-[10px] text-emerald-600 font-bold mt-1">↑ 2.5% so với tháng trước</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">TỐC ĐỘ HOÀN THÀNH KHẢO SÁT</h4>
              <p className="text-2xl font-black text-slate-800 mt-1">45 giây</p>
              <p className="text-[10px] text-slate-500 font-semibold mt-1">Mức tối ưu hoàn hảo</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">TỶ LỆ BỎ QUA GIỮA CHỪNG</h4>
              <p className="text-2xl font-black text-slate-800 mt-1">5.8%</p>
              <p className="text-[10px] text-emerald-600 font-bold mt-1">↓ 1.2% tỷ lệ thoát rác</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

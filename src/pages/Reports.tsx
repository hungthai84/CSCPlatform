import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Users, Clock, CheckCircle2, 
  Calendar, Download, ArrowUpRight, ArrowDownRight,
  Search, Filter, Plus, Mail, FileText, Settings, Sparkles, RefreshCw
} from 'lucide-react';
import { cn } from '../lib/utils';
import { PageBanner } from '../components/PageBanner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';

export const Reports = () => {
  const [activeTab, setActiveTab] = useState<'downloads' | 'scheduled' | 'channels'>('downloads');
  const [searchQuery, setSearchQuery] = useState('');

  const reportFiles = [
    { name: 'Báo cáo hiệu suất vận hành - Tháng 5/2026', format: 'PDF', size: '2.4 MB', date: '01/06/2026' },
    { name: 'Dữ liệu thô CSAT khách hàng - Tháng 5/2026', format: 'CSV', size: '15.8 MB', date: '01/06/2026' },
    { name: 'Báo cáo SLA hỗ trợ kỹ thuật - Tuần 22', format: 'PDF', size: '1.1 MB', date: '28/05/2026' }
  ];

  const scheduledReports = [
    { id: 1, name: 'Báo cáo tổng hợp hàng ngày', freq: 'Mỗi ngày lúc 18:00', emails: 'manager@omicrm.com', active: true },
    { id: 2, name: 'Khảo sát độ hài lòng VIP hàng tuần', freq: 'Mỗi thứ Hai lúc 08:00', emails: 'cx-lead@omicrm.com, director@omicrm.com', active: true }
  ];

  const trendData = [
    { name: 'Tháng 1', resolutionTime: 24, csat: 88 },
    { name: 'Tháng 2', resolutionTime: 22, csat: 89 },
    { name: 'Tháng 3', resolutionTime: 18, csat: 91 },
    { name: 'Tháng 4', resolutionTime: 16, csat: 92 },
    { name: 'Tháng 5', resolutionTime: 14, csat: 94 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full pb-10 select-none">
      
      {/* 1. BANNER */}
      <PageBanner 
        icon={FileText}
        title="Xuất Báo cáo & Lịch biểu"
        description="Quản lý các bản sao lưu báo cáo, xuất dữ liệu thô và cài đặt lịch gửi báo cáo tự động qua Email."
      />

      {/* 2. TAB: Sub-navigation */}
      <div className="flex border border-slate-200/60 bg-white rounded-[10px] p-1 shadow-sm w-full max-w-[420px]">
        {[
          { id: 'downloads', label: 'Tải xuống báo cáo', icon: FileText },
          { id: 'scheduled', label: 'Lịch gửi tự động', icon: Mail },
          { id: 'channels', label: 'Hiệu suất kênh', icon: BarChart3 }
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
          { title: 'TỔNG VÉ ĐÃ NHẬN', value: '1,248', sub: '+12% so với quý trước', color: 'text-blue-600', trend: 'up' },
          { title: 'VÉ ĐÃ GIẢI QUYẾT', value: '1,102', sub: 'Tỷ lệ giải quyết 88.3%', color: 'text-emerald-600', trend: 'up' },
          { title: 'TỐC ĐỘ PHẢN HỒI ĐẦU', value: '14 phút', sub: '-18% thời gian chờ đợi', color: 'text-indigo-600', trend: 'down' },
          { title: 'ĐIỂM HÀI LÒNG CSAT', value: '94%', sub: 'Cao hơn 2.1% mục tiêu', color: 'text-amber-500 font-extrabold', trend: 'up' }
        ].map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4.5 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{card.title}</p>
              {card.trend === 'up' ? (
                <ArrowUpRight size={14} className="text-emerald-500" />
              ) : (
                <ArrowDownRight size={14} className="text-blue-500" />
              )}
            </div>
            <h3 className={cn("text-xl font-black mt-1", card.color)}>{card.value}</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">SLA: {card.sub}</p>
          </div>
        ))}
      </div>

      {/* 4. NỘI DUNG CHÍNH */}
      {activeTab === 'downloads' ? (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-6">
          
          {/* Toolbar Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-800">Kho dữ liệu báo cáo xuất bản</h2>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Tìm kiếm và tải xuống các báo cáo định kỳ về dữ liệu kinh doanh và dịch vụ khách hàng.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-[8px] text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
              <Plus size={13} /> Tạo báo cáo mới
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm báo cáo theo tên..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-2 border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold rounded-[10px] w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-slate-400"
            />
          </div>

          {/* Table display */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Tên tệp báo cáo</th>
                  <th className="px-6 py-4">Định dạng</th>
                  <th className="px-6 py-4">Dung lượng</th>
                  <th className="px-6 py-4">Ngày xuất bản</th>
                  <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-semibold text-slate-600">
                {reportFiles.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase())).map((file, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{file.name}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[9px] font-extrabold border uppercase",
                        file.format === 'PDF' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                      )}>
                        {file.format}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{file.size}</td>
                    <td className="px-6 py-4 text-slate-500">{file.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:text-blue-700 font-extrabold text-[11px] flex items-center justify-end gap-1 ml-auto cursor-pointer">
                        <Download size={13} /> Tải xuống
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      ) : activeTab === 'scheduled' ? (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">Lịch gửi báo cáo tự động qua Email</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Đặt lịch để hệ thống tự động gửi các báo cáo định kỳ về email của ban quản trị.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-[8px] text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors shadow-sm">
              + Thiết lập lịch mới
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {scheduledReports.map(report => (
              <div key={report.id} className="border border-slate-200 p-5 rounded-xl hover:border-blue-300 transition-all hover:shadow-md flex flex-col justify-between bg-slate-50/20">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800">{report.name}</h4>
                  <p className="text-[10px] text-slate-500 font-bold mt-1.5">Tần suất: {report.freq}</p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Gửi tới: {report.emails}</p>
                </div>
                <div className="flex justify-end items-center mt-5 pt-3 border-t border-slate-100">
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-extrabold uppercase">
                    Đang hoạt động
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-4">
          <h3 className="text-sm font-extrabold text-slate-800">Hiệu suất: Thời gian giải quyết & CSAT</h3>
          <p className="text-xs text-slate-500 font-semibold">Theo dõi xu hướng thời gian phản hồi (phút) so với độ hài lòng khách hàng (%) qua các tháng.</p>
          
          <div className="h-72 mt-4 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 600, color: '#475569' }} />
                <Line yAxisId="left" type="monotone" dataKey="resolutionTime" name="Thời gian giải quyết (phút)" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line yAxisId="right" type="monotone" dataKey="csat" name="CSAT (%)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

    </div>
  );
};

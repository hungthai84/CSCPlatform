import React, { useState } from 'react';
import { 
  BarChart3, LineChart as LineChartIcon, TrendingUp, Users, Clock, ArrowUpRight, 
  Search, Calendar, Filter, Share2, Award, CheckCircle, Zap
} from 'lucide-react';
import { cn } from '../lib/utils';
import { PageBanner } from '../components/PageBanner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

export const Analytics = () => {
  const [activeTab, setActiveTab] = useState<'workload' | 'response' | 'agents'>('workload');
  const [timeRange, setTimeRange] = useState('30days');

  const hourlyWorkload = [
    { hour: '08:00', incoming: 30, solved: 20 },
    { hour: '10:00', incoming: 85, solved: 60 },
    { hour: '12:00', incoming: 40, solved: 55 },
    { hour: '14:00', incoming: 95, solved: 80 },
    { hour: '16:00', incoming: 70, solved: 75 },
    { hour: '18:00', incoming: 25, solved: 40 },
  ];

  const agentPerformance = [
    { name: 'Nguyễn Văn A', ticketsSolved: 142, csat: '4.9/5', sla: '99.2%' },
    { name: 'Trần Thị B', ticketsSolved: 118, csat: '4.8/5', sla: '98.5%' },
    { name: 'Lê Hoàng C', ticketsSolved: 95, csat: '4.7/5', sla: '97.1%' },
    { name: 'Phạm Minh D', ticketsSolved: 88, csat: '4.9/5', sla: '100%' }
  ];

  return (
    <div className="flex flex-col gap-6 w-full pb-10 select-none">
      
      {/* 1. BANNER */}
      <PageBanner 
        icon={BarChart3}
        title="Báo cáo & Phân tích hệ thống"
        description="Đo lường hiệu suất đội ngũ, chất lượng dịch vụ CSAT và đánh giá chuyên sâu khối lượng công việc."
      />

      {/* 2. TAB: Sub-navigation */}
      <div className="flex border border-slate-200/60 bg-white rounded-[10px] p-1 shadow-sm w-full max-w-[420px]">
        {[
          { id: 'workload', label: 'Khối lượng công việc', icon: BarChart3 },
          { id: 'response', label: 'Thời gian phản hồi', icon: Clock },
          { id: 'agents', label: 'Hiệu suất nhân sự', icon: Users }
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
          { title: 'HIỆU SUẤT ĐÚNG HẠN SLA', value: '98.4%', sub: 'Đạt chỉ tiêu xuất sắc', color: 'text-blue-600' },
          { title: 'THỜI GIAN GIẢI QUYẾT TRUNG BÌNH', value: '1.5 giờ', sub: 'Nhanh hơn 12 phút so với tháng trước', color: 'text-emerald-600' },
          { title: 'VÉ QUÁ HẠN CHƯA ĐÓNG', value: '3 vé', sub: 'Đang ưu tiên giải quyết gấp', color: 'text-rose-500' },
          { title: 'TỔNG LƯỢT TIẾP NHẬN', value: '1,840 vé', sub: '+12% so với cùng kỳ năm trước', color: 'text-indigo-600' }
        ].map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4.5 hover:shadow-md transition-all">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{card.title}</p>
            <h3 className={cn("text-xl font-black mt-1", card.color)}>{card.value}</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">Năng suất: {card.sub}</p>
          </div>
        ))}
      </div>

      {/* 4. NỘI DUNG CHÍNH */}
      {activeTab === 'workload' ? (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-6">
          
          {/* Toolbar Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-800">Biểu đồ khối lượng công việc</h2>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Giám sát khối lượng vé tiếp nhận và giải quyết theo các khung giờ trong ngày.</p>
            </div>
            <div className="flex items-center gap-2">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-[8px] py-1.5 px-3 text-[11px] font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="today">Hôm nay</option>
                <option value="7days">7 ngày qua</option>
                <option value="30days">30 ngày qua</option>
              </select>
            </div>
          </div>

          {/* Hourly chart and details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 border border-slate-200 rounded-xl p-5 bg-slate-50/10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Xu hướng theo giờ</h3>
                <div className="text-[10px] text-slate-500 flex items-center gap-3 font-bold">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full inline-block"></span> Vé tiếp nhận</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block"></span> Vé giải quyết</span>
                </div>
              </div>

              <div className="h-56 mt-4 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={hourlyWorkload}
                    margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
                      cursor={{ fill: '#f8fafc' }}
                    />
                    <Bar dataKey="incoming" name="Vé tiếp nhận" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="solved" name="Vé giải quyết" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/30 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-3">Phân tích dòng vé</h4>
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                  Đỉnh điểm tiếp nhận vé rơi vào khoảng **10:00 - 11:00 sáng** và **14:00 - 15:00 chiều**. Khuyến nghị sắp xếp thêm nhân lực trực ca vào các khung giờ này để giảm thiểu thời gian phản hồi đầu tiên.
                </p>
              </div>
              <div className="bg-white border border-slate-100 rounded-lg p-3 mt-4">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Khuyên dùng bởi OmiAI:</span>
                  <span className="text-blue-600 font-extrabold">Tối ưu hóa</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : activeTab === 'response' ? (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-4">
          <h3 className="text-sm font-extrabold text-slate-800">Thời gian phản hồi &amp; SLA</h3>
          <p className="text-xs text-slate-500 font-semibold">Thống kê chi tiết thời gian phản hồi đầu tiên (FRT) và thời gian giải quyết hoàn toàn (MTTR).</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/40">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Thời gian phản hồi đầu tiên</h4>
              <p className="text-2xl font-black text-slate-800 mt-1">4.2 phút</p>
              <p className="text-[10px] text-emerald-600 font-bold mt-1">Tốt hơn 1.8 phút so với SLA quy định</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/40">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Thời gian giải quyết hoàn toàn</h4>
              <p className="text-2xl font-black text-slate-800 mt-1">1.5 giờ</p>
              <p className="text-[10px] text-emerald-600 font-bold mt-1">Thời gian giải quyết kỷ lục của nhóm</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">Hiệu suất nhân sự hỗ trợ</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Bảng xếp hạng đóng góp và chỉ số hài lòng khách hàng trên từng nhân viên hỗ trợ.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-[8px] text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm">
              <Share2 size={12} className="inline mr-1" /> Xuất dữ liệu KPI
            </button>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm mt-2">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                <tr>
                  <th className="px-6 py-4">Họ và tên</th>
                  <th className="px-6 py-4">Số vé đã đóng</th>
                  <th className="px-6 py-4">Chỉ số hài lòng (CSAT)</th>
                  <th className="px-6 py-4 text-right">Tỷ lệ đúng hạn SLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-semibold text-slate-600">
                {agentPerformance.map((agent, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-800 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-[10px] font-extrabold flex items-center justify-center border shrink-0">
                        {agent.name.charAt(0)}
                      </div>
                      <span>{agent.name}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">{agent.ticketsSolved} vé</td>
                    <td className="px-6 py-4 text-amber-600 flex items-center gap-1 font-extrabold">
                      <Award size={13} /> {agent.csat}
                    </td>
                    <td className="px-6 py-4 text-right text-blue-600 font-extrabold">{agent.sla}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

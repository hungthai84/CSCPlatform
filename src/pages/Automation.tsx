import React, { useState } from 'react';
import { 
  Zap, Play, Pause, Plus, ShieldCheck, ArrowRight, Settings, 
  Search, Sliders, ToggleLeft, ToggleRight, History, Webhook,
  CheckCircle, RefreshCw, Cpu
} from 'lucide-react';
import { cn } from '../lib/utils';
import { PageBanner } from '../components/PageBanner';

export const Automation = () => {
  const [activeTab, setActiveTab] = useState<'triggers' | 'logs' | 'webhooks'>('triggers');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [rules, setRules] = useState([
    { id: 1, name: 'Phân loại tự động theo từ khóa', description: 'Tự động gán nhãn "Kỹ thuật" khi nội dung có chứa "lỗi", "crash", "bug".', active: true, triggerCount: 142 },
    { id: 2, name: 'Chuyển vé cho bộ phận VIP', description: 'Gửi thẳng vé của khách hàng phân hạng VIP đến nhóm Hỗ trợ Ưu tiên.', active: true, triggerCount: 58 },
    { id: 3, name: 'Phản hồi tự động ngoài giờ làm việc', description: 'Tự động trả lời khách hàng khi họ gửi yêu cầu từ 18:00 đến 08:00 sáng hôm sau.', active: false, triggerCount: 312 },
    { id: 4, name: 'Cảnh báo quá hạn giải quyết SLA', description: 'Cảnh báo quản trị viên khi vé ở trạng thái "Đang xử lý" quá 4 tiếng không đổi.', active: true, triggerCount: 19 }
  ]);

  const [logs] = useState([
    { id: 'L-01', rule: 'Phân loại tự động theo từ khóa', target: 'Vé #TK-2940', status: 'success', time: '5 phút trước' },
    { id: 'L-02', rule: 'Chuyển vé cho bộ phận VIP', target: 'Vé #TK-2941', status: 'success', time: '12 phút trước' },
    { id: 'L-03', rule: 'Chuyển vé cho bộ phận VIP', target: 'Vé #TK-2939', status: 'success', time: '1 giờ trước' },
    { id: 'L-04', rule: 'Phản hồi tự động ngoài giờ', target: 'Khách hàng #C-901', status: 'skipped', time: '3 giờ trước' }
  ]);

  const toggleRule = (id: number) => {
    setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const activeCount = rules.filter(r => r.active).length;
  const pausedCount = rules.filter(r => !r.active).length;
  const totalTriggers = rules.reduce((acc, r) => acc + r.triggerCount, 0);

  const filteredRules = rules.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'active' && r.active) || 
                          (statusFilter === 'inactive' && !r.active);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 w-full pb-10 select-none">
      
      {/* 1. BANNER */}
      <PageBanner 
        icon={Zap}
        title="Tự động hóa Quy trình (Automation)"
        description="Thiết lập các quy tắc xử lý tự động, phân luồng công việc và tích hợp Webhooks."
      />

      {/* 2. TAB: Sub-navigation */}
      <div className="flex border border-slate-200/60 bg-white rounded-[10px] p-1 shadow-sm w-full max-w-[420px]">
        {[
          { id: 'triggers', label: 'Kịch bản kích hoạt', icon: Zap },
          { id: 'logs', label: 'Nhật ký vận hành', icon: History },
          { id: 'webhooks', label: 'Tích hợp Webhook', icon: Webhook }
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
          { title: 'KỊCH BẢN ĐANG CHẠY', value: activeCount, sub: 'Tối ưu hóa quy trình', color: 'text-blue-600' },
          { title: 'TẠM DỪNG', value: pausedCount, sub: 'Bảo trì hoặc tắt thủ công', color: 'text-slate-500' },
          { title: 'TỔNG LƯỢT KÍCH HOẠT', value: totalTriggers, sub: 'Lượt xử lý tự động', color: 'text-indigo-600' },
          { title: 'HIỆU SUẤT XỬ LÝ', value: '99.8%', sub: 'Hệ thống OmiAI ổn định', color: 'text-emerald-600 font-extrabold' }
        ].map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4.5 hover:shadow-md transition-all">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{card.title}</p>
            <h3 className={cn("text-xl font-black mt-1", card.color)}>{card.value}</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">SLA: {card.sub}</p>
          </div>
        ))}
      </div>

      {/* 4. NỘI DUNG CHÍNH */}
      {activeTab === 'triggers' ? (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-6">
          
          {/* Toolbar Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-800">Cấu hình quy tắc kích hoạt tự động</h2>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Tự động phân loại, phân tuyến và gắn thẻ khách hàng rảnh tay.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-[8px] text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
              <Plus size={13} /> Thêm quy tắc mới
            </button>
          </div>

          {/* Filters row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Search */}
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm kịch bản kích hoạt..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold rounded-[10px] w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-slate-400"
              />
            </div>

            {/* Status select */}
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 shrink-0">TRẠNG THÁI:</span>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-[10px] py-2 px-3 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">Tất cả quy tắc</option>
                <option value="active">Đang kích hoạt (Active)</option>
                <option value="inactive">Đã tắt (Inactive)</option>
              </select>
            </div>
          </div>

          {/* Trigger List Display */}
          <div className="grid grid-cols-1 gap-4">
            {filteredRules.map((rule) => (
              <div key={rule.id} className="border border-slate-200/80 rounded-xl p-5 hover:border-blue-300 transition-all flex justify-between items-start gap-4">
                <div className="flex gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center border shrink-0",
                    rule.active ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-slate-50 text-slate-400 border-slate-200"
                  )}>
                    <Zap size={18} className={rule.active ? "animate-pulse" : ""} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 flex items-center gap-2">
                      {rule.name}
                      <span className={cn(
                        "text-[9px] font-extrabold px-2 py-0.5 rounded uppercase border",
                        rule.active ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-100 text-slate-500 border-slate-200"
                      )}>
                        {rule.active ? 'Active' : 'Paused'}
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-500 font-semibold mt-1 max-w-xl">{rule.description}</p>
                    <div className="flex items-center gap-3 mt-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <ShieldCheck size={12} /> Đã chạy: {rule.triggerCount} lần
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleRule(rule.id)}
                    className={cn(
                      "p-1.5 rounded-lg border transition-all cursor-pointer",
                      rule.active ? "bg-amber-50 hover:bg-amber-100 text-amber-600 border-amber-200" : "bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
                    )}
                    title={rule.active ? "Tạm dừng" : "Bật quy tắc"}
                  >
                    {rule.active ? <Pause size={13} /> : <Play size={13} />}
                  </button>
                  <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 cursor-pointer">
                    <Settings size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : activeTab === 'logs' ? (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-4">
          <h3 className="text-sm font-extrabold text-slate-800">Nhật ký hoạt động hệ thống</h3>
          <p className="text-xs text-slate-500 font-semibold">Theo dõi thời gian thực các sự kiện kích hoạt và hành động tự động từ quy tắc.</p>
          <div className="border border-slate-200 rounded-xl overflow-hidden mt-2">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Mã phiên</th>
                  <th className="px-6 py-3">Quy tắc áp dụng</th>
                  <th className="px-6 py-3">Đối tượng xử lý</th>
                  <th className="px-6 py-3">Trạng thái</th>
                  <th className="px-6 py-3 text-right">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-semibold text-slate-600">
                {logs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-mono font-bold text-slate-900">{log.id}</td>
                    <td className="px-6 py-3 font-bold text-slate-800">{log.rule}</td>
                    <td className="px-6 py-3">{log.target}</td>
                    <td className="px-6 py-3">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[9px] font-extrabold border uppercase",
                        log.status === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                      )}>
                        {log.status === 'success' ? 'Success' : 'Skipped'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right text-slate-400 font-bold">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-4">
          <h3 className="text-sm font-extrabold text-slate-800">Tích hợp Webhook kết nối ngoại vi</h3>
          <p className="text-xs text-slate-500 font-semibold">Đồng bộ luồng công việc đến hệ thống CRM, ERP, hoặc kênh thông báo khác khi có sự kiện mới.</p>
          <div className="border border-slate-200 rounded-xl p-8 text-center text-slate-400 mt-2">
            <Cpu className="mx-auto mb-2 text-slate-300 animate-spin" style={{ animationDuration: '3s' }} />
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-widest">Đang tải cấu hình cổng kết nối</h4>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">OmiAI đang thiết lập mã bảo mật cổng Webhook an toàn...</p>
          </div>
        </div>
      )}

    </div>
  );
};

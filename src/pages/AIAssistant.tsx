import React, { useState } from 'react';
import { 
  Sparkles, Brain, Bot, MessageSquare, ShieldCheck, Heart, ArrowUpRight, 
  CheckCircle, Search, Cpu, BookOpen, Sliders, Play, Settings, Upload, Save
} from 'lucide-react';
import { cn } from '../lib/utils';
import { PageBanner } from '../components/PageBanner';

export const AIAssistant = () => {
  const [activeTab, setActiveTab] = useState<'modules' | 'llms' | 'training'>('modules');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  const [systemPrompt, setSystemPrompt] = useState(
    'Bạn là trợ lý ảo phản hồi thông minh thuộc hệ thống OmiCRM. Hãy sử dụng ngôn ngữ chuẩn mực, ngắn gọn, và hỗ trợ khách hàng nhanh nhất.'
  );

  const [aiConfigs, setAiConfigs] = useState([
    { id: 1, feature: 'Phân tích sắc thái (Sentiment Analysis)', status: 'Hoạt động', detail: 'Tự động gán nhãn Tích cực, Tiêu cực, Trung lập dựa trên cảm xúc tin nhắn.', active: true },
    { id: 2, feature: 'Đề xuất câu trả lời thông minh (Smart Reply)', status: 'Hoạt động', detail: 'Đề xuất 3 phương án trả lời nhanh dựa trên lịch sử dữ liệu.', active: true },
    { id: 3, feature: 'Phân loại tự động (Auto Categorization)', status: 'Hoạt động', detail: 'Tự động phân nhóm vé vào các phòng ban: Kỹ thuật, Hóa đơn, Kinh doanh.', active: true },
    { id: 4, feature: 'Tự động tóm tắt cuộc hội thoại (AI Summarization)', status: 'Đang tắt', detail: 'Tạo tóm tắt ngắn cho vé sau khi được giải quyết xong.', active: false }
  ]);

  const toggleConfig = (id: number) => {
    setAiConfigs(aiConfigs.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const filteredConfigs = aiConfigs.filter(c => 
    c.feature.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.detail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full pb-10 select-none">
      
      {/* 1. BANNER */}
      <PageBanner 
        icon={Bot}
        title="Trí tuệ nhân tạo OmiAI & Tự động hóa"
        description="Huấn luyện mô hình, cài đặt Auto-Reply và định tuyến thông minh với Gemini 2.5."
      />

      {/* 2. TAB: Sub-navigation */}
      <div className="flex border border-slate-200/60 bg-white rounded-[10px] p-1 shadow-sm w-full max-w-[420px]">
        {[
          { id: 'modules', label: 'Tính năng AI', icon: Bot },
          { id: 'llms', label: 'Cấu hình LLM', icon: Cpu },
          { id: 'training', label: 'Đào tạo dữ liệu', icon: BookOpen }
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
          { title: 'ĐỘ CHÍNH XÁC PHÂN LOẠI', value: '88%', sub: '+15% so với tháng trước', color: 'text-blue-600' },
          { title: 'SỐ VÉ ĐÃ GÁN NHÃN', value: '1,240 vé', sub: 'Tự động hóa hoàn toàn', color: 'text-indigo-600' },
          { title: 'ĐÁNH GIÁ CHẤT LƯỢNG', value: '4.9 / 5', sub: '96% khách hàng hài lòng', color: 'text-amber-500' },
          { title: 'THỜI GIAN TIẾT KIỆM', value: '2.5 giờ / ngày', sub: 'Trên mỗi hỗ trợ viên', color: 'text-emerald-600 font-extrabold' }
        ].map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4.5 hover:shadow-md transition-all">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{card.title}</p>
            <h3 className={cn("text-xl font-black mt-1", card.color)}>{card.value}</h3>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">AI-Metrics: {card.sub}</p>
          </div>
        ))}
      </div>

      {/* 4. NỘI DUNG CHÍNH */}
      {activeTab === 'modules' ? (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-6">
          
          {/* Toolbar Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-800">Các phân hệ AI khả dụng</h2>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Quản lý và kích hoạt các module học máy của mô hình OmniAI.</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-[8px] text-[10px] font-extrabold uppercase tracking-wider">
              <Sparkles size={12} className="animate-pulse" /> Trực tuyến &amp; Sẵn sàng
            </div>
          </div>

          {/* Search tool */}
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm phân hệ AI..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-2 border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold rounded-[10px] w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-slate-400"
            />
          </div>

          {/* List display */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
            {filteredConfigs.map((config) => (
              <div key={config.id} className="p-5 flex justify-between items-center hover:bg-slate-50/50 transition-colors">
                <div className="flex gap-4">
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center border shrink-0",
                    config.active ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-slate-100 text-slate-400 border-slate-200"
                  )}>
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-800">{config.feature}</h4>
                    <p className="text-[11px] text-slate-500 font-semibold mt-1">{config.detail}</p>
                  </div>
                </div>

                <div className="shrink-0 ml-4">
                  <button 
                    onClick={() => toggleConfig(config.id)}
                    className={cn(
                      "px-3 py-1 rounded-[8px] text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer",
                      config.active ? "bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100" : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                    )}
                  >
                    {config.active ? 'Hoạt động' : 'Kích hoạt'}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : activeTab === 'llms' ? (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-sm font-extrabold text-slate-800">Cấu hình mô hình ngôn ngữ lớn (LLM)</h3>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">Lựa chọn mô hình cốt lõi và tinh chỉnh Prompt hệ thống cho trợ lý ảo thông minh.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase tracking-wider">Chọn Model cốt lõi</label>
                <select 
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-[10px] py-2 px-3 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="gemini-2.5-flash">Gemini 2.5 Flash (Tốc độ cao &amp; Tối ưu hóa chi phí)</option>
                  <option value="gemini-2.5-pro">Gemini 2.5 Pro (Xử lý tác vụ phức tạp, Đa ngôn ngữ)</option>
                  <option value="omnicrm-custom">OmiCRM LLM Fine-tuned (Huấn luyện chuyên biệt)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase tracking-wider">System Instructions (Prompt hệ thống)</label>
                <textarea 
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-[10px] p-3 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-[8px] text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-fit shadow-md">
                <Save size={14} /> Lưu cấu hình LLM
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/40">
              <h4 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider">Thông tin mô hình lựa chọn</h4>
              <ul className="space-y-2.5 text-xs text-slate-600 font-semibold">
                <li className="flex justify-between"><span>Độ trễ phản hồi:</span> <span className="text-emerald-600 font-extrabold">&lt; 150ms</span></li>
                <li className="flex justify-between"><span>Giới hạn Token:</span> <span className="text-slate-800">1,000,000 Tokens</span></li>
                <li className="flex justify-between"><span>Phiên bản SDK:</span> <span className="text-slate-800">@google/genai v1.0.0</span></li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-sm font-extrabold text-slate-800">Đào tạo &amp; Huấn luyện mô hình</h3>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">Tải lên các tệp dữ liệu chat lịch sử (.csv, .json) để tinh chỉnh độ chính xác của Smart Reply.</p>
          </div>

          <div className="border border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50/50 flex flex-col items-center justify-center gap-3">
            <Upload className="w-8 h-8 text-slate-400" />
            <div>
              <p className="text-xs font-extrabold text-slate-700">Kéo thả tệp dữ liệu huấn luyện vào đây</p>
              <p className="text-[10px] text-slate-400 font-semibold mt-1">Định dạng hỗ trợ: CSV, JSON (Kích thước tối đa: 50MB)</p>
            </div>
            <button className="px-4.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-[10px] font-extrabold transition-colors cursor-pointer mt-2 shadow-sm">
              Chọn tệp tin
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

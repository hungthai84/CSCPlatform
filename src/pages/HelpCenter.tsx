import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Book, FileText, Video, HelpCircle, Plus, BookOpen, 
  ArrowUpRight, Star, ThumbsUp, Filter, MessageCircle, Network, List, LayoutGrid, Eye, ChevronRight, X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { PageBanner } from '../components/PageBanner';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface HelpdeskConfig {
  title: string;
  bannerTitle: string;
  bannerSubtitle: string;
  themeColor: string;
  bgColor: string;
  layout: 'standard' | 'minimalist' | 'modern';
  logoUrl: string;
  showCommunity: boolean;
  showSubmitTicket: boolean;
  contactEmail: string;
  contactPhone: string;
}

export const HelpCenter = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'articles' | 'community' | 'videos'>('articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statsTab, setStatsTab] = useState<'chart' | 'flowchart'>('chart');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [config, setConfig] = useState<HelpdeskConfig>({
    title: 'OmniHelp Trung tâm trợ giúp',
    bannerTitle: 'Bạn cần giúp đỡ gì?',
    bannerSubtitle: 'Tìm kiếm các bài viết, hướng dẫn và giải pháp cho mọi vấn đề.',
    themeColor: '#2563eb',
    bgColor: '#f8fafc',
    layout: 'standard',
    logoUrl: '',
    showCommunity: true,
    showSubmitTicket: true,
    contactEmail: 'support@company.com',
    contactPhone: '1900 1234'
  });

  const [isSearching, setIsSearching] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [aiSources, setAiSources] = useState<any[]>([]);

  const handleAiSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setAiResult(null);
    setAiSources([]);
    try {
      const res = await fetch('/api/help-center/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery })
      });
      const data = await res.json();
      if (res.ok) {
        setAiResult(data.result);
        setAiSources(data.sources || []);
      } else {
        setAiResult('Error: ' + data.error);
      }
    } catch (error) {
      setAiResult('Failed to search. Check network.');
    } finally {
      setIsSearching(false);
    }
  };

  const [articles] = useState([
    { id: 1, title: 'Bắt đầu sử dụng nhanh', desc: 'Hướng dẫn thiết lập tài khoản, cài đặt ban đầu và các tính năng cốt lõi.', category: 'getting-started', categoryLabel: 'Bắt đầu sử dụng', views: 1250, helpful: 94 },
    { id: 2, title: 'Tài khoản & Hóa đơn', desc: 'Thay đổi gói cước dịch vụ, quản lý phương thức thanh toán và xem biên lai.', category: 'billing', categoryLabel: 'Tài khoản & Hóa đơn', views: 840, helpful: 88 },
    { id: 3, title: 'Câu hỏi thường gặp (FAQs)', desc: 'Tổng hợp các giải đáp nhanh cho thắc mắc phổ biến của người dùng.', category: 'faqs', categoryLabel: 'Câu hỏi thường gặp', views: 2450, helpful: 96 },
    { id: 4, title: 'Khắc phục lỗi thanh toán thất bại', desc: 'Các bước xử lý khi cổng thanh toán Visa/Mastercard báo lỗi giao dịch.', category: 'billing', categoryLabel: 'Tài khoản & Hóa đơn', views: 320, helpful: 91 }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('helpdesk_config');
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || art.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Prepare Chart Data for Article Category Distribution
  const chartData = [
    { name: 'Bắt đầu sử dụng', value: articles.filter(a => a.category === 'getting-started').length, color: '#3B82F6' },
    { name: 'Tài khoản & Hóa đơn', value: articles.filter(a => a.category === 'billing').length, color: '#10B981' },
    { name: 'Câu hỏi thường gặp', value: articles.filter(a => a.category === 'faqs').length, color: '#F59E0B' },
  ].filter(d => d.value > 0);

  const categoriesList = [
    { id: 'getting-started', label: 'Bắt đầu sử dụng', desc: 'Tài liệu hướng dẫn cài đặt và tích hợp ban đầu.' },
    { id: 'billing', label: 'Tài khoản & Hóa đơn', desc: 'Chi tiết quản lý gói cước, gia hạn và lịch sử hóa đơn.' },
    { id: 'faqs', label: 'Câu hỏi thường gặp', desc: 'Các giải pháp nhanh chóng giải quyết thắc mắc vận hành phổ biến.' }
  ];

  return (
    <div className="flex flex-col gap-6 w-full pb-10 select-none">
      
      {/* 1. BANNER */}
      <PageBanner 
        icon={BookOpen}
        title="Kho tri thức & Trợ giúp"
        description="Xây dựng tài liệu hướng dẫn và video giúp khách hàng tự giải quyết vấn đề (Self-service) giảm tải cho tổng đài viên."
        backButton={true}
        onBack={() => navigate('/')}
      />

      {/* 2. TAB: Sub-navigation */}
      <div className="flex border border-slate-200/60 bg-white rounded-[10px] p-1 shadow-sm w-full max-w-[420px]">
        {[
          { id: 'articles', label: 'Bài viết hướng dẫn', icon: Book },
          { id: 'community', label: 'Thảo luận cộng đồng', icon: MessageCircle },
          { id: 'videos', label: 'Video hướng dẫn', icon: Video }
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

      {/* 3. THẺ THỐNG KÊ & SƠ ĐỒ PHÂN CẤP TRI THỨC (Resembles Projects Stats Card) */}
      <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
              <Network className="w-4 h-4 text-indigo-600" />
              Thống kê & Lưu đồ cấp bậc tri thức
            </h3>
            <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Phân tích tỷ lệ tài liệu theo danh mục và cấu trúc sơ đồ cây tri thức.</p>
          </div>
          <div className="bg-slate-100/80 p-1 rounded-[10px] flex items-center gap-1 border border-slate-200/50 shadow-inner shrink-0">
            <button
              type="button"
              onClick={() => setStatsTab('chart')}
              className={`px-3 py-1.5 rounded-[8px] text-[10px] font-bold transition-all cursor-pointer ${
                statsTab === 'chart'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Biểu đồ tỷ lệ
            </button>
            <button
              type="button"
              onClick={() => setStatsTab('flowchart')}
              className={`px-3 py-1.5 rounded-[8px] text-[10px] font-bold transition-all cursor-pointer ${
                statsTab === 'flowchart'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Lưu đồ tri thức
            </button>
          </div>
        </div>

        {statsTab === 'chart' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 items-center">
            {/* Left counts / KPI blocks */}
            <div className="flex flex-col space-y-4 pl-4">
              {[
                { label: 'BÀI VIẾT KHẢ DỤNG', count: articles.length + ' bài viết', sub: 'Tỷ lệ hoạt động 100%', color: 'bg-blue-500' },
                { label: 'LƯỢT TRA CỨU THÁNG', count: '4,820 lượt', sub: 'Tăng 12.5% tháng này', color: 'bg-emerald-500' },
                { label: 'TỶ LỆ TỰ GIẢI QUYẾT', count: '68%', sub: 'Mục tiêu quý: 75%', color: 'bg-amber-500' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs font-bold border-b border-slate-100 pb-2.5">
                  <span className="flex items-center gap-2 text-slate-500 text-[10px] font-extrabold tracking-wider">
                    <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                    {item.label}
                  </span>
                  <div className="text-right">
                    <span className="text-slate-800 font-extrabold text-sm block">{item.count}</span>
                    <span className="text-[9px] text-slate-400 font-medium block">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right donut chart */}
            <div className="h-[180px] w-full flex items-center justify-center">
              {chartData.length > 0 ? (
                <div className="w-full h-full relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={72}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                          borderRadius: '12px', 
                          border: 'none',
                          color: '#fff',
                          fontSize: '11px',
                          fontWeight: 'bold'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Absolute Center Label */}
                  <div className="absolute text-center flex flex-col items-center">
                    <span className="text-[20px] font-black text-slate-700 leading-none">{articles.length}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Bài viết</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs font-bold text-slate-400">Chưa có dữ liệu bài viết.</div>
              )}
            </div>
          </div>
        ) : (
          <div className="pt-2">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col gap-4">
              <h4 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">Sơ đồ cây Phân cấp Chủ đề & Bài viết hướng dẫn</h4>
              <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">
                {categoriesList.map(cat => {
                  const catArticles = articles.filter(a => a.category === cat.id);
                  return (
                    <div key={cat.id} className="border border-slate-200/60 bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-extrabold text-slate-800">{cat.label}</span>
                          <p className="text-[9px] text-slate-400 font-semibold">{cat.desc}</p>
                        </div>
                        <span className="text-[9px] bg-blue-50 text-blue-600 border border-blue-100 font-extrabold px-2 py-0.5 rounded-full">
                          {catArticles.length} bài viết
                        </span>
                      </div>
                      {catArticles.length > 0 ? (
                        <div className="mt-2 pl-4 border-l-2 border-slate-200 flex flex-col gap-1.5">
                          {catArticles.map(a => (
                            <div key={a.id} className="flex justify-between items-center text-[10px] font-bold text-slate-600 group hover:text-blue-600 transition-colors">
                              <span className="flex items-center gap-1">
                                <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                                {a.title}
                              </span>
                              <span className="text-[9px] text-slate-400 font-medium">{a.views} lượt đọc</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[9px] font-bold text-slate-400 mt-1 pl-4">• Chưa có tài liệu nào thuộc danh mục này.</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. NỘI DUNG CHÍNH (With List vs Grid Views exactly like Projects page) */}
      {activeTab === 'articles' ? (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-6">
          
          {/* Toolbar Header with View Toggle (Grid vs List) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-800">Kho bài viết tri thức (Knowledge Base)</h2>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Xây dựng bài viết để khách hàng tự giải quyết thắc mắc nhanh chóng mà không cần mở vé.</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* View Mode Toggle: Bảng (List) vs Thẻ (Grid) */}
              <div className="bg-slate-100/80 p-1 rounded-[10px] flex items-center gap-1 border border-slate-200/50 shadow-inner shrink-0">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "px-3 py-1 rounded-[8px] text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                    viewMode === 'grid' ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  <LayoutGrid size={13} /> Thẻ
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "px-3 py-1 rounded-[8px] text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                    viewMode === 'list' ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  <List size={13} /> Bảng
                </button>
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-[8px] text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
                <Plus size={13} /> Soạn bài viết mới
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm kiếm tài liệu hướng dẫn..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAiSearch();
                  }
                }}
                className="pl-9 pr-20 py-2 border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold rounded-[10px] w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-slate-400"
              />
              <button 
                onClick={handleAiSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="absolute right-1 top-1 bottom-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-3 rounded-[6px] text-[10px] font-bold uppercase tracking-wider transition-colors"
              >
                {isSearching ? 'Đang tìm...' : 'AI Search'}
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 shrink-0">CHỦ ĐỀ:</span>
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-[10px] py-2 px-3 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">Tất cả chủ đề</option>
                <option value="getting-started">Bắt đầu sử dụng</option>
                <option value="billing">Tài khoản &amp; Hóa đơn</option>
                <option value="faqs">Câu hỏi thường gặp</option>
              </select>
            </div>
          </div>

          {/* AI Result Section */}
          {aiResult && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-2 shadow-sm relative">
              <button 
                onClick={() => { setAiResult(null); setAiSources([]); }}
                className="absolute top-2 right-2 text-blue-400 hover:text-blue-700 p-1"
                title="Đóng kết quả"
              >
                <X size={14} />
              </button>
              <h4 className="text-xs font-bold text-blue-800 mb-2 flex items-center gap-1.5">
                <Star size={14} className="text-amber-500 fill-amber-500" />
                Kết quả trả lời từ AI
              </h4>
              <div className="text-xs text-blue-900 leading-relaxed font-medium whitespace-pre-wrap">
                {aiResult}
              </div>
              
              {aiSources.length > 0 && (
                <div className="mt-4 pt-3 border-t border-blue-200">
                  <h5 className="text-[10px] font-bold text-blue-700 uppercase tracking-widest mb-2">Nguồn tham khảo:</h5>
                  <div className="flex flex-col gap-1.5">
                    {aiSources.map((source, idx) => (
                      <a 
                        key={idx} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[11px] text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 font-semibold truncate max-w-full"
                      >
                        <ArrowUpRight size={12} /> {source.title || source.uri}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Render Mode: Grid of Cards vs List Table */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredArticles.map(art => (
                <div 
                  key={art.id} 
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-extrabold bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded uppercase">
                        {art.categoryLabel}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                        <Eye size={12} /> {art.views} lượt đọc
                      </span>
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-800 hover:text-blue-600 transition-colors cursor-pointer">
                      {art.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-semibold mt-1.5 leading-relaxed">
                      {art.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-bold">
                    <span className="flex items-center gap-1 text-emerald-600">
                      <ThumbsUp size={12} /> {art.helpful}% Hữu ích
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Table View Mode exactly like Projects page */
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-inner bg-slate-50">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                      <th className="py-3 px-4">Mã số</th>
                      <th className="py-3 px-4">Tiêu đề bài viết</th>
                      <th className="py-3 px-4">Danh mục</th>
                      <th className="py-3 px-4 text-center">Lượt đọc</th>
                      <th className="py-3 px-4 text-right">Đánh giá hữu ích</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredArticles.length > 0 ? (
                      filteredArticles.map(art => (
                        <tr key={art.id} className="border-b border-slate-150/80 bg-white hover:bg-slate-50/80 text-xs font-semibold text-slate-700 transition-all">
                          <td className="py-3 px-4 font-mono text-[10px] text-slate-400 font-bold">KB-{art.id.toString().padStart(4, '0')}</td>
                          <td className="py-3 px-4">
                            <span className="font-extrabold text-slate-800 hover:text-blue-600 cursor-pointer block">{art.title}</span>
                            <span className="text-[10px] text-slate-400 font-medium truncate max-w-[280px] block mt-0.5">{art.desc}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[9px] font-extrabold bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded">
                              {art.categoryLabel}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center font-bold text-slate-600">{art.views.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">
                            <span className="inline-flex items-center gap-1 text-emerald-600 font-extrabold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                              <ThumbsUp size={11} /> {art.helpful}%
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-xs font-bold text-slate-400">Không tìm thấy bài viết nào phù hợp.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      ) : activeTab === 'community' ? (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">Diễn đàn thảo luận cộng đồng</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Nơi khách hàng và chuyên viên hỗ trợ cùng tương tác giải đáp thắc mắc.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-[8px] text-[10px] font-bold uppercase tracking-wider cursor-pointer shadow-sm">
              + Tạo chủ đề mới
            </button>
          </div>

          <div className="p-12 text-center text-slate-400 text-xs font-semibold">
            Không có chủ đề thảo luận nào mới được tạo trong 24 giờ qua.
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[12px] border border-slate-200/80 shadow-md p-6 flex flex-col gap-4">
          <h3 className="text-sm font-extrabold text-slate-800">Thư viện video thao tác trực quan</h3>
          <p className="text-xs text-slate-500 font-semibold">Cung cấp các chuỗi video ngắn giúp khách hàng thao tác theo cực kỳ trực quan.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {[
              { title: 'Tích hợp hòm thư Email', duration: '2:15' },
              { title: 'Thiết lập quy tắc phân bổ vé', duration: '4:30' },
              { title: 'Sử dụng Smart Reply của OmiAI', duration: '3:05' }
            ].map((vid, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer">
                <div className="aspect-video bg-slate-100 flex items-center justify-center relative">
                  <div className="w-10 h-10 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold">
                    ▶
                  </div>
                  <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {vid.duration}
                  </span>
                </div>
                <div className="p-3 bg-white">
                  <h4 className="text-xs font-extrabold text-slate-800 leading-snug">{vid.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

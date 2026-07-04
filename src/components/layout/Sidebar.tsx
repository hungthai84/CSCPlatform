import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useSettings } from '../../contexts/SettingsContext';
import { 
  LayoutDashboard, 
  Inbox, 
  Ticket, 
  Users, 
  Settings,
  MessageSquare,
  BarChart3,
  LifeBuoy,
  ChevronRight,
  Bell
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

export const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const { sidebarOpacity } = useSettings();
  const location = useLocation();
  const submenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Close submenu on route change
  useEffect(() => {
    setActiveSubmenu(null);
    setShowNotifications(false);
  }, [location.pathname]);

  // Click outside listener to dismiss submenus and notifications
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target as Node)) {
        setActiveSubmenu(null);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuGroups = [
    {
      id: 'dashboard',
      label: 'Bảng điều khiển',
      icon: LayoutDashboard,
      path: '/'
    },
    {
      id: 'support',
      label: 'Hỗ trợ',
      icon: Inbox,
      subItems: [
        { icon: Inbox, label: 'Hộp thư đa kênh', path: '/inbox' },
        { icon: Ticket, label: 'Vé hỗ trợ', path: '/tickets' }
      ]
    },
    {
      id: 'customers',
      label: 'Khách hàng',
      icon: Users,
      subItems: [
        { icon: Users, label: 'Danh sách khách hàng', path: '/customers' },
        { icon: MessageSquare, label: 'Cộng đồng', path: '/community' }
      ]
    },
    {
      id: 'insights',
      label: 'Báo cáo & Hướng dẫn',
      icon: BarChart3,
      subItems: [
        { icon: BarChart3, label: 'Báo cáo', path: '/reports' },
        { icon: LifeBuoy, label: 'Trung tâm trợ giúp', path: '/help-center' }
      ]
    }
  ];

  const handleParentClick = (groupId: string, e: React.MouseEvent) => {
    const group = menuGroups.find(g => g.id === groupId);
    if (group && group.subItems) {
      e.preventDefault();
      e.stopPropagation();
      setActiveSubmenu(activeSubmenu === groupId ? null : groupId);
    } else {
      setActiveSubmenu(null);
    }
  };

  return (
    <>
      {/* Invisible backdrop for click-outside dismissal of submenus */}
      {activeSubmenu && (
        <div 
          className="fixed inset-0 z-[80] bg-transparent cursor-default" 
          onClick={() => setActiveSubmenu(null)}
        />
      )}

      <aside 
        className={cn(
          "fixed top-0 left-0 h-screen text-slate-700 flex flex-col z-[90] shadow-xl border-r border-slate-200/80 overflow-visible select-none transition-all duration-300 backdrop-blur-md",
          isCollapsed ? "w-[72px]" : "w-[240px]"
        )}
        style={{
          backgroundColor: `rgba(255, 255, 255, ${sidebarOpacity})`
        }}
      >
        {/* Toggle Collapse/Expand Arrow Button positioned centered on right border */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-1/2 -translate-y-1/2 -right-3.5 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 shadow-md cursor-pointer z-[100] hover:scale-110 active:scale-95 transition-all duration-200"
          id="sidebar-toggle-btn"
          title={isCollapsed ? "Mở rộng menu" : "Thu gọn menu"}
        >
          <ChevronRight className={cn("w-4 h-4 transition-transform duration-300", isCollapsed ? "rotate-0" : "rotate-180")} />
        </button>

        {/* TOP SECTION: Company Logo & Name */}
        <div className={cn(
          "flex-none pt-6 pb-4 border-b border-slate-100 flex items-center justify-center overflow-hidden",
          isCollapsed ? "px-2" : "px-4 justify-start gap-3"
        )}>
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group w-full"
            title="Trở về Trang chủ"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-50 p-1.5 flex items-center justify-center border border-slate-200/60 group-hover:border-blue-500/50 group-hover:bg-blue-50/30 transition-all duration-300 shrink-0">
              <img 
                src="https://i.ibb.co/4ZPkSBLg/Logo-Tr-ng-removebg-preview.png" 
                alt="Logo-Tr-ng-removebg-preview" 
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-sm text-slate-800 tracking-tight uppercase group-hover:text-blue-600 transition-colors duration-300 truncate">
                Power Service
              </span>
            )}
          </Link>
        </div>

        {/* CENTER SECTION: Vertically and Horizontally Centered Navigation Icons */}
        <div className="flex-1 flex flex-col justify-center items-center gap-5 px-3 relative w-full">
          {menuGroups.map((group) => {
            const hasSub = !!group.subItems;
            const isSubActive = hasSub && group.subItems.some(sub => location.pathname === sub.path);
            const isDirectActive = !hasSub && group.path === location.pathname;
            const isActive = isSubActive || isDirectActive;
            const isSubmenuOpen = activeSubmenu === group.id;

            return (
              <div key={group.id} className="relative flex items-center justify-center w-full">
                {/* Main Menu Icon Button */}
                {group.path ? (
                  <NavLink
                    to={group.path}
                    className={({ isActive: linkActive }) => cn(
                      "flex items-center transition-all duration-300 relative group w-full",
                      isCollapsed 
                        ? "w-11 h-11 rounded-xl justify-center" 
                        : "px-3 py-2.5 rounded-xl gap-3 justify-start",
                      linkActive 
                        ? "bg-blue-50 text-blue-600 font-bold border border-blue-100 shadow-sm" 
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent"
                    )}
                    title={isCollapsed ? group.label : undefined}
                  >
                    <group.icon size={19} className="transition-transform duration-300 group-hover:scale-105 shrink-0" />
                    
                    {!isCollapsed && (
                      <span className="text-xs font-semibold whitespace-nowrap">{group.label}</span>
                    )}
                    
                    {/* Hover Tooltip for direct items when collapsed */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-[100] border border-slate-800">
                        {group.label}
                      </div>
                    )}
                  </NavLink>
                ) : (
                  <button
                    onClick={(e) => handleParentClick(group.id, e)}
                    className={cn(
                      "flex items-center transition-all duration-300 relative group cursor-pointer w-full text-left",
                      isCollapsed 
                        ? "w-11 h-11 rounded-xl justify-center" 
                        : "px-3 py-2.5 rounded-xl gap-3 justify-between",
                      isActive
                        ? "bg-blue-50/50 text-blue-600 font-semibold"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent",
                      isSubmenuOpen && "bg-slate-100 text-slate-900 font-bold"
                    )}
                    title={isCollapsed ? group.label : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <group.icon size={19} className="transition-transform duration-300 group-hover:scale-105 shrink-0" />
                      {!isCollapsed && (
                        <span className="text-xs font-semibold whitespace-nowrap">{group.label}</span>
                      )}
                    </div>
                    
                    {!isCollapsed && (
                      <ChevronRight size={14} className={cn("text-slate-400 transition-transform duration-200", isSubmenuOpen && "rotate-90")} />
                    )}

                    {/* Small dot indicating sub-items when collapsed */}
                    {isCollapsed && (
                      <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 opacity-70" />
                    )}

                    {/* Hover Tooltip (only when sub-menu is closed and collapsed) */}
                    {isCollapsed && !isSubmenuOpen && (
                      <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-[100] border border-slate-800">
                        {group.label}
                      </div>
                    )}

                    {/* POPUP SUBMENU: ALWAYS FLOATS AT TOPMOST LAYER AND CENTERED OVER PARENT ICON */}
                    {isSubmenuOpen && group.subItems && (
                      <div 
                        ref={submenuRef}
                        className={cn(
                          "absolute bg-white border border-slate-200 rounded-xl p-2 flex flex-col gap-1 shadow-2xl z-[99999] min-w-[180px] animate-in fade-in slide-in-from-left-2 duration-150 text-slate-800",
                          isCollapsed ? "left-[calc(100%+12px)] top-1/2 -translate-y-1/2" : "left-[calc(100%+6px)] top-2"
                        )}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Little indicator arrow for alignment */}
                        {isCollapsed && (
                          <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-white pointer-events-none" />
                        )}
                        
                        <div className="px-2 pb-1 border-b border-slate-100 mb-1">
                          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase leading-none">{group.label}</span>
                        </div>

                        <div className="flex flex-col gap-0.5">
                          {group.subItems.map((sub, idx) => {
                            const isCurrent = location.pathname === sub.path;
                            return (
                              <NavLink
                                key={idx}
                                to={sub.path}
                                onClick={() => setActiveSubmenu(null)}
                                className={cn(
                                  "flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-200 group/sub cursor-pointer w-full text-left",
                                  isCurrent 
                                    ? "bg-blue-50 text-blue-600 font-bold border border-blue-100 shadow-sm" 
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                                )}
                              >
                                <sub.icon size={14} className="shrink-0" />
                                <span className="text-xs font-semibold whitespace-nowrap">{sub.label}</span>
                              </NavLink>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* BOTTOM SECTION: Profile, Notifications & Settings */}
        <div className={cn(
          "flex-none pb-6 pt-4 border-t border-slate-100 flex flex-col items-center gap-3 w-full relative",
          isCollapsed ? "px-2" : "px-3"
        )}>
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-3 w-full">
              {/* Notifications Button (Collapsed) */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 relative group cursor-pointer border",
                  showNotifications
                    ? "bg-blue-50 text-blue-600 border-blue-100 shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 border-transparent hover:border-slate-100"
                )}
                title="Thông báo"
              >
                <Bell size={19} className="transition-transform duration-300 group-hover:scale-110" />
                <span className="absolute top-2 right-2 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                
                <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-[100] border border-slate-800">
                  Thông báo (2 mới)
                </div>
              </button>

              {/* Settings Button (Collapsed) */}
              <NavLink
                to="/settings"
                className={({ isActive }) => cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 relative group border",
                  isActive
                    ? "bg-blue-50 text-blue-600 border-blue-100 shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 border-transparent hover:border-slate-100"
                )}
                title="Cài đặt hệ thống"
              >
                <Settings size={19} className="transition-transform duration-300 group-hover:rotate-45 shrink-0" />
                
                <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-[100] border border-slate-800">
                  Cài đặt hệ thống
                </div>
              </NavLink>

              {/* Profile Avatar (Collapsed) */}
              <div className="group relative w-full flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-md border-2 border-white cursor-pointer hover:border-blue-400 transition-all duration-300">
                  AD
                </div>
                
                <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-[11px] rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-[100] border border-slate-800 flex flex-col gap-0.5">
                  <span className="font-bold">Quản trị viên (Admin)</span>
                  <span className="text-slate-400 text-[10px]">admin@powerservice.vn</span>
                </div>
              </div>
            </div>
          ) : (
            /* Unified Control Panel (Expanded) */
            <div className="w-full bg-slate-50/60 hover:bg-slate-50/80 border border-slate-100 rounded-xl p-3 transition-all duration-200 flex flex-col gap-2.5 shadow-sm">
              {/* User Profile Info */}
              <div className="flex items-center gap-2.5 w-full">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-md shrink-0 border-2 border-white">
                  AD
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-bold text-xs text-slate-800 truncate">Quản trị viên</span>
                  <span className="text-[9px] text-slate-400 truncate">admin@powerservice.vn</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200/50" />

              {/* Quick Actions Footer */}
              <div className="flex items-center gap-1.5 w-full">
                {/* Notifications Link Button */}
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={cn(
                    "flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all relative border cursor-pointer",
                    showNotifications
                      ? "bg-blue-50 text-blue-600 border-blue-100 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent"
                  )}
                  title="Xem thông báo"
                >
                  <div className="relative">
                    <Bell size={14} className="shrink-0" />
                    <span className="absolute -top-1 -right-1 block h-1.5 w-1.5 rounded-full bg-red-500 ring-1 ring-white" />
                  </div>
                  <span>Thông báo (2)</span>
                </button>

                {/* Settings NavLink Button */}
                <NavLink
                  to="/settings"
                  className={({ isActive }) => cn(
                    "flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all border",
                    isActive
                      ? "bg-blue-50 text-blue-600 border-blue-100 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent"
                  )}
                  title="Cài đặt hệ thống"
                >
                  <Settings size={14} className="shrink-0 group-hover:rotate-45" />
                  <span>Cài đặt</span>
                </NavLink>
              </div>
            </div>
          )}

          {/* Interactive Notifications Popover Card */}
          {showNotifications && (
            <div 
              ref={notificationsRef}
              className={cn(
                "absolute bg-white border border-slate-200 rounded-xl p-3 shadow-2xl z-[99999] min-w-[280px] text-slate-800 animate-in fade-in slide-in-from-left-2 duration-150 border-slate-200/80",
                isCollapsed ? "left-[calc(100%+12px)] bottom-20" : "left-[calc(100%+6px)] bottom-20"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Indicator Arrow */}
              {isCollapsed && (
                <div className="absolute right-full bottom-11 border-8 border-transparent border-r-white pointer-events-none" />
              )}
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                <span className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase leading-none">Thông báo mới</span>
                <span className="text-[9px] bg-red-50 text-red-500 font-bold px-1.5 py-0.5 rounded-full">2 mới</span>
              </div>
              
              <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto">
                <div className="flex flex-col gap-1 hover:bg-slate-50 p-2 rounded-lg transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700">Yêu cầu hỗ trợ mới</span>
                    <span className="text-[9px] text-slate-400 font-medium">5 phút trước</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Khách hàng Nguyễn Văn A vừa mở vé hỗ trợ mới #1042.</p>
                </div>
                
                <div className="flex flex-col gap-1 hover:bg-slate-50 p-2 rounded-lg transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700">Cập nhật hệ thống v2.5</span>
                    <span className="text-[9px] text-slate-400 font-medium">2 giờ trước</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Đã loại bỏ thanh header, tích hợp toàn bộ tùy chọn vào Profile Sidebar.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

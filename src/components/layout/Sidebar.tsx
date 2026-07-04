import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { 
  LayoutDashboard, 
  Inbox, 
  Ticket, 
  Users, 
  Settings,
  MessageSquare,
  BarChart3,
  LifeBuoy,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const submenuRef = useRef<HTMLDivElement>(null);

  // Close submenu on route change
  useEffect(() => {
    setActiveSubmenu(null);
  }, [location.pathname]);

  // Click outside listener to dismiss submenus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target as Node)) {
        setActiveSubmenu(null);
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
        { icon: Users, label: 'Khách hàng', path: '/customers' },
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
          className="fixed inset-0 z-30 bg-transparent cursor-default" 
          onClick={() => setActiveSubmenu(null)}
        />
      )}

      <aside className="fixed top-0 left-0 h-screen w-24 bg-slate-900 text-slate-300 flex flex-col z-40 shadow-2xl border-r border-slate-800/80 overflow-visible select-none">
        {/* TOP SECTION: Company Logo & Name */}
        <div className="flex-none pt-6 pb-4 px-2 flex flex-col items-center justify-center border-b border-slate-800/50">
          <a 
            href="https://ibb.co/4ZPkSBLg" 
            target="_blank" 
            rel="noreferrer" 
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-800/40 p-1 flex items-center justify-center border border-slate-800 hover:border-blue-500/50 transition-all duration-300">
              <img 
                src="https://i.ibb.co/4ZPkSBLg/Logo-Tr-ng-removebg-preview.png" 
                alt="Logo-Tr-ng-removebg-preview" 
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <span className="font-bold text-[10px] text-slate-400 tracking-wider text-center uppercase group-hover:text-blue-400 transition-colors duration-300 leading-tight">
              Power Service
            </span>
          </a>
        </div>

        {/* CENTER SECTION: Vertically and Horizontally Centered Navigation Icons */}
        <div className="flex-1 flex flex-col justify-center items-center gap-7 relative">
          {menuGroups.map((group) => {
            const hasSub = !!group.subItems;
            const isSubActive = hasSub && group.subItems.some(sub => location.pathname === sub.path);
            const isDirectActive = !hasSub && group.path === location.pathname;
            const isActive = isSubActive || isDirectActive;
            const isSubmenuOpen = activeSubmenu === group.id;

            return (
              <div key={group.id} className="relative flex items-center justify-center w-full px-2">
                {/* Main Menu Icon Button */}
                {group.path ? (
                  <NavLink
                    to={group.path}
                    className={({ isActive: linkActive }) => cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative group",
                      linkActive 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500" 
                        : "bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent hover:border-slate-700"
                    )}
                    title={group.label}
                  >
                    <group.icon size={22} className="transition-transform duration-300 group-hover:scale-105" />
                    
                    {/* Hover Tooltip for direct items */}
                    <div className="absolute left-full ml-4 px-2 py-1 bg-slate-950 text-slate-200 text-xs font-semibold rounded shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 border border-slate-800">
                      {group.label}
                    </div>
                  </NavLink>
                ) : (
                  <button
                    onClick={(e) => handleParentClick(group.id, e)}
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative group cursor-pointer",
                      isActive
                        ? "bg-blue-600/15 text-blue-400 border border-blue-500/40"
                        : "bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent hover:border-slate-700",
                      isSubmenuOpen && "bg-slate-800 text-white ring-2 ring-blue-500/50"
                    )}
                  >
                    <group.icon size={22} className="transition-transform duration-300 group-hover:scale-105" />
                    
                    {/* Small sub-menu indicator arrow on side */}
                    <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-500 opacity-60" />

                    {/* Hover Tooltip (only when sub-menu is closed) */}
                    {!isSubmenuOpen && (
                      <div className="absolute left-full ml-4 px-2 py-1 bg-slate-950 text-slate-200 text-xs font-semibold rounded shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 border border-slate-800">
                        {group.label}
                      </div>
                    )}

                    {/* POPUP SUBMENU: centered vertically relative to the parent icon, on topmost layer */}
                    {isSubmenuOpen && group.subItems && (
                      <div 
                        ref={submenuRef}
                        className="absolute left-full top-1/2 -translate-y-1/2 ml-4 bg-slate-950 border border-slate-800/90 rounded-2xl p-2.5 flex items-center gap-3 shadow-[0_15px_30px_rgba(0,0,0,0.6)] z-[999] min-w-max animate-in fade-in slide-in-from-left-2 duration-150"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Little triangle pointer decoration */}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-slate-950 pointer-events-none" />
                        
                        <div className="flex flex-col gap-1 pr-2 border-r border-slate-800/80 mr-1 justify-center">
                          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase px-2 leading-none">{group.label}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {group.subItems.map((sub, idx) => {
                            const isCurrent = location.pathname === sub.path;
                            return (
                              <NavLink
                                key={idx}
                                to={sub.path}
                                onClick={() => setActiveSubmenu(null)}
                                className={cn(
                                  "flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200 group/sub cursor-pointer",
                                  isCurrent 
                                    ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/20 border border-blue-500" 
                                    : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
                                )}
                              >
                                <sub.icon size={16} className="shrink-0" />
                                <span className="text-xs font-medium whitespace-nowrap">{sub.label}</span>
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

        {/* BOTTOM SECTION: Profile & Settings */}
        <div className="flex-none pb-6 pt-4 px-2 flex flex-col items-center gap-4 border-t border-slate-800/50">
          {/* Profile Initials Avatar */}
          <div className="group relative cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-blue-500/10 border-2 border-slate-800 hover:border-blue-400 transition-all duration-300">
              AD
            </div>
            {/* Quick Profile Tooltip */}
            <div className="absolute left-full ml-4 px-3 py-2 bg-slate-950 text-slate-200 text-xs rounded-xl shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 border border-slate-800 flex flex-col gap-0.5">
              <span className="font-bold text-white">Quản trị viên (Admin)</span>
              <span className="text-slate-500 text-[10px]">admin@powerservice.vn</span>
            </div>
          </div>

          {/* Settings link */}
          <NavLink
            to="/settings"
            className={({ isActive }) => cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative group",
              isActive 
                ? "bg-blue-600 text-white shadow-lg border border-blue-500" 
                : "bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent hover:border-slate-700"
            )}
            title="Cài đặt"
          >
            <Settings size={22} className="transition-transform duration-300 group-hover:rotate-45" />
            
            {/* Hover Tooltip */}
            <div className="absolute left-full ml-4 px-2 py-1 bg-slate-950 text-slate-200 text-xs font-semibold rounded shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 border border-slate-800">
              Cài đặt hệ thống
            </div>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

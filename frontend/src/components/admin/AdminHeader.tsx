'use client';

import { useState } from 'react';
import { Bell, Menu } from 'lucide-react';

type AdminHeaderProps = {
  searchPlaceholder?: string;
  onToggleSidebar?: () => void;
};

const SearchIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export default function AdminHeader({
  searchPlaceholder = 'Cari sesuatu...',
  onToggleSidebar,
}: AdminHeaderProps) {
  const [notifCount] = useState(3);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40 border-b border-[#2A2A2A]/5">
      {/* Left — Toggle + Search */}
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-1.5 text-[#2A2A2A] hover:bg-gray-100 rounded-md transition"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="relative w-full max-w-[320px]">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="w-full bg-[#F4F4F5] rounded-full py-2.5 pl-11 pr-4 text-[11px] font-semibold text-[#2A2A2A] placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#FF9A9E]/30 transition-all"
          />
        </div>
      </div>

      {/* Right — Notif + Avatar */}
      <div className="flex items-center gap-6">
        {/* Notif Bell */}
        <button className="relative p-1.5 text-[#2A2A2A]/40 hover:text-[#FF9A9E] transition-colors">
          <Bell className="w-5 h-5" />
          {notifCount > 0 && (
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#FF527B] text-white text-[6px] flex items-center justify-center rounded-full border border-white font-bold">
              {notifCount}
            </span>
          )}
        </button>

        {/* Admin Avatar */}
        <div className="flex items-center gap-2.5 pl-4 border-l border-gray-200 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-[#FF9A9E] flex items-center justify-center font-bold text-white text-sm border border-[#FF9A9E]/20 transition-transform group-hover:scale-105 flex-shrink-0">
            A
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <p className="text-xs font-semibold text-[#2A2A2A]">Admin Planora</p>
            <p className="text-[8px] font-medium text-[#2A2A2A]/40 uppercase tracking-tight">
              Root Access
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  Activity,
  Layers,
  LogOut,
  ClipboardList,
  BookOpen,
} from 'lucide-react';

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  activeMatch?: string[];
};

const navGroups: Array<{ title: string; items: NavItem[] }> = [
  {
    title: 'SUPERVISION',
    items: [
      {
        href: '/admin/dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        activeMatch: ['/admin/dashboard'],
      },
      {
        href: '/admin/verifikasi',
        label: 'Verifikasi Vendor',
        icon: ShieldCheck,
        activeMatch: ['/admin/verifikasi'],
      },
      {
        href: '/admin/manajemen-user',
        label: 'Manajemen User',
        icon: Users,
        activeMatch: ['/admin/manajemen-user'],
      },
    ],
  },
  {
    title: 'OPERATIONS',
    items: [
      {
        href: '/admin/monitoring',
        label: 'Monitoring TRX',
        icon: Activity,
        activeMatch: ['/admin/monitoring'],
      },
      {
        href: '/admin/bookings',
        label: 'Manajemen Booking',
        icon: BookOpen,
        activeMatch: ['/admin/bookings'],
      },
      {
        href: '/admin/kategori-jasa',
        label: 'Kategori Jasa',
        icon: Layers,
        activeMatch: ['/admin/kategori-jasa'],
      },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isActive = (item: NavItem) =>
    item.activeMatch?.some(
      (match) => pathname === match || pathname.startsWith(`${match}/`)
    ) ?? (pathname === item.href || pathname.startsWith(`${item.href}/`));

  const handleConfirmLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    const result = await signOut({ redirect: false, callbackUrl: '/login' });
    setShowLogoutModal(false);
    router.replace(result.url ?? '/login');
    router.refresh();
  };

  return (
    <>
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-[#2A2A2A] transition-all duration-300 flex flex-col fixed h-full z-50`}
      >
        {/* Logo */}
        <div className="p-6 pb-6 flex items-center gap-3 border-b border-white/5">
          <Image
            src="/images/logogmbr.png"
            alt="Planora"
            width={160}
            height={42}
            priority
            className="h-9 w-auto"
          />
          {isSidebarOpen && (
            <span className="text-xl font-bold italic tracking-tight text-white truncate font-logo">
              Planora
            </span>
          )}
        </div>

        {/* Nav Groups */}
        <nav className="flex-1 px-3 overflow-y-auto mt-6">
          {navGroups.map((group) => (
            <div key={group.title} className="mb-6">
              {isSidebarOpen && (
                <span className="text-[9px] font-bold tracking-[0.2em] text-white/30 uppercase px-3 mb-2 block">
                  {group.title}
                </span>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const active = isActive(item);
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold text-sm transition-all group ${
                          active
                            ? 'bg-[#FF9A9E] hover:bg-[#FF8A8E]'
                            : 'hover:bg-white/10'
                        } ${!isSidebarOpen ? 'justify-center' : ''}`}
                      >
                        <Icon
                          className={`w-5 h-5 flex-shrink-0 transition-colors ${
                            active
                              ? 'text-white'
                              : 'text-white/60 group-hover:text-white'
                          }`}
                        />
                        {isSidebarOpen && (
                          <div className="flex flex-1 justify-between items-center min-w-0">
                            <span
                              className={`text-sm truncate transition-colors ${
                                active
                                  ? 'text-white'
                                  : 'text-white/60 group-hover:text-white'
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.badge && (
                              <span
                                className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black ${
                                  active
                                    ? 'bg-white/30 text-white'
                                    : 'bg-[#FF527B] text-white'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Profile Footer */}
        <div className="p-3 border-t border-white/5">
          <div
            className={`flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/5 ${
              !isSidebarOpen && 'justify-center'
            }`}
          >
            <div className="w-8 h-8 rounded-md bg-[#FF9A9E] flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
              A
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden text-left min-w-0">
                <p className="text-xs font-semibold truncate text-white">
                  Admin Planora
                </p>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="flex items-center gap-1 text-[8px] text-[#FF9A9E] font-bold uppercase tracking-tight hover:text-[#FF527B] transition-colors whitespace-nowrap"
                >
                  <LogOut className="w-2.5 h-2.5" /> KELUAR
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2A2A2A]/80 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-8 md:p-10 w-full max-w-[380px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#FDF1F0] border border-[#FCE6E3] rounded-[1.25rem] flex items-center justify-center mb-6">
              <LogOut className="w-6 h-6 text-[#EF4444] ml-1" />
            </div>
            <h3 className="text-2xl font-black italic tracking-tighter text-[#2A2A2A] uppercase mb-2">
              Keluar Akun
            </h3>
            <p className="text-[10px] font-bold tracking-wider text-[#A8A8A8] uppercase mb-8 leading-relaxed">
              Apakah Anda yakin ingin keluar dari <br /> Admin Planora?
            </p>
            <div className="flex flex-col w-full gap-3">
              <button
                type="button"
                onClick={handleConfirmLogout}
                disabled={isLoggingOut}
                className="w-full flex justify-center items-center py-4 rounded-xl bg-[#EF4444] text-white text-[10px] font-bold tracking-widest uppercase hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? 'MEMPROSES...' : 'YA, KELUAR SEKARANG'}
              </button>
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="w-full py-4 rounded-xl bg-white border-2 border-gray-100 text-[#A8A8A8] hover:text-[#2A2A2A] hover:border-gray-300 text-[10px] font-bold tracking-widest uppercase transition-colors"
              >
                BATAL
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
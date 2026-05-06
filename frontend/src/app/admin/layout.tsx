import type { ReactNode } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FDF1F0] flex font-sans text-[#2A2A2A]">
      <AdminSidebar />
      <div className="flex-1 ml-64 transition-all duration-300 flex flex-col">
        <AdminHeader searchPlaceholder="Cari vendor, user, transaksi..." />
        <main className="flex-1 overflow-y-auto bg-[#FDF1F0]">
          <div className="p-6 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import FilterTabs from '@/components/admin/FilterTabs';
import AdminPagination from '@/components/admin/AdminPagination';
import StatusBadge from '@/components/admin/StatusBadge';

const EyeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);
const PencilIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
);

export default function AdminManajemenUserPage() {
    const [activeTab, setActiveTab] = useState<'semua' | 'pelanggan' | 'vendor'>('semua');

    return (
        <>
            <AdminHeader searchPlaceholder="Cari nama atau email user..." />

            <div className="flex-1 overflow-y-auto p-10 pb-16">
                <div className="max-w-[1300px] mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">
                        <div>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-[#A8A8A8] uppercase mb-2 block">
                                AUDIT & PENGAWASAN PENGGUNA
                            </span>
                            <h1 className="text-4xl md:text-[2.75rem] leading-[1.05] font-black italic tracking-tighter text-[#2A2A2A]">
                                MANAJEMEN <br /> PENGGUNA SISTEM.
                            </h1>
                        </div>

                        <div className="flex items-center bg-white rounded-full px-8 py-2 border border-gray-100 shadow-sm h-14">
                            <div className="flex flex-col items-center justify-center pr-8 border-r border-gray-100">
                                <span className="text-[8px] font-bold tracking-widest text-[#A8A8A8] uppercase">TOTAL PELANGGAN</span>
                                <span className="text-base font-black text-[#2A2A2A] leading-none mt-1">2,410</span>
                            </div>
                            <div className="flex flex-col items-center justify-center pl-8">
                                <span className="text-[8px] font-bold tracking-widest text-[#A8A8A8] uppercase">TOTAL VENDOR</span>
                                <span className="text-base font-black text-[#2A2A2A] leading-none mt-1">430</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-gray-100 p-8 flex flex-col">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                            <FilterTabs
                                active={activeTab}
                                onChange={setActiveTab}
                                tabs={[
                                    { label: 'SEMUA', value: 'semua' },
                                    { label: 'PELANGGAN', value: 'pelanggan' },
                                    { label: 'VENDOR', value: 'vendor' },
                                ]}
                            />

                            <span className="text-[9px] font-bold tracking-[0.2em] text-[#A8A8A8] uppercase">
                                MONITORING 2,840 PENGGUNA AKTIF
                            </span>
                        </div>

                        <div className="flex flex-col w-full mb-10">
                            <div className="flex items-center pb-5 border-b border-gray-100">
                                <div className="w-[40%] text-[9px] font-bold tracking-[0.2em] text-[#A8A8A8] uppercase">DETAIL IDENTITAS</div>
                                <div className="w-[20%] text-[9px] font-bold tracking-[0.2em] text-[#A8A8A8] uppercase text-center">TIPE PERAN</div>
                                <div className="w-[25%] text-[9px] font-bold tracking-[0.2em] text-[#A8A8A8] uppercase text-center">TANGGAL JOIN</div>
                                <div className="w-[15%] text-[9px] font-bold tracking-[0.2em] text-[#A8A8A8] uppercase text-right pr-2">MODERASI</div>
                            </div>

                            <div className="flex items-center py-6 border-b border-gray-50 transition-colors hover:bg-gray-50/50">
                                <div className="w-[40%] flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#F4F4F5] rounded-full flex items-center justify-center shrink-0">
                                        <span className="text-[11px] font-black text-[#A8A8A8] tracking-widest">AP</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-extrabold text-[#2A2A2A] mb-1 tracking-tight">ANDI PRATAMA</span>
                                        <span className="text-[8px] font-bold text-[#A8A8A8] uppercase tracking-wider">ANDI.PRATAMA@GMAIL.COM</span>
                                    </div>
                                </div>

                                <div className="w-[20%] flex justify-center">
                                    <StatusBadge text="PELANGGAN" variant="blue" rounded="md" />
                                </div>

                                <div className="w-[25%] flex justify-center">
                                    <span className="text-[10px] font-bold text-[#A8A8A8] uppercase tracking-wider">12 APR 2026</span>
                                </div>

                                <div className="w-[15%] flex justify-end gap-2">
                                    <button type="button" aria-label="Lihat pengguna" title="Lihat pengguna" className="w-9 h-9 bg-[#FAFAFC] hover:bg-gray-100 border border-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#2A2A2A] transition-colors">
                                        <EyeIcon className="w-4 h-4" />
                                    </button>
                                    <button type="button" aria-label="Edit pengguna" title="Edit pengguna" className="w-9 h-9 bg-[#FDF1F0] hover:bg-red-50 border border-red-50 rounded-lg flex items-center justify-center text-red-400 hover:text-red-500 transition-colors">
                                        <PencilIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center py-6 border-b border-gray-50 transition-colors hover:bg-gray-50/50">
                                <div className="w-[40%] flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#FCE6E3]/30 rounded-full flex items-center justify-center shrink-0">
                                        <span className="text-[11px] font-black text-[#A8A8A8] tracking-widest">WM</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-extrabold text-[#2A2A2A] mb-1 tracking-tight">WAFA MEDIA STUDIO</span>
                                        <span className="text-[8px] font-bold text-[#A8A8A8] uppercase tracking-wider">WAFA.STUDIO@PLANORA.COM</span>
                                    </div>
                                </div>

                                <div className="w-[20%] flex justify-center">
                                    <StatusBadge text="VENDOR" variant="emerald" rounded="md" />
                                </div>

                                <div className="w-[25%] flex justify-center">
                                    <span className="text-[10px] font-bold text-[#A8A8A8] uppercase tracking-wider">10 APR 2026</span>
                                </div>

                                <div className="w-[15%] flex justify-end gap-2">
                                    <button type="button" aria-label="Lihat pengguna" title="Lihat pengguna" className="w-9 h-9 bg-[#FAFAFC] hover:bg-gray-100 border border-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#2A2A2A] transition-colors">
                                        <EyeIcon className="w-4 h-4" />
                                    </button>
                                    <button type="button" aria-label="Edit pengguna" title="Edit pengguna" className="w-9 h-9 bg-[#FDF1F0] hover:bg-red-50 border border-red-50 rounded-lg flex items-center justify-center text-red-400 hover:text-red-500 transition-colors">
                                        <PencilIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <AdminPagination pages={[1, 2, 3]} currentPage={1} />
                    </div>

                    <div className="mt-16 pb-4 text-center">
                        <p className="text-[8px] font-bold tracking-[0.3em] text-[#A8A8A8] uppercase">
                            PLANORA ECOSYSTEM • MODUL AUDIT PENGGUNA • 2026
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

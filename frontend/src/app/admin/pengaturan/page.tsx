'use client';

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';

const UserIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
);
const LockIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const BellIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);
const CheckIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>
);

type Tab = 'profil' | 'keamanan' | 'notifikasi';

export default function AdminPengaturanPage() {
    const [activeTab, setActiveTab] = useState<Tab>('profil');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const tabs: { value: Tab; label: string; icon: React.ReactNode }[] = [
        { value: 'profil', label: 'Profil Admin', icon: <UserIcon className="w-4 h-4" /> },
        { value: 'keamanan', label: 'Keamanan', icon: <LockIcon className="w-4 h-4" /> },
        { value: 'notifikasi', label: 'Notifikasi', icon: <BellIcon className="w-4 h-4" /> },
    ];

    return (
        <>
            <AdminHeader searchPlaceholder="Cari pengaturan..." />

            <div className="p-8 pb-16">
                <div className="max-w-[900px] mx-auto flex flex-col gap-8">

                    {/* Page Header */}
                    <div>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#2A2A2A]/40 uppercase mb-2 block">
                            KONFIGURASI AKUN
                        </span>
                        <h1 className="text-4xl md:text-[2.75rem] leading-[1.05] font-black italic tracking-tighter text-[#2A2A2A]">
                            PROFIL & <br /> PENGATURAN.
                        </h1>
                    </div>

                    {/* Profile Banner */}
                    <div className="bg-[#2A2A2A] rounded-2xl p-6 flex items-center gap-5 relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-48 h-48 bg-[#FF9A9E]/5 rounded-full -translate-y-16 translate-x-16 pointer-events-none" />
                        <div className="w-16 h-16 rounded-2xl bg-[#FF9A9E] flex items-center justify-center font-black text-white text-2xl flex-shrink-0 shadow-lg shadow-[#FF9A9E]/30">
                            A
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-extrabold text-lg tracking-tight">Admin Planora</span>
                            <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase">Root Access • admin@planora.com</span>
                        </div>
                        <div className="ml-auto">
                            <span className="px-4 py-2 bg-[#FF9A9E]/20 border border-[#FF9A9E]/20 text-[#FF9A9E] text-[9px] font-black tracking-widest uppercase rounded-full">
                                ADMIN
                            </span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-white shadow-[0_4px_20px_-8px_rgba(255,154,158,0.1)] w-fit">
                        {tabs.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all ${
                                    activeTab === tab.value
                                        ? 'bg-[#2A2A2A] text-white shadow-md'
                                        : 'text-[#2A2A2A]/40 hover:text-[#2A2A2A] hover:bg-gray-50'
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-2xl shadow-[0_4px_20px_-8px_rgba(255,154,158,0.15)] border border-white p-8 flex flex-col gap-8">

                        {/* PROFIL TAB */}
                        {activeTab === 'profil' && (
                            <>
                                <div>
                                    <h2 className="text-base font-black italic tracking-tighter text-[#2A2A2A] uppercase mb-1">
                                        Informasi Profil
                                    </h2>
                                    <p className="text-[10px] font-bold text-[#2A2A2A]/30 uppercase tracking-wider">
                                        Data identitas akun admin
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { label: 'Nama Lengkap', placeholder: 'Admin Planora', type: 'text' },
                                        { label: 'Email', placeholder: 'admin@planora.com', type: 'email' },
                                        { label: 'No. Telepon', placeholder: '+62 812 xxxx xxxx', type: 'tel' },
                                        { label: 'Jabatan', placeholder: 'Super Admin', type: 'text' },
                                    ].map((field) => (
                                        <div key={field.label} className="flex flex-col gap-2">
                                            <label className="text-[9px] font-black tracking-[0.2em] text-[#2A2A2A]/50 uppercase">
                                                {field.label}
                                            </label>
                                            <input
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                defaultValue={field.placeholder}
                                                className="w-full bg-[#FAFAFC] border border-gray-100 rounded-xl px-4 py-3 text-[12px] font-semibold text-[#2A2A2A] placeholder-[#2A2A2A]/20 outline-none focus:ring-2 focus:ring-[#FF9A9E]/30 focus:border-[#FF9A9E]/30 transition-all"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* KEAMANAN TAB */}
                        {activeTab === 'keamanan' && (
                            <>
                                <div>
                                    <h2 className="text-base font-black italic tracking-tighter text-[#2A2A2A] uppercase mb-1">
                                        Keamanan Akun
                                    </h2>
                                    <p className="text-[10px] font-bold text-[#2A2A2A]/30 uppercase tracking-wider">
                                        Perbarui password akun admin
                                    </p>
                                </div>

                                <div className="flex flex-col gap-6 max-w-md">
                                    {[
                                        { label: 'Password Saat Ini', placeholder: '••••••••' },
                                        { label: 'Password Baru', placeholder: '••••••••' },
                                        { label: 'Konfirmasi Password Baru', placeholder: '••••••••' },
                                    ].map((field) => (
                                        <div key={field.label} className="flex flex-col gap-2">
                                            <label className="text-[9px] font-black tracking-[0.2em] text-[#2A2A2A]/50 uppercase">
                                                {field.label}
                                            </label>
                                            <input
                                                type="password"
                                                placeholder={field.placeholder}
                                                className="w-full bg-[#FAFAFC] border border-gray-100 rounded-xl px-4 py-3 text-[12px] font-semibold text-[#2A2A2A] placeholder-[#2A2A2A]/20 outline-none focus:ring-2 focus:ring-[#FF9A9E]/30 focus:border-[#FF9A9E]/30 transition-all"
                                            />
                                        </div>
                                    ))}

                                    <div className="p-4 bg-[#FDF1F0] rounded-xl border border-[#FF9A9E]/10">
                                        <p className="text-[9px] font-bold text-[#2A2A2A]/50 uppercase tracking-wider leading-relaxed">
                                            Password minimal 8 karakter, kombinasi huruf besar, huruf kecil, dan angka.
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* NOTIFIKASI TAB */}
                        {activeTab === 'notifikasi' && (
                            <>
                                <div>
                                    <h2 className="text-base font-black italic tracking-tighter text-[#2A2A2A] uppercase mb-1">
                                        Preferensi Notifikasi
                                    </h2>
                                    <p className="text-[10px] font-bold text-[#2A2A2A]/30 uppercase tracking-wider">
                                        Atur notifikasi yang ingin diterima
                                    </p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {[
                                        { label: 'Vendor Baru Mendaftar', desc: 'Notifikasi saat ada vendor baru yang mendaftar', defaultOn: true },
                                        { label: 'Pembayaran Masuk', desc: 'Notifikasi saat ada transaksi pembayaran baru', defaultOn: true },
                                        { label: 'Booking Dibuat', desc: 'Notifikasi saat ada booking baru dari pelanggan', defaultOn: false },
                                        { label: 'Laporan Mingguan', desc: 'Ringkasan aktivitas platform setiap minggu', defaultOn: true },
                                        { label: 'Sengketa & Keluhan', desc: 'Notifikasi prioritas untuk kasus sengketa', defaultOn: true },
                                    ].map((item) => (
                                        <div
                                            key={item.label}
                                            className="flex items-center justify-between p-4 bg-[#FAFAFC] rounded-xl border border-gray-50 hover:bg-[#FDF1F0]/50 transition-colors"
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-extrabold text-[#2A2A2A] mb-0.5">{item.label}</span>
                                                <span className="text-[9px] font-medium text-[#2A2A2A]/40">{item.desc}</span>
                                            </div>
                                            <div className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${item.defaultOn ? 'bg-[#FF9A9E]' : 'bg-gray-200'}`}>
                                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${item.defaultOn ? 'translate-x-6' : 'translate-x-1'}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Save Button */}
                        <div className="flex justify-end pt-4 border-t border-gray-50">
                            <button
                                onClick={handleSave}
                                className={`flex items-center gap-2 px-8 py-3 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all ${
                                    saved
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                        : 'bg-[#2A2A2A] text-white hover:bg-[#FF9A9E] shadow-lg shadow-[#2A2A2A]/20'
                                }`}
                            >
                                {saved ? (
                                    <>
                                        <CheckIcon className="w-4 h-4" />
                                        TERSIMPAN!
                                    </>
                                ) : (
                                    'SIMPAN PERUBAHAN'
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pb-2 text-center">
                        <p className="text-[8px] font-bold tracking-[0.3em] text-[#2A2A2A]/20 uppercase">
                            PLANORA ECOSYSTEM • PROFIL ADMIN • 2026
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
}
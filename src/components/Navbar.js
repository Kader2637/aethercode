"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            // Kita kasih toleransi scroll 20px
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getIconColor = (color) => {
        const colors = {
            blue: "bg-blue-50 text-blue-600",
            red: "bg-red-50 text-red-500",
            indigo: "bg-indigo-50 text-indigo-500",
            orange: "bg-orange-50 text-orange-500",
            emerald: "bg-emerald-50 text-emerald-500"
        };
        return colors[color] || "bg-slate-50 text-slate-500";
    };

    const services = [
        { name: "Web Dev", desc: "Website modern & interaktif", icon: "🌐", href: "/jasa/web", color: "blue" },
        { name: "Video Editing", desc: "Reels, Shorts, Cinematic", icon: "🎬", href: "/jasa/video", color: "red" },
        { name: "UI/UX Design", desc: "Figma Prototype & Design", icon: "💎", href: "/jasa/uiux", color: "indigo" },
        { name: "PPT Design", desc: "Slide presentasi profesional", icon: "📊", href: "/jasa/ppt", color: "orange" },
        { name: "Document", desc: "Laporan & pengolahan data", icon: "📄", href: "/jasa/dokumen", color: "emerald" },
    ];

    const isDesktopLinkActive = (href) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <>
            {/* WRAPPER NAV UTAMA */}
            <nav className={`fixed w-full z-[100] transition-all duration-500 
                ${isScrolled 
                    ? 'top-2 md:top-4 px-4 md:px-12' // Tetap ngambang pas di-scroll
                    : 'top-0 md:top-6 px-0 md:px-12' // Posisi awal
                }`}
            >
                <div className={`max-w-7xl mx-auto backdrop-blur-xl border transition-all duration-500 flex items-center justify-between px-6 py-3
                    ${isScrolled
                        ? 'bg-white/90 border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-[2rem]' 
                        : 'bg-white/70 border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl md:rounded-[2rem]'
                    }`}
                >
                    {/* 1. LOGO (Tengah di Mobile, Kiri di Desktop) */}
                    <div className="w-full md:w-1/3 flex items-center justify-center md:justify-start">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative shrink-0">
                                <div className="absolute -inset-2 bg-brand-400 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                                <img src="/logo.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain transition-transform duration-500 group-hover:rotate-[15deg] group-hover:scale-110 relative z-10" />
                            </div>
                            <div className="flex flex-col border-l-2 border-slate-200/80 pl-3 h-7 justify-center">
                                <span className="text-base md:text-lg font-[950] tracking-tighter text-slate-900 uppercase leading-none">
                                    AETHER<span className="text-brand-600">CODE</span>
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* 2. TENGAH (Desktop Links) */}
                    <div className="hidden md:flex items-center justify-center w-1/3">
                        <div className="flex items-center gap-1 p-1 bg-slate-100/50 rounded-2xl border border-slate-100">
                            <Link href="/" className={`px-5 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${isDesktopLinkActive('/') ? 'text-brand-600 bg-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'}`}>
                                Beranda
                            </Link>
                            <Link href="/about" className={`px-5 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${isDesktopLinkActive('/about') ? 'text-brand-600 bg-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'}`}>
                                Tentang
                            </Link>

                            <div className="group relative">
                                <button className={`px-5 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-1.5 ${pathname.includes('/jasa') ? 'text-brand-600 bg-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'}`}>
                                    Jasa <svg className="w-3 h-3 transition-transform duration-300 group-hover:-rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
                                    <div className="w-64 bg-white border border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)] rounded-[1.5rem] p-2 flex flex-col gap-1">
                                        {services.map((s, i) => (
                                            <Link key={i} href={s.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-transform group-hover/item:scale-110 ${getIconColor(s.color)}`}>
                                                    {s.icon}
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-black text-slate-800 leading-none mb-1 group-hover/item:text-brand-600 transition-colors uppercase tracking-tight">{s.name}</p>
                                                    <p className="text-[9px] font-bold text-slate-400 leading-none">{s.desc}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Link href="/portfolio" className={`px-5 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${isDesktopLinkActive('/portfolio') ? 'text-brand-600 bg-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'}`}>
                                Karya
                            </Link>
                        </div>
                    </div>

                    {/* 3. KANAN (Desktop Button) */}
                    <div className="hidden md:flex items-center justify-end w-1/3">
                        <Link href="/contact" className="group relative px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] overflow-hidden rounded-xl transition-all shadow-lg hover:shadow-brand-500/20 active:scale-95">
                            <div className="absolute inset-0 bg-brand-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                            <span className="relative z-10 flex items-center gap-2">
                                Konsultasi
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* MOBILE BOTTOM DOCK NAVIGATION (Tetap Sama) */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] z-[100]">
                <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/80 shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-[2.5rem] px-2 py-3 flex justify-around items-center">
                    <Link href="/" className={`flex flex-col items-center gap-1 flex-1 transition-all ${pathname === '/' ? 'text-brand-600 scale-110' : 'text-slate-400'}`}>
                        <div className={`p-2 rounded-2xl ${pathname === '/' ? 'bg-brand-50 shadow-inner' : ''}`}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Beranda</span>
                    </Link>

                    <Link href="/about" className={`flex flex-col items-center gap-1 flex-1 transition-all ${pathname === '/about' ? 'text-brand-600 scale-110' : 'text-slate-400'}`}>
                        <div className={`p-2 rounded-2xl ${pathname === '/about' ? 'bg-brand-50 shadow-inner' : ''}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Tentang</span>
                    </Link>

                    <Link href="/contact" className="flex flex-col items-center -translate-y-7 px-2 active:scale-90 transition-transform relative z-10">
                        <div className="w-14 h-14 bg-slate-950 rounded-full shadow-2xl flex items-center justify-center text-white border-[4px] border-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                        </div>
                    </Link>


                    <Link href="/portfolio" className={`flex flex-col items-center gap-1 flex-1 transition-all ${pathname === '/portfolio' ? 'text-brand-600 scale-110' : 'text-slate-400'}`}>
                        <div className={`p-2 rounded-2xl ${pathname === '/portfolio' ? 'bg-brand-50 shadow-inner' : ''}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Portfolio</span>
                    </Link>
                    <button onClick={() => setIsMobileMenuOpen(true)} className={`flex flex-col items-center gap-1 flex-1 transition-all ${pathname.includes('/jasa') ? 'text-brand-600 scale-110' : 'text-slate-400'}`}>
                        <div className={`p-2 rounded-2xl ${pathname.includes('/jasa') ? 'bg-brand-50 shadow-inner' : ''}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Jasa</span>
                    </button>
                </div>
            </div>

            {/* MOBILE SHEET JASA (Tarik dari Bawah) - Tetap Sama */}
            <div className={`fixed inset-0 z-[200] flex flex-col justify-end transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                <div className={`relative w-full max-h-[85vh] bg-white rounded-t-[2.5rem] px-6 pt-4 pb-10 transition-transform duration-400 shadow-[0_-20px_60px_rgba(0,0,0,0.2)] ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
                    <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                        <div>
                            <h3 className="text-2xl font-[950] text-slate-900 uppercase tracking-tight italic">Katalog <span className="text-brand-600">Jasa</span></h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Pilih layanan digital Anda</p>
                        </div>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 bg-slate-50 rounded-full text-slate-500 hover:text-slate-900 flex items-center justify-center active:scale-90 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                    <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-2 pb-10">
                        {services.map((s, i) => (
                            <Link key={i} href={s.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white shadow-sm active:bg-slate-50 active:scale-[0.98] transition-all">
                                <div className={`w-14 h-14 rounded-[1rem] flex items-center justify-center text-3xl shadow-sm ${getIconColor(s.color)}`}>
                                    {s.icon}
                                </div>
                                <div>
                                    <p className="font-[950] text-slate-900 leading-none mb-1.5 text-lg uppercase tracking-tight italic">{s.name}</p>
                                    <p className="text-xs font-bold text-slate-400 leading-tight">{s.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
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
            <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b
                ${isScrolled 
                    ? 'bg-white/90 backdrop-blur-md border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] py-3' 
                    : 'bg-transparent border-transparent py-5'
                }`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-8 lg:px-12">
                    {/* 1. LOGO */}
                    <div className="flex-none flex items-center justify-start">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative shrink-0">
                                <img src="/logo.png" alt="Logo" className="w-8 h-8 md:w-9 md:h-9 object-contain" />
                            </div>
                            <div className="flex flex-col pl-1 justify-center font-sans">
                                <span className="text-xs md:text-sm font-black tracking-[0.18em] text-slate-900 uppercase leading-none whitespace-nowrap">
                                    AETHER
                                </span>
                                <span className="text-[9px] md:text-[10px] font-black tracking-[0.18em] text-blue-600 uppercase leading-none mt-1 whitespace-nowrap">
                                    NUSANTARA
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* 2. TENGAH (Desktop Links) */}
                    <div className="hidden md:flex items-center justify-center flex-1 mx-6">
                        <div className="flex items-center gap-6 lg:gap-8 xl:gap-10">
                            <Link href="/" className={`text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${pathname === '/' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>
                                Beranda
                            </Link>
                            <Link href="/#services" className={`text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${pathname.includes('/jasa') ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>
                                Layanan
                            </Link>
                            <Link href="/portfolio" className={`text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${pathname === '/portfolio' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>
                                Portofolio
                            </Link>
                            <Link href="/about" className={`text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${pathname === '/about' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>
                                Tentang Kami
                            </Link>
                        </div>
                    </div>

                    {/* 3. KANAN (Desktop Button) */}
                    <div className="hidden md:flex items-center justify-end flex-none">
                        <Link href="/contact" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest rounded-full transition-all duration-300 shadow-md shadow-blue-500/10 active:scale-95 whitespace-nowrap">
                            Hubungi Kami
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
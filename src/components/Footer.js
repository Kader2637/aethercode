"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Footer() {
  const pathname = usePathname();

  const FooterLink = ({ href, children }) => {
    const isActive = pathname === href;
    return (
      <li>
        <Link 
          href={href} 
          className={`group flex items-center gap-3 transition-all duration-300 w-fit ${
            isActive ? 'text-brand-600 font-black' : 'text-slate-500 font-bold hover:text-slate-950'
          }`}
        >
          <span className={`h-1 bg-brand-500 transition-all duration-500 rounded-full ${
            isActive ? 'w-4' : 'w-0 group-hover:w-2'
          }`}></span>
          <span className={`${isActive ? 'translate-x-0' : 'group-hover:translate-x-1'} transition-transform duration-300`}>
            {children}
          </span>
        </Link>
      </li>
    );
  };

  return (
    <footer className="bg-white border-t border-slate-100 font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden">
      
      {/* 1. MEGA CALL-TO-ACTION (Pre-Footer) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="relative bg-slate-950 rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-16 overflow-hidden shadow-2xl">
          {/* Efek Ambient Background */}
          <div className="absolute -top-24 -right-24 w-64 md:w-96 h-64 md:h-96 bg-brand-500/20 blur-[80px] md:blur-[120px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-64 md:w-96 h-64 md:h-96 bg-indigo-500/10 blur-[80px] md:blur-[120px] rounded-full" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 text-center lg:text-left">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-[950] text-white tracking-tighter leading-[0.9] mb-6 uppercase italic">
                Defining the <br /> 
                <span className="text-brand-400">Digital Frontier.</span>
              </h2>
              <p className="text-slate-400 font-bold text-sm md:text-lg">
                Jangan biarkan ide besar Anda terkubur dalam folder. Mari kita bangun masa depan bersama Aether Code Studio.
              </p>
            </div>
            <Link href="/contact" className="w-full lg:w-auto px-10 py-5 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-500 hover:text-white transition-all shadow-xl active:scale-95 text-center">
              Let's Build It Now
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-12">
        
        {/* 2. MAIN GRID - Responsive Cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-20">
          
          {/* Column 1: Identity & Tagline */}
          <div className="sm:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <img src="/logo.png" alt="Logo" className="w-10 h-10 md:w-12 md:h-12 group-hover:rotate-[15deg] transition-transform duration-500" />
              <span className="text-xl md:text-2xl font-[950] text-slate-900 uppercase tracking-tighter">
                AETHER<span className="text-brand-600">CODE</span>
              </span>
            </Link>
            
            <div className="space-y-6">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-slate-900 leading-[0.85] tracking-tighter uppercase italic">
                Presisi Piksel, <br className="hidden md:block" />
                <span className="text-transparent" style={{ WebkitTextStroke: '1px #0f172a' }}>Keunggulan Kode.</span>
              </h3>
              <p className="text-slate-500 text-sm md:text-base font-bold max-w-sm leading-relaxed">
                Kami adalah arsitek sistem yang merancang setiap baris kode dengan standar militer untuk performa bisnis yang maksimal.
              </p>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-8">
            <h4 className="font-black text-slate-950 uppercase text-[10px] md:text-[11px] tracking-[0.4em] border-l-4 border-brand-500 pl-4">Layanan Utama</h4>
            <ul className="space-y-4 text-sm">
              <FooterLink href="/jasa/web">Web Development</FooterLink>
              <FooterLink href="/jasa/video">Video Editing</FooterLink>
              <FooterLink href="/jasa/uiux">UI/UX Design</FooterLink>
              <FooterLink href="/jasa/ppt">PPT Design</FooterLink>
              <FooterLink href="/jasa/dokumen">Document Service</FooterLink>
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div className="space-y-8">
            <h4 className="font-black text-slate-950 uppercase text-[10px] md:text-[11px] tracking-[0.4em] border-l-4 border-slate-200 pl-4">Navigasi</h4>
            <ul className="space-y-4 text-sm">
              <FooterLink href="/">Beranda</FooterLink>
              <FooterLink href="/about">Tentang Kami</FooterLink>
              <FooterLink href="/portfolio">Karya & Inovasi</FooterLink>
              <FooterLink href="/contact">Hubungi Tim</FooterLink>
            </ul>
          </div>

        </div>
        
        {/* 3. BOTTOM BAR - Stack on Mobile */}
        <div className="pt-10 border-t border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-10">
          
          {/* Copyright & Location */}
          <div className="flex flex-col items-center lg:items-start gap-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center lg:text-left">
              &copy; 2026 Aether Code Studio. Malang, Indonesia.
            </p>
            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.1em]">Engineered for high-performance enterprises.</p>
          </div>

          {/* Dynamic Badge & Socials */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
             <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-full border border-slate-200 shadow-sm transition-all hover:bg-white">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              <span className="tracking-[0.1em] uppercase text-[9px] font-black text-slate-600">Aether Studio OS: v2.0 Live Build</span>
            </div>

            <div className="flex gap-3">
               <a href="#" className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-black hover:bg-brand-500 hover:-translate-y-1 transition-all shadow-lg">IG</a>
               <a href="#" className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-black hover:bg-brand-500 hover:-translate-y-1 transition-all shadow-lg">LI</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
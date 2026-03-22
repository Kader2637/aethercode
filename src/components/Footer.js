"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    // z-50 dan bg-white menjamin footer ini solid dan tidak transparan
    <footer className="w-full bg-white border-t border-slate-200 font-['Plus_Jakarta_Sans',sans-serif] relative z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 bg-white">
        
        {/* TOP SECTION: BRAND & STATUS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10 bg-white">
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-3 group">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="text-xl font- tracking-tighter text-slate-900 uppercase">
                AETHER<span className="text-brand-600">&nbsp;&nbsp;NUSANTARA</span>
              </span>
            </Link>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] italic">
              Creative Tech Studio
            </p>
          </div>

          {/* STATUS BUILD BADGE (v.02) */}
          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-sm">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </div>
            <span className="tracking-[0.2em] uppercase text-[9px] font-black text-slate-600 italic">
              Build v.02 • Stable
            </span>
          </div>
        </div>

        {/* BOTTOM SECTION: INFO & TECH STACK */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 bg-white">
          
          {/* COPYRIGHT */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
              &copy; 2026 AETHER NUSANTARA STUDIO. MALANG, ID.
            </p>
            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.05em]">
              All Rights Reserved.
            </p>
          </div>

          {/* TECH STACK & SOCIALS */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            
            {/* BUILT WITH NEXT.JS */}
            <div className="flex items-center gap-2 group cursor-default">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Built with</span>
              <div className="flex items-center gap-1.5 bg-slate-950 text-white px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.663 19.335H20.94V4.665h-2.277v14.67zM15.47 4.665l-8.24 10.555V4.665H4.954v14.67h2.235l8.281-10.595v10.595h2.277V4.665h-2.277z"/>
                </svg>
                <span className="text-[10px] font-bold tracking-tighter">Next.js</span>
              </div>
            </div>
            
            {/* SOCIAL LINKS (Dipisah garis vertikal di Desktop) */}
            <div className="hidden md:block w-px h-6 bg-slate-200"></div>
            <div className="flex gap-4">
               <a href="#" className="text-[10px] font-black text-slate-400 hover:text-brand-600 transition-colors uppercase italic tracking-widest">IG</a>
               <a href="#" className="text-[10px] font-black text-slate-400 hover:text-brand-600 transition-colors uppercase italic tracking-widest">LI</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
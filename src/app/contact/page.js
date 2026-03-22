"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [activeService, setActiveService] = useState("Web Development");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const services = ["Web Development", "Video Editing", "UI/UX Design", "PPT Design", "Document", "Lainnya"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const waText = `Halo AETHER CODE! 👋\n\n*NEW PROJECT INQUIRY*\n--------------------------\n👤 *Nama:* ${formData.name}\n📧 *Email:* ${formData.email}\n🛠️ *Layanan:* ${activeService}\n\n*PESAN:* \n${formData.message}\n--------------------------\nMohon feedback-nya. Terima kasih!`;
    window.open(`https://wa.me/6281238193238?text=${encodeURIComponent(waText)}`, '_blank');
  };

  return (
    <main className="bg-white min-h-screen font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 overflow-x-hidden">
      
      {/* 1. BACKGROUND ARSITEKTUR - Mobile Optimized */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] opacity-[0.4]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] md:h-[500px] bg-brand-500/10 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      <section className="relative z-10 pt-28 md:pt-44 pb-16 md:pb-24 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* HEADER - RESPONSIVE TYPOGRAPHY */}
          <div className="text-center mb-12 md:mb-20">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-2 bg-slate-950 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mb-6 shadow-xl rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse inline-block mr-2" />
              Get In Touch
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] font-[900] tracking-tighter leading-[0.9] uppercase italic mb-6 md:mb-8 break-words"
            >
              MARI <br className="hidden sm:block" />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px #0f172a' }}>KOLABORASI.</span>
            </motion.h1>
            
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-base md:text-xl text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed px-2">
              Punya ide besar yang ingin dieksekusi? Kirim pesan dan biarkan tim AETHER CODE merancang solusinya untuk Anda.
            </motion.p>
          </div>

          {/* FORM AREA - ADAPTIVE PADDING */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
            className="bg-white/60 backdrop-blur-2xl border-2 border-slate-100 rounded-[2rem] md:rounded-[3.5rem] p-6 sm:p-10 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.03)] relative overflow-hidden"
          >
            {/* Blueprint Accents (Desktop only for cleanliness) */}
            <div className="hidden md:block absolute top-0 left-0 w-20 h-1 bg-brand-600" />
            <div className="hidden md:block absolute top-0 left-0 w-1 h-20 bg-brand-600" />

            <form onSubmit={handleSubmit} className="space-y-10 md:space-y-16">
              
              {/* INPUT NAMA & EMAIL - Stack on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="relative group">
                  <label className="block text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nama Lengkap</label>
                  <input 
                    type="text" required placeholder="Budi Pratama"
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-slate-200 py-3 md:py-4 text-lg md:text-2xl font-bold focus:outline-none focus:border-brand-600 transition-all placeholder:text-slate-200"
                  />
                </div>
                <div className="relative group">
                  <label className="block text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Alamat Email</label>
                  <input 
                    type="email" required placeholder="budi@email.com"
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-slate-200 py-3 md:py-4 text-lg md:text-2xl font-bold focus:outline-none focus:border-brand-600 transition-all placeholder:text-slate-200"
                  />
                </div>
              </div>

              {/* SELEKSI LAYANAN - SCROLLABLE ON MOBILE */}
              <div>
                <label className="block text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Pilih Layanan Utama</label>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {services.map((s) => (
                    <button
                      key={s} type="button"
                      onClick={() => setActiveService(s)}
                      className={`px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 border-2
                        ${activeService === s 
                          ? "bg-slate-950 border-slate-950 text-white shadow-lg scale-105" 
                          : "bg-white border-slate-100 text-slate-400 hover:border-brand-600"
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* PESAN */}
              <div className="relative group">
                <label className="block text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Detail Proyek</label>
                <textarea 
                  required rows="3" placeholder="Ceritakan ide atau masalah Anda..."
                  value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-slate-200 py-3 md:py-4 text-lg md:text-2xl font-bold focus:outline-none focus:border-brand-600 transition-all resize-none placeholder:text-slate-200"
                />
              </div>

              {/* TOMBOL SUBMIT - FULL WIDTH ON MOBILE */}
              <div className="flex justify-center pt-4">
                <button 
                  type="submit"
                  className="group relative w-full md:w-auto px-10 md:px-20 py-5 md:py-7 bg-slate-950 text-white rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] overflow-hidden transition-all hover:shadow-[0_20px_50px_rgba(14,165,233,0.3)] active:scale-95"
                >
                  <div className="absolute inset-0 bg-brand-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    Kirim ke WhatsApp
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </motion.div>

          {/* QUICK INFO CARDS - STACK ON MOBILE */}
<div className="mt-16 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { 
                label: "WhatsApp Chat", 
                val: "+62 812 3819 3238", 
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                ) 
              },
              { 
                label: "Email Support", 
                val: "hello@AETHERNUSANTARA.com", 
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                ) 
              },
              { 
                label: "Studio Location", 
                val: "Malang, Indonesia", 
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                ) 
              }
            ].map((info, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative bg-white border border-slate-100 p-8 md:p-10 rounded-[2rem] flex flex-col items-start md:items-center text-left md:text-center transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:border-blue-500/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 w-14 h-14 md:w-16 md:h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm border border-slate-100 group-hover:border-blue-600">
                  {info.icon}
                </div>
                
                <div className="relative z-10 w-full">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 group-hover:text-blue-600 transition-colors">
                    {info.label}
                  </p>
                  <p className="text-base md:text-lg font-black text-slate-950 break-all leading-tight">
                    {info.val}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
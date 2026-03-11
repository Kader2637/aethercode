"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
    const team = [
        { name: "Abdul Kader", role: "Fullstack Dev", initials: "AK", desc: "Sang arsitek utama. Membangun infrastruktur server-side yang tangguh sekaligus merajut interaksi frontend yang mulus." },
        { name: "Ezequiel A.", role: "Junior Dev", initials: "EA", desc: "Motor penggerak fitur. Berfokus pada efisiensi penulisan kode, debugging, dan memastikan sistem berjalan ringan." },
        { name: "Rio Andhika", role: "UI/UX & Frontend", initials: "RA", desc: "Menerjemahkan psikologi pengguna ke dalam piksel desain, lalu menghidupkannya melalui koding frontend yang interaktif." },
        { name: "Viktorinus D.", role: "Marketing & Editor", initials: "VD", desc: "Sang pencerita visual. Meramu video editing tajam yang menaikkan retensi dan brand awareness." }
    ];

    return (
        <main className="bg-white min-h-screen overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">

            {/* BACKGROUND GRID GLOBAL */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '60px 60px' }}>
            </div>

            {/* HERO SECTION WITH MARQUEE */}
            <section className="relative pt-44 pb-20 md:pt-64 md:pb-32 overflow-hidden bg-white">

                {/* TEXT BERJALAN (MARQUEE) DENGAN MASKING */}
                <div className="absolute top-1/2 -translate-y-1/2 inset-0 flex flex-col justify-center pointer-events-none select-none z-0 opacity-[0.04]">
                    <div className="flex whitespace-nowrap animate-marquee-slow text-[10rem] md:text-[18rem] font-[900] uppercase leading-none tracking-tighter">
                        <span>AETHER CODE • SINERGI • IMPACT • INNOVATION •&nbsp;</span>
                        <span>AETHER CODE • SINERGI • IMPACT • INNOVATION •&nbsp;</span>
                    </div>
                    <div className="flex whitespace-nowrap animate-marquee-reverse-slow text-[10rem] md:text-[18rem] font-[900] uppercase leading-none tracking-tighter mt-[-2rem] md:mt-[-5rem]">
                        <span className="text-transparent" style={{ WebkitTextStroke: '2px #0f172a' }}>TECH COMMUNITY • BEYOND LOGIC •&nbsp;</span>
                        <span className="text-transparent" style={{ WebkitTextStroke: '2px #0f172a' }}>TECH COMMUNITY • BEYOND LOGIC •&nbsp;</span>
                    </div>
                    {/* Gradient Masking: Biar teks berjalannya memudar halus ke atas dan bawah */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-90"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">

                    {/* BADGE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-3 px-5 py-2 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10 shadow-xl"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
                        01 — Our Story
                    </motion.div>

                    {/* MAIN HEADING DENGAN EFEK GRADIENT & UNDERLINE */}
                    <motion.h1
                        initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-[9rem] font-[900] text-slate-900 tracking-tighter leading-[0.85] mb-14 uppercase italic"
                    >
                        BUKAN HANYA <br />

                        <span className="relative inline-block mt-2 md:mt-4">
                            {/* Efek Warna Gradient yang Super Nyala */}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-indigo-500 to-cyan-400 drop-shadow-sm">
                                KODE & DESAIN.
                            </span>

                            {/* Garis Aksen Bawah (Underline Modern) */}
                            <motion.span
                                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                                className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-[4px] md:h-[8px] bg-gradient-to-r from-brand-500 to-cyan-400 origin-left"
                            ></motion.span>
                        </span>
                    </motion.h1>

                    {/* PARAGRAF */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-lg md:text-2xl text-slate-500 max-w-3xl font-bold leading-relaxed border-l-0 md:border-l-4 border-brand-500 md:pl-8 mx-auto md:mx-0"
                    >
                        AETHER CODE adalah wadah kolaborasi untuk membangun ekosistem digital yang tidak hanya berfungsi, tapi juga menginspirasi.
                    </motion.p>
                </div>
            </section>

            {/* FILOSOFI SECTION - ADVANCED HOLOGRAPHIC ANIMATION */}
            <section className="py-32 lg:py-40 bg-[#020617] text-white relative border-y border-slate-800 overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">

                {/* Dark Tech Background */}
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }}>
                </div>

                {/* Animated Glow Background */}
                <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none"
                />

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">

                    {/* LEFT: CONTENT WITH BLUR REVEAL & STAGGER */}
                    <div className="lg:col-span-5 relative">

                        {/* Header Reveal */}
                        <motion.div
                            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="mb-12"
                        >
                            <span className="flex items-center gap-3 text-brand-500 font-black tracking-[0.4em] uppercase text-[10px] mb-6">
                                <motion.span
                                    initial={{ width: 0 }} whileInView={{ width: 32 }} transition={{ duration: 1, delay: 0.5 }}
                                    className="h-[1px] bg-brand-500"
                                ></motion.span>
                                01 — Philosophy
                            </span>
                            <h2 className="text-5xl md:text-7xl font-[900] tracking-tighter uppercase mb-6 leading-[0.9]">
                                Anatomi <br />
                                <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #64748b' }}>Identitas.</span>
                            </h2>
                            <p className="text-slate-400 font-bold leading-relaxed text-sm border-l-2 border-slate-800 pl-6 py-2">
                                "Setiap piksel dan baris kode adalah manifestasi dari visi teknologi kami yang presisi."
                            </p>
                        </motion.div>

                        {/* Staggered Cards */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                            }}
                            className="space-y-4"
                        >
                            {[
                                { char: "A", title: "Puncak Ambisi", desc: "Struktur vertikal menyerupai menara pada huruf 'A' merepresentasikan tekad mendaki standar tertinggi." },
                                { char: "C", title: "Jaringan Sirkuit", desc: "Lengkungan 'C' dengan aksen sirkuit melambangkan ekosistem teknologi yang solid." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, x: -40, filter: "blur(5px)" },
                                        visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 20 } }
                                    }}
                                    className="relative flex gap-6 p-8 bg-slate-900/40 border border-slate-800 hover:bg-slate-900/80 transition-all duration-500 group overflow-hidden"
                                >
                                    <div className="absolute left-0 top-0 w-[2px] h-full bg-brand-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>

                                    <motion.span
                                        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                                        transition={{ duration: 0.4 }}
                                        className="text-5xl font-black text-slate-800 group-hover:text-brand-500 transition-colors duration-500 font-mono origin-center inline-block"
                                    >
                                        {item.char}
                                    </motion.span>
                                    <div>
                                        <h4 className="font-black uppercase tracking-tight text-slate-100 mb-2 group-hover:text-white transition-colors">{item.title}</h4>
                                        <p className="text-xs text-slate-500 font-bold leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* RIGHT: HOLOGRAPHIC BLUEPRINT SCANNER */}
                    <div className="lg:col-span-7 flex justify-center lg:justify-end relative mt-12 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative w-full max-w-[450px] aspect-square flex items-center justify-center border border-slate-800/50 rounded-full bg-slate-900/20 backdrop-blur-sm p-12 group overflow-hidden"
                        >
                            {/* Tech Rings (Smooth Spin) */}
                            <motion.div
                                animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border border-slate-800"
                            />
                            <motion.div
                                animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-6 rounded-full border border-dashed border-slate-800/80"
                            />

                            {/* HOLOGRAPHIC SCANNER LINE (Naik Turun) */}
                            <motion.div
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-[2px] bg-brand-500/50 shadow-[0_0_20px_#0ea5e9] z-20 pointer-events-none"
                            />

                            {/* Crosshairs */}
                            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-slate-800/50 group-hover:bg-brand-500/30 transition-colors duration-700 z-0"></div>
                            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-slate-800/50 group-hover:bg-brand-500/30 transition-colors duration-700 z-0"></div>

                            {/* 3D Floating Logo */}
                            <motion.img
                                animate={{ y: [-10, 10, -10], rotateZ: [-2, 2, -2] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                src="/logo.png"
                                alt="Aether Code Logo"
                                className="relative z-10 w-full max-w-[260px] drop-shadow-[0_0_40px_rgba(14,165,233,0.5)] group-hover:scale-110 transition-transform duration-700"
                            />

                            {/* HUD Elements */}
                            <div className="absolute top-10 left-10 text-[9px] text-slate-500 font-mono hidden md:block uppercase tracking-widest z-10">
                                SYS.V1.0 <br /> <span className="text-brand-500">ACTIVE</span>
                            </div>
                            <motion.div
                                animate={{ opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }}
                                className="absolute bottom-10 right-10 text-[9px] text-brand-500 font-mono hidden md:block uppercase tracking-widest z-10"
                            >
                                [ SCANNING ]
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* TEAM SECTION - PREMIUM TECH ROSTER */}
            <section className="py-32 lg:py-40 bg-[#f8fafc] relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] z-10">

                {/* Drafting Board Background (Dot Pattern) */}
                <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none"
                    style={{ backgroundImage: `radial-gradient(#cbd5e1 1.5px, transparent 1.5px)`, backgroundSize: '32px 32px' }}>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 md:mb-24 gap-8 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full md:w-auto"
                        >
                            {/* Badge Wrapper - Center on Mobile */}
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                                <span className="w-8 h-[2px] bg-brand-600"></span>
                                <span className="text-brand-600 font-black tracking-[0.4em] uppercase text-[10px]">02 — The Roster</span>
                            </div>

                            {/* Responsive Font Size: 4xl di HP, 8xl di Desktop */}
                            <h3 className="text-4xl md:text-8xl font-[900] text-slate-900 tracking-tighter leading-[0.9] md:leading-[0.85] uppercase italic">
                                DI BALIK <br className="hidden md:block" />
                                <span className="text-transparent" style={{ WebkitTextStroke: '1px #94a3b8' }}> LAYAR.</span>
                            </h3>
                        </motion.div>

                        {/* Description - Center on Mobile, Left Border on Desktop */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-slate-500 font-bold max-w-sm border-t md:border-t-0 md:border-l-2 border-slate-200 pt-6 md:pt-0 md:pl-6 text-xs md:text-sm leading-relaxed"
                        >
                            Empat arsitek digital yang memadukan logika komputasi, estetika desain, dan strategi pasar secara harmonis.
                        </motion.p>
                    </div>

                    {/* Cards Grid */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                                }}
                                className="relative p-8 bg-white border border-slate-200 hover:border-brand-500 shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden"
                            >
                                {/* HUD Corner Accents (Detail Teknologi) */}
                                <div className="absolute top-4 left-4 w-2 h-2 border-t-2 border-l-2 border-slate-300 group-hover:border-brand-400 transition-colors z-20"></div>
                                <div className="absolute bottom-4 right-4 w-2 h-2 border-b-2 border-r-2 border-slate-300 group-hover:border-brand-400 transition-colors z-20"></div>

                                {/* Smooth Slide-Up Background */}
                                <div className="absolute inset-0 bg-[#020617] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1] z-0"></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Top: Avatar & Meta */}
                                    <div className="flex justify-between items-start mb-12">
                                        <div className="w-14 h-14 bg-slate-50 text-slate-900 border border-slate-100 flex items-center justify-center text-xl font-[900] group-hover:bg-brand-500 group-hover:text-black group-hover:border-brand-400 transition-all duration-500 shadow-sm group-hover:shadow-brand-500/50">
                                            {member.initials}
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[9px] font-mono text-slate-400 group-hover:text-slate-500 transition-colors block mb-1">ID // 0{i + 1}</span>
                                            <span className="text-[9px] font-mono text-brand-500 group-hover:text-slate-400 transition-colors block animate-pulse">TEAM AETHER CODE</span>
                                        </div>
                                    </div>

                                    {/* Main Info */}
                                    <div className="mt-auto">
                                        <h4 className="text-2xl font-[900] text-slate-900 uppercase tracking-tight mb-2 group-hover:text-white transition-colors duration-500">
                                            {member.name}
                                        </h4>
                                        <p className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em] mb-6 group-hover:text-brand-400 group-hover:text-white transition-colors duration-500">
                                            {member.role}
                                        </p>

                                        {/* Divider */}
                                        <div className="w-full h-[1px] bg-slate-100 group-hover:bg-slate-800 mb-6 transition-colors duration-500"></div>

                                        {/* Description - ALWAYS VISIBLE */}
                                        <p className="text-xs text-slate-500 font-bold leading-relaxed group-hover:text-slate-400 transition-colors duration-500 min-h-[80px]">
                                            {member.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </section>

        </main>
    );
}
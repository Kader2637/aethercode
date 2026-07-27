"use client";
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';

function SmokeEffect({ rocketRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let t = 0;
    const particles = [];

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class SmokeParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        // Pointing down-left (exhaust direction)
        this.angle = 2.3 + (Math.random() - 0.5) * 0.6;
        this.speed = 1.0 + Math.random() * 2.0;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.size = 6 + Math.random() * 12;
        this.maxSize = 85 + Math.random() * 55;
        this.opacity = 0.5 + Math.random() * 0.4;
        this.life = 0;
        this.maxLife = 60 + Math.random() * 30;
        
        // Curated brand blue-gray palette for smoke
        const blueHue = Math.random() > 0.45 ? (210 + Math.random() * 20) : (195 + Math.random() * 15);
        this.color = `hsla(${blueHue}, 85%, 94%, `;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.size += (this.maxSize - this.size) * 0.035;
        this.life++;
        this.opacity = Math.max(0, (1 - this.life / this.maxLife)) * 0.65;
      }

      draw(ctx) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x, this.y, this.size * 0.05,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, this.color + this.opacity + ')');
        gradient.addColorStop(0.35, this.color + (this.opacity * 0.35) + ')');
        gradient.addColorStop(1, this.color + '0)');
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const animate = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (rocketRef && rocketRef.current) {
        const rocketRect = rocketRef.current.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();

        const rx = rocketRect.left - canvasRect.left + rocketRect.width / 2;
        const ry = rocketRect.top - canvasRect.top + rocketRect.height / 2;

        // Exhaust positions (lower-left section of the rocket image boundaries)
        const ex = rx - rocketRect.width * 0.18;
        const ey = ry + rocketRect.height * 0.22;

        // Emit particles
        if (t % 2 === 0) {
          particles.push(new SmokeParticle(ex, ey));
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.opacity <= 0.01 || p.life >= p.maxLife) {
          particles.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [rocketRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full z-0" />;
}

export default function Home() {
  const rocketRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let t = 0;
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      const container = document.getElementById('hero-container');
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouse.targetX = (e.clientX - rect.left) / rect.width - 0.5;
      mouse.targetY = (e.clientY - rect.top) / rect.height - 0.5;
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    const heroContainer = document.getElementById('hero-container');
    if (heroContainer) {
      heroContainer.addEventListener('mousemove', handleMouseMove);
      heroContainer.addEventListener('mouseleave', handleMouseLeave);
    }

    const animate = () => {
      t++;
      const floatY = Math.sin(t * 0.03) * 12;
      const floatX = Math.cos(t * 0.015) * 5;
      const floatRotate = Math.sin(t * 0.03) * 1.5;

      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const tiltX = mouse.y * -18;
      const tiltY = mouse.x * 18;

      if (rocketRef.current) {
        rocketRef.current.style.transform = `
          translate3d(${floatX}px, ${floatY}px, 40px)
          rotateZ(${floatRotate}deg)
          rotateX(${tiltX}deg)
          rotateY(${tiltY}deg)
        `;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (heroContainer) {
        heroContainer.removeEventListener('mousemove', handleMouseMove);
        heroContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const [heroTyped, setHeroTyped] = useState("");
  const toolsRow1 = [
    { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", url: "https://react.dev" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", url: "https://nextjs.org" },
    { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg", url: "https://vuejs.org" },
    { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg", url: "https://angular.io" },
    { name: "Svelte", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg", url: "https://svelte.dev" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", url: "https://www.typescriptlang.org" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", url: "https://www.python.org" },
    { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg", url: "https://go.dev" },
    { name: "Rust", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg", url: "https://www.rust-lang.org" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", url: "https://www.java.com" },
    { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg", url: "https://kotlinlang.org" },
    { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg", url: "https://flutter.dev" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", url: "https://tailwindcss.com" },
  ];

  const toolsRow2 = [
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", url: "https://nodejs.org" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", url: "https://www.mongodb.com" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", url: "https://www.postgresql.org" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", url: "https://www.mysql.com" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", url: "https://www.docker.com" },
    { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg", url: "https://kubernetes.io" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", url: "https://aws.amazon.com" },
    { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg", url: "https://cloud.google.com" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", url: "https://firebase.google.com" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", url: "https://github.com" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", url: "https://www.figma.com" },
    { name: "Premiere Pro", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg", url: "https://www.adobe.com/products/premiere.html" },
    { name: "After Effects", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg", url: "https://www.adobe.com/products/aftereffects.html" },
    { name: "Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-original.svg", url: "https://www.adobe.com/products/illustrator.html" },
  ];

  const ToolItem = ({ item }) => (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      // Tambahin 'shrink-0' di sini biar card nggak gepeng di layar kecil
      className="shrink-0 flex items-center gap-3 md:gap-4 px-4 py-2.5 md:px-6 md:py-4 bg-white border border-slate-100 shadow-[0_4px_15px_rgba(0,0,0,0.03)] rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] hover:border-brand-200 group cursor-pointer"
      title={`Kunjungi web resmi ${item.name}`}
    >
      <img
        src={item.icon}
        alt={item.name}
        // Tambahin 'shrink-0' juga di gambar biar logonya nggak penyok
        className="shrink-0 w-6 h-6 md:w-8 md:h-8 object-contain transition-transform duration-300 group-hover:-translate-y-1"
      />
      <span className="text-[10px] md:text-xs font-black text-slate-500 group-hover:text-brand-600 uppercase tracking-widest transition-colors duration-300 whitespace-nowrap">
        {item.name}
      </span>
    </a>
  );

  useEffect(() => {
    AOS.init({ once: false, mirror: true, offset: 50, duration: 800 });

    // Typewriter Original Logic
    const texts = ["YOUR BRAND", "YOUR PROJECT", "YOUR FUTURE", "YOUR VISION"];
    let textIndex = 0; let charIndex = 0; let isDeleting = false;
    let typeTimer;

    function type() {
      const full = texts[textIndex];
      setHeroTyped(isDeleting ? full.substring(0, charIndex - 1) : full.substring(0, charIndex + 1));

      let speed = isDeleting ? 50 : 150;
      if (!isDeleting && charIndex === full.length) { speed = 2000; isDeleting = true; }
      else if (isDeleting && charIndex === 0) { speed = 500; isDeleting = false; textIndex = (textIndex + 1) % texts.length; }
      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
      typeTimer = setTimeout(type, speed);
    }
    type();
    return () => clearTimeout(typeTimer);
  }, []);

  return (
    <main>
      {/* HERO SECTION */}
      <section id="hero-container" className="relative flex flex-col justify-center items-center bg-gradient-to-b from-[#f8fafc] via-[#ffffff] to-[#f8fafc] overflow-hidden min-h-[100dvh] w-full pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 flex-1">
          
          {/* Left Column: Copy & Actions */}
          <div className="w-full lg:w-[50%] flex flex-col items-start text-left z-20" data-aos="fade-right" data-aos-duration="1000">
            <div className="mb-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-full w-full bg-blue-600"></span>
                </span>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                  Official Creative Partner
                </span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6 font-sans">
              Solusi Digital <br />
              Untuk <span className="text-blue-600 drop-shadow-sm">Setiap Ide</span>
            </h1>

            <p className="text-slate-500 text-sm sm:text-base lg:text-lg max-w-lg font-medium leading-relaxed mb-8">
              Kami menghadirkan layanan website dan desain berkualitas untuk membantu bisnis Anda tampil lebih profesional dan berdaya saing.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="https://wa.me/6281238193238"
                target="_blank"
                className="group relative px-8 py-3.5 bg-blue-600 text-white font-bold text-sm rounded-full overflow-hidden shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center gap-2"
              >
                <div className="absolute inset-0 bg-blue-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Konsultasi Gratis
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </Link>

              <Link
                href="/portfolio"
                className="px-8 py-3.5 border-2 border-slate-200 text-slate-700 font-bold italic text-sm rounded-full hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
              >
                Lihat Portofolio
              </Link>
            </div>
          </div>

          {/* Right Column: Floating Rocket and Interactive Smoke (mockup removed) */}
          <div className="w-full lg:w-[50%] flex items-center justify-center relative min-h-[500px] lg:min-h-[680px] z-10" data-aos="fade-left" data-aos-duration="1000">
            {/* Smoke Canvas Effect */}
            <SmokeEffect rocketRef={rocketRef} />

            {/* Glowing background bubble behind rocket */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] -z-10 animate-pulse" />

            {/* Floating 3D-Rotated Rocket Container (Even Larger Visual) */}
            <div className="relative w-full max-w-[580px] sm:max-w-[680px] lg:max-w-[800px] xl:max-w-[950px] aspect-square flex items-center justify-center" style={{ perspective: '1000px' }}>
              <img
                ref={rocketRef}
                src="/roket.png"
                alt="Aether Rocket"
                className="w-full h-full object-contain select-none z-10 transition-transform duration-100 ease-out drop-shadow-2xl"
                style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
              />
            </div>
          </div>

        </div>

        {/* Cityscape and Floating Cloud Overlays */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          {/* Skyline back layer */}
          <svg className="relative block w-full h-[90px] sm:h-[130px] md:h-[170px] -mb-1 opacity-[0.25]" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path
              d="M0,200 L0,140 L30,140 L30,160 L60,160 L60,110 L100,110 L100,150 L140,150 L140,90 L170,90 L170,120 L220,120 L220,70 L250,70 L250,150 L280,150 L280,110 L330,110 L330,130 L370,130 L370,60 L410,60 L410,140 L450,140 L450,80 L500,80 L500,120 L550,120 L550,160 L600,160 L600,90 L650,90 L650,140 L690,140 L690,50 L730,50 L730,110 L780,110 L780,130 L830,130 L830,70 L870,70 L870,150 L910,150 L910,90 L960,90 L960,120 L1010,120 L1010,160 L1060,160 L1060,80 L1100,80 L1100,140 L1150,140 L1150,100 L1200,100 L1200,200 Z"
              fill="#94a3b8"
            />
          </svg>
          {/* Skyline middle layer */}
          <svg className="absolute bottom-0 left-0 block w-full h-[75px] sm:h-[110px] md:h-[140px] -mb-1 opacity-[0.4] z-10" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path
              d="M0,200 L0,160 L40,160 L40,130 L90,130 L90,100 L120,100 L120,150 L180,150 L180,120 L210,120 L210,80 L260,80 L260,140 L300,140 L300,160 L350,160 L350,90 L390,90 L390,130 L440,130 L440,110 L480,110 L480,150 L530,150 L530,70 L580,70 L580,120 L620,120 L620,140 L670,140 L670,100 L710,100 L710,160 L760,160 L760,80 L800,80 L800,120 L850,120 L850,140 L900,140 L900,90 L950,90 L950,130 L1000,130 L1000,110 L1050,110 L1050,150 L1100,150 L1100,130 L1150,130 L1150,160 L1200,160 L1200,200 Z"
              fill="#64748b"
            />
          </svg>
          {/* Skyline foreground layer */}
          <svg className="absolute bottom-0 left-0 block w-full h-[60px] sm:h-[80px] md:h-[105px] -mb-1 opacity-[0.2] z-20" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path
              d="M0,200 L0,180 L50,180 L50,150 L80,150 L80,120 L130,120 L130,160 L170,160 L170,140 L220,140 L220,100 L250,100 L250,90 L270,90 L270,100 L290,100 L290,170 L340,170 L340,120 L380,120 L380,150 L430,150 L430,130 L490,130 L490,180 L540,180 L540,90 L570,90 L570,80 L590,80 L590,90 L610,90 L610,160 L660,160 L660,110 L700,110 L700,140 L750,140 L750,120 L810,120 L810,170 L860,170 L860,130 L910,130 L910,150 L960,150 L960,100 L990,100 L990,90 L1010,90 L1010,100 L1030,100 L1030,160 L1080,160 L1080,120 L1120,120 L1120,150 L1170,150 L1170,180 L1200,180 L1200,200 Z"
              fill="#334155"
            />
          </svg>

          {/* Fade layout gradient mask */}
          <div className="absolute bottom-0 w-full h-[60px] bg-gradient-to-t from-white via-white/80 to-transparent z-30" />

          {/* Drifting Clouds */}
          <motion.div
            className="absolute bottom-[-15px] left-[-5%] w-[45%] h-[80px] bg-white rounded-full filter blur-xl opacity-[0.95] z-30"
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-25px] left-[35%] w-[35%] h-[90px] bg-white rounded-full filter blur-xl opacity-[0.9] z-30"
            animate={{ x: [0, -25, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-20px] right-[-5%] w-[40%] h-[85px] bg-white rounded-full filter blur-xl opacity-[0.95] z-30"
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>

      {/* TECH STACK MARQUEE SECTION */}
      <section className="py-12 bg-white border-b border-slate-100 overflow-hidden relative">
        <div className="w-full max-w-[100rem] mx-auto px-4 md:px-10">
          <div className="text-center mb-6">
            <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              Klik Ikon Untuk Membuka Dokumentasi Resmi
            </p>
          </div>

          <div className="relative py-2 md:py-4">
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 z-20 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 z-20 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>

            <div className="flex gap-4 md:gap-10 animate-marquee-slow items-center mb-4 md:mb-6 relative z-10 pl-6 md:pl-10">
              {[...toolsRow1, ...toolsRow1].map((item, idx) => (
                <ToolItem key={`row1-${idx}`} item={item} />
              ))}
            </div>

            <div className="flex gap-4 md:gap-10 animate-marquee-reverse-slow items-center relative z-10 pr-6 md:pr-10">
              {[...toolsRow2, ...toolsRow2].map((item, idx) => (
                <ToolItem key={`row2-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 md:py-32 bg-white relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

            <div className="w-full lg:w-1/2 relative" data-aos="fade-right">

              <div className="relative w-full aspect-square sm:aspect-video lg:aspect-square bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <img
                  src="/logo.png"
                  alt="AETHER NUSANTARA Logo"
                  className="w-1/2 max-w-[180px] md:max-w-[220px] object-contain transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="relative mt-6 sm:mt-0 sm:absolute sm:-bottom-8 sm:-right-8 p-6 md:p-8 bg-slate-950 text-white rounded-2xl md:rounded-[2rem] shadow-xl w-full sm:w-[320px] border border-slate-800" data-aos="fade-up" data-aos-delay="200">
                <div className="w-8 h-1 bg-brand-500 mb-5 rounded-full"></div>
                <p className="text-xs md:text-sm font-bold leading-relaxed text-slate-200 uppercase tracking-widest">
                  Mendorong batasan logika untuk menciptakan dampak digital nyata.
                </p>
              </div>

            </div>

            <div className="w-full lg:w-1/2 flex flex-col" data-aos="fade-left">

              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <span className="w-6 h-[2px] bg-brand-600"></span>
                <span className="text-brand-600 font-black tracking-[0.4em] uppercase text-[10px] md:text-xs">
                  Filosofi Aether
                </span>
              </div>

              <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-[-0.03em] leading-[0.95] uppercase mb-6 md:mb-8">
                MENUJU MASA <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1px #0f172a' }}>
                  DEPAN DIGITAL.
                </span>
              </h3>

              <p className="text-base md:text-lg text-slate-500 font-bold leading-relaxed mb-10 md:mb-12">
                AETHER NUSANTARA merupakan ekosistem digital yang menghubungkan kreativitas,
                teknologi, dan kolaborasi untuk menciptakan inovasi yang berdampak serta
                mendorong generasi muda menuju masa depan yang lebih progresif.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-12">

                <div className="p-6 md:p-8 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-brand-200 group">
                  <span className="inline-block px-3 py-1.5 bg-slate-50 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-md mb-4 border border-slate-100 transition-colors group-hover:bg-brand-50 group-hover:text-brand-600 group-hover:border-brand-100">
                    Visi Pertumbuhan
                  </span>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">
                    Menjadi katalis bagi talenta digital untuk berkembang, berinovasi, dan
                    menciptakan dampak positif melalui teknologi.
                  </p>
                </div>

                <div className="p-6 md:p-8 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-brand-200 group">
                  <span className="inline-block px-3 py-1.5 bg-slate-50 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-md mb-4 border border-slate-100 transition-colors group-hover:bg-brand-50 group-hover:text-brand-600 group-hover:border-brand-100">
                    Inovasi Berkelanjutan
                  </span>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">
                    Mengubah ide menjadi solusi nyata yang modern, relevan, dan mampu
                    menjawab tantangan era digital.
                  </p>
                </div>

              </div>

              <div className="flex flex-col gap-4">
                {[
                  "Membangun Generasi Digital Berdaya Saing",
                  "Menghubungkan Kreativitas Dan Teknologi",
                  "Bertumbuh Bersama Menuju Masa Depan"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group w-fit cursor-default">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-brand-600 group-hover:scale-150 transition-all duration-300"></div>
                    <span className="text-xs md:text-sm font-black text-slate-600 uppercase tracking-widest transition-colors duration-300 group-hover:text-slate-950">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 lg:py-32 bg-slate-50/50 relative overflow-hidden border-y border-slate-100">
        <div className="absolute inset-0 z-0 opacity-[0.5] pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px]"></div>

        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-100/20 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 font-['Plus_Jakarta_Sans',sans-serif]">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 md:mb-24 gap-10"
          >
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-[2px] bg-blue-600"></span>
                <span className="text-blue-600 font-black tracking-[0.4em] uppercase text-[10px] md:text-xs">Ekspertise Kami</span>
              </div>
              <h3 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-slate-950 tracking-[-0.04em] leading-[0.9] uppercase italic">
                Layanan <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #0f172a' }}>Unggulan.</span>
              </h3>
            </div>
            <div className="lg:mb-4">
              <p className="text-slate-500 font-bold text-base md:text-lg max-w-[320px] leading-relaxed border-l-[3px] border-blue-600 pl-6 py-1">
                Solusi digital presisi dengan standar industri global untuk eskalasi bisnis Anda.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Web Development", tag: "TECH", href: "/jasa/web", desc: "Website kustom, Landing Page, hingga Web Apps yang responsif dan super cepat.", icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9-9H3m9 9a9 9 0 01-9-9m9 9c0 6.903-5.097 12.5-11.375 12.5M3 12h18"></path></svg>
                )
              },
              {
                title: "UI/UX Design", tag: "DESIGN", href: "/jasa/uiux", desc: "Antarmuka modern dengan pengalaman pengguna yang intuitif dan interaktif di Figma.", icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                )
              },
              {
                title: "Video Production", tag: "MEDIA", href: "/jasa/video", desc: "Editing konten cinematic untuk brand awareness, reels, hingga iklan produk premium.", icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                )
              },
              {
                title: "PPT Presentation", tag: "BUSINESS", href: "/jasa/ppt", desc: "Slide premium untuk kebutuhan pitching investor, seminar, dan presentasi bisnis.", icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 2v-6m-8 13h10a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                )
              },
              {
                title: "Document Service", tag: "ADMIN", href: "/jasa/dokumen", desc: "Pengolahan data, penulisan laporan, dan administrasi dokumen profesional.", icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                )
              }
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
                className="h-full"
              >
                <Link
                  href={s.href}
                  className="group relative bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.1)] hover:border-blue-200 transition-all duration-500 flex flex-col justify-between h-full overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                    <span className="text-7xl font-black text-slate-900 tracking-tighter italic">0{i + 1}</span>
                  </div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-slate-50 text-blue-600 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm border border-slate-100 group-hover:border-blue-600">
                      {s.icon}
                    </div>

                    <h4 className="text-2xl font-black text-slate-950 mb-4 uppercase tracking-tight leading-tight">
                      {s.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-bold">
                      {s.desc}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between mt-12 pt-6 border-t border-slate-50">
                    <span className="text-[10px] font-black text-slate-400 group-hover:text-blue-600 uppercase tracking-widest transition-colors">Lihat Detail</span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/contact" className="group relative bg-slate-950 p-8 md:p-10 rounded-[2rem] border border-slate-900 shadow-2xl hover:border-blue-500 transition-all duration-500 flex flex-col justify-between overflow-hidden min-h-[320px] h-full">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 bg-blue-600 text-[9px] font-black text-white uppercase tracking-widest rounded-md mb-6">
                    Custom Project
                  </div>
                  <h4 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter italic leading-none">
                    Projek <br /> <span className="text-blue-500">Khusus?</span>
                  </h4>
                  <p className="text-slate-400 text-sm font-bold leading-relaxed max-w-[220px]">Diskusikan ide gila Anda langsung dengan tim expert kami.</p>
                </div>

                <div className="relative z-10 mt-8 flex items-center gap-3">
                  <div className="flex-1 py-4 bg-white text-slate-950 font-black uppercase tracking-widest text-[10px] text-center rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    HUBUNGI KAMI
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white group-hover:border-blue-500 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                  </div>
                </div>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ACADEMY SECTION */}
      <section id="academy" className="py-24 md:py-40 bg-[#020617] relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">

        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-brand-600/10 rounded-full blur-[80px] md:blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Header Section - RESPONSIVE FIX */}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 md:mb-24 gap-6 text-center md:text-left" data-aos="fade-up">
            <div className="max-w-3xl w-full">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4 md:mb-6">
                <span className="w-8 md:w-10 h-[2px] bg-brand-500"></span>
                <span className="text-brand-500 font-black tracking-[0.3em] md:tracking-[0.5em] uppercase text-[9px] md:text-[10px]">Development Hub</span>
              </div>
              <h3 className="text-5xl md:text-8xl font-[900] text-white tracking-tighter leading-[0.9] md:leading-[0.8] uppercase">
                AETHER <br className="hidden md:block" />
                <span className="text-transparent" style={{ WebkitTextStroke: '1px #f8fafc' }}>ACADEMY.</span>
              </h3>
            </div>
            <div className="w-full md:max-w-[300px] pt-2 md:pt-4">
              <p className="text-slate-400 font-bold text-xs md:text-sm leading-relaxed border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
                Kurikulum berbasis industri yang dirancang untuk mencetak talenta digital kompetitif.
              </p>
            </div>
          </div>

          {/* Grid Modul - Responsive Grid 1 Col (Mobile) to 3 Col (Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800/30 border border-slate-800/50">
            {[
              { title: "Laravel Backend", icon: "󰴐", desc: "Arsitektur server-side modern dengan skalabilitas tinggi." },
              { title: "Modern UI/UX", icon: "🎨", desc: "Seni antarmuka yang mengutamakan psikologi pengguna." },
              { title: "Utility-First CSS", icon: "⚡", desc: "Membangun sistem desain cepat dengan Tailwind CSS." },
              { title: "JS Logic & DOM", icon: "JS", desc: "Logika pemrograman fundamental untuk web interaktif." },
              { title: "SQL & Database", icon: "🗄️", desc: "Manajemen data efisien dan optimasi query tingkat lanjut." },
              { title: "Git & GitHub", icon: "🌳", desc: "Standardisasi workflow kolaborasi tim koding profesional." }
            ].map((course, i) => (
              <div
                key={i}
                className="group relative bg-[#020617] p-8 md:p-12 transition-all duration-500 cursor-default hover:bg-slate-900/80"
                data-aos="fade-up"
                data-aos-delay={i * 50}
              >
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-brand-500 group-hover:w-full transition-all duration-700"></div>

                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl text-slate-600 group-hover:text-brand-400 group-hover:scale-110 transition-all duration-500 mb-6 md:mb-10 inline-block font-mono">
                    {course.icon}
                  </div>

                  <h4 className="text-xl md:text-2xl font-[900] text-white mb-3 md:mb-4 uppercase tracking-tight group-hover:text-brand-400 transition-colors">
                    {course.title}
                  </h4>

                  <p className="text-slate-500 text-[11px] md:text-sm leading-relaxed font-bold mb-8 md:mb-10 group-hover:text-slate-200 transition-colors">
                    {course.desc}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-[8px] md:text-[9px] font-black text-slate-700 group-hover:text-brand-500 uppercase tracking-[0.2em] transition-colors">Industry Standard</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-brand-500 transition-all duration-500"></div>
                  </div>
                </div>

                <span className="absolute bottom-4 md:bottom-6 right-6 md:right-8 text-lg md:text-xl font-black text-slate-900 group-hover:text-brand-900/40 transition-colors pointer-events-none">
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-12 md:mt-20 flex justify-center" data-aos="zoom-in">
            <Link
              href="#"
              className="group relative w-full md:w-auto px-10 md:px-14 py-5 md:py-6 bg-white overflow-hidden rounded-none transition-all duration-500 text-center"
            >
              <div className="absolute inset-0 bg-brand-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              <span className="relative z-10 text-black group-hover:text-black font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-[11px] transition-colors duration-500">
                Eksplorasi Modul
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION: PORTFOLIO & MARKETPLACE (4 DATA LENGKAP) */}
      <section id="portfolio" className="py-24 md:py-32 bg-white relative overflow-hidden border-b border-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">

        {/* Background Decorative */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none -z-10"
          style={{ backgroundImage: `radial-gradient(#000 1.5px, transparent 1.5px)`, backgroundSize: '30px 30px' }}>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Header Section - FIX RESPONSIVE ALIGNMENT */}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 md:mb-20 gap-6 text-center md:text-left" data-aos="fade-up">
            <div className="max-w-2xl w-full">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4 md:mb-6">
                <span className="w-8 md:w-12 h-[2px] bg-brand-600"></span>
                <span className="text-brand-600 font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-[9px] md:text-[10px]">Showcase & Marketplace</span>
              </div>
              <h3 className="text-4xl md:text-7xl font-[900] text-slate-900 tracking-tighter leading-[0.9] md:leading-none uppercase italic">
                Karya & <br className="hidden md:block" /> <span className="text-slate-400">Inovasi.</span>
              </h3>
            </div>
            <div className="w-full md:max-w-[300px] pt-4 border-t md:border-t-0 md:border-l-4 border-brand-500 md:pl-6">
              <p className="text-slate-500 font-bold text-xs md:text-sm leading-relaxed">
                Eksplorasi ekosistem AETHER NUSANTARA: Dari riset lingkungan hingga produk digital siap pakai.
              </p>
            </div>
          </div>

          {/* MAIN PROJECTS (INNOVATION) - RESPONSIVE 1 to 2 COLS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20 md:mb-24">
            {/* 1. INNOVATE OS */}
            <div className="group relative" data-aos="fade-up">
              <div className="relative h-[350px] md:h-[450px] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-xl transition-all duration-700 group-hover:shadow-brand-500/20">
                <img src="project/innovateos.png" alt="Innovate OS" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-90 transition-opacity"></div>

                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                  <span className="inline-block px-3 py-1 bg-brand-600 text-white text-[8px] font-black uppercase tracking-widest rounded-full mb-3">Flagship</span>
                  <h4 className="text-2xl md:text-3xl font-black text-white mb-2 md:mb-4 uppercase">INNOVATE OS</h4>
                  <p className="text-slate-300 text-[11px] md:text-sm font-medium mb-6 md:mb-8 max-w-xs">Platform kecerdasan lingkungan & edukasi karbon.</p>
                  <Link href="https://innovate-os.vercel.app/" target="_blank" className="inline-flex items-center gap-3 text-white font-black text-[9px] md:text-[10px] uppercase tracking-widest group/btn">
                    <span className="border-b-2 border-brand-500 pb-1">Lihat Project</span>
                    <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. TANITRADE */}
            <div className="group relative" data-aos="fade-up" data-aos-delay="100">
              <div className="relative h-[350px] md:h-[450px] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-xl transition-all duration-700 group-hover:shadow-emerald-500/20">
                <img src="project/tanitrade.png" alt="Tani Trade" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-90 transition-opacity"></div>

                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                  <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest rounded-full mb-3">Sustainability</span>
                  <h4 className="text-2xl md:text-3xl font-black text-white mb-2 md:mb-4 uppercase">TaniTrade</h4>
                  <p className="text-slate-300 text-[11px] md:text-sm font-medium mb-6 md:mb-8 max-w-xs">Marketplace agrikultur untuk petani lokal.</p>
                  <Link href="https://tanitrade.netlify.app/" target="_blank" className="inline-flex items-center gap-3 text-white font-black text-[9px] md:text-[10px] uppercase tracking-widest group/btn">
                    <span className="border-b-2 border-emerald-500 pb-1">Lihat Project</span>
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* MARKETPLACE SECTION - RESPONSIVE CARDS */}
          <div className="mb-10 flex items-center gap-4">
            <h5 className="text-[9px] md:text-xs font-black text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap">Ready to Use Templates</h5>
            <div className="flex-1 h-[1px] bg-slate-100"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* 3. AURORA TRAVEL */}
            <div className="bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500" data-aos="fade-up">
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-full sm:w-40 md:w-56 h-40 md:h-48 rounded-xl md:rounded-[1.5rem] overflow-hidden shrink-0">
                  <img src="project/auroratravel.png" className="w-full h-full object-cover" alt="Aurora" />
                </div>
                <div className="flex-1 w-full text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-4 gap-2">
                    <h4 className="text-lg md:text-xl font-black text-slate-900 uppercase">Aurora Travel</h4>
                    <span className="text-[10px] font-black text-brand-600 bg-brand-50 px-3 py-1 rounded-full uppercase">Rp 500k</span>
                  </div>
                  <p className="text-slate-500 text-[11px] font-bold leading-relaxed mb-6">Premium Travel Agency template with WhatsApp & Tour Packages.</p>
                  <button className="w-full py-3 bg-slate-900 text-white font-black text-[9px] uppercase tracking-widest rounded-xl hover:bg-brand-600 transition-all">Beli Template</button>
                </div>
              </div>
            </div>

            {/* 4. IT SOLUTIONS */}
            <div className="bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500" data-aos="fade-up" data-aos-delay="100">
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-full sm:w-40 md:w-56 h-40 md:h-48 rounded-xl md:rounded-[1.5rem] overflow-hidden shrink-0">
                  <img src="project/itdevsolutions.png" className="w-full h-full object-cover" alt="IT Sol" />
                </div>
                <div className="flex-1 w-full text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-4 gap-2">
                    <h4 className="text-lg md:text-xl font-black text-slate-900 uppercase">IT SOLUTIONS</h4>
                    <span className="text-[10px] font-black text-brand-600 bg-brand-50 px-3 py-1 rounded-full uppercase">Rp 650k</span>
                  </div>
                  <p className="text-slate-500 text-[11px] font-bold leading-relaxed mb-6">Professional Software House Landing Page with Modern UI.</p>
                  <button className="w-full py-3 bg-slate-900 text-white font-black text-[9px] uppercase tracking-widest rounded-xl hover:bg-brand-600 transition-all">Beli Template</button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Link */}
          <div className="mt-16 md:mt-20 flex justify-center">
            <Link href="/portfolio" className="inline-flex items-center gap-3 text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] hover:text-brand-600 transition-all group">
              Lihat Katalog Lengkap
              <span className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-black transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      {/* SECTION: CTA - HIGH-CONTRAST TECH CALL */}
      <section className="py-32 bg-white relative overflow-hidden border-t border-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Background Grid (Konsisten dengan Services & About) */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '80px 80px' }}>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-[10px] font-black uppercase tracking-[0.3em] mb-10" data-aos="fade-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600"></span>
            </span>
            Ayo Kolaborasi
          </div>

          <h2 className="text-5xl md:text-[7rem] font-[900] text-slate-900 tracking-tighter leading-[0.85] uppercase italic mb-12" data-aos="zoom-in">
            SIAP <br className="md:hidden" /> <span className="text-transparent" style={{ WebkitTextStroke: '2px #0f172a' }}>EKSEKUSI</span> <br /> IDE KAMU?
          </h2>

          <p className="text-slate-500 text-lg md:text-xl font-bold max-w-2xl mx-auto mb-16 leading-relaxed px-4" data-aos="fade-up" data-aos-delay="100">
            Wujudkan website, desain UI/UX, atau video cinematic impianmu bersama tim expert AETHER NUSANTARA.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6" data-aos="fade-up" data-aos-delay="200">
            <Link
              href="https://wa.me/6281238193238"
              className="group relative w-full md:w-auto px-12 py-6 bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-[11px] overflow-hidden rounded-none hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-500 text-center"
            >
              <div className="absolute inset-0 bg-brand-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                Diskusi di WhatsApp
              </span>
            </Link>

            <Link
              href="/portfolio"
              className="w-full md:w-auto px-12 py-6 border-2 border-slate-900 text-slate-900 font-black uppercase tracking-[0.2em] text-[11px] rounded-none hover:bg-slate-900 hover:text-white transition-all duration-500 text-center"
            >
              Lihat Katalog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
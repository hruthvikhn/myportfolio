'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Initial Navigation Fade
    gsap.from('.hero-bar-fade', {
      opacity: 0,
      y: -20,
      duration: 1.2,
      ease: 'power3.out',
    });

    // 2. Locked Scroll Center Zoom Outwards Engine
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: '+=100%', 
        scrub: 1,      
        pin: true,     
      },
    });

    tl.to('.zoom-center', {
      scale: 12,       
      opacity: 0,
      ease: 'power2.inOut',
    }, 0)
    .to('.fly-left', {
      x: '-150%',      
      opacity: 0,
      ease: 'power2.inOut',
    }, 0)
    .to('.fly-right', {
      x: '150%',       
      opacity: 0,
      ease: 'power2.inOut',
    }, 0)
    .to('.fade-bottom', {
      y: 100,
      opacity: 0,
      ease: 'power2.inOut',
    }, 0);

    // 3. Cinematic Reverse Fade Reveals for Content Sections
    const reverseFadeBlocks = gsap.utils.toArray<HTMLElement>('.reverse-fade-block');
    reverseFadeBlocks.forEach((block) => {
      gsap.fromTo(block, 
        { 
          opacity: 0, 
          scale: 1.01, 
          y: 30 
        },
        {
          opacity: 1,
          scale: 1,    
          y: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    // 4. Rolling Text Masks for Section Headers
    const sectionMasks = gsap.utils.toArray<HTMLElement>('.section-mask');
    sectionMasks.forEach((mask) => {
      const text = mask.querySelector('.mask-text');
      if (text) {
        gsap.from(text, {
          y: '140%',
          rotation: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: mask,
            start: 'top 85%',
          },
        });
      }
    });

  }, { scope: container });

  return (
    <main ref={container} className="relative w-full min-h-screen font-sans bg-[#0d0400] text-white selection:bg-[#ff8c00] selection:text-[#0d0400]">
      
      {/* --- FLOATING LIQUID AMBER ENVIRONMENT --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(204,82,0,0.75)_0%,rgba(204,82,0,0)_70%)] blur-[100px] animate-fluid-1 mix-blend-screen" />
        <div className="absolute top-[20%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle,rgba(255,166,0,0.45)_0%,rgba(255,166,0,0)_70%)] blur-[130px] animate-fluid-2 mix-blend-screen" />
        <div className="absolute bottom-[-30%] left-[10%] w-[90vw] h-[90vw] rounded-full bg-[radial-gradient(circle,rgba(102,26,0,0.85)_0%,rgba(102,26,0,0)_70%)] blur-[110px] animate-fluid-1 mix-blend-screen" />
        <div className="bg-grain absolute inset-0 mix-blend-overlay opacity-40"></div>
      </div>

      {/* --- CLEAN FLOATING CAPSULE NAVIGATION (No CGPA) --- */}
      <div className="hero-bar-fade fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl h-14 bg-white/95 backdrop-blur-md text-black z-50 flex justify-between items-center px-6 md:px-10 rounded-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/20 select-none">
        <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-neutral-900">
          Hruthvik H N
        </div>
        <nav className="flex gap-4 md:gap-8 text-[9px] md:text-xs font-bold tracking-[0.15em] uppercase text-neutral-600">
          <a href="#experience" className="hover:text-[#cc5200] transition-colors duration-200">experience</a>
          <a href="#projects" className="hover:text-[#cc5200] transition-colors duration-200">projects</a>
          <a href="#skills" className="hover:text-[#cc5200] transition-colors duration-200">skills</a>
          <a href="#achievements" className="hover:text-[#cc5200] transition-colors duration-200">achievements</a>
          <a href="#certifications" className="hover:text-[#cc5200] transition-colors duration-200">certifications</a>
        </nav>
        <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 hidden lg:block">
          class of 2027
        </div>
      </div>

      {/* --- SCROLLABLE CONTENT LAYER --- */}
      <div className="relative z-10 w-full">
        
        {/* ================= SECTION 1: HERO ZOOM (Capitalized Name) ================= */}
        <section className="hero-section h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1600px] mx-auto gap-8">
            <div className="fly-left w-full md:w-1/4 order-2 md:order-1 flex flex-col text-center md:text-left gap-1">
              <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/40">artificial</span>
              <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/40">intelligence &</span>
              <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/80">robotics engineering</span>
            </div>

            {/* Title Core - Safely handled overflow limits to avoid any clipping */}
            <div className="zoom-center w-full md:w-1/2 order-1 md:order-2 text-center py-4 shrink-0 overflow-visible will-change-transform">
              <h1 className="text-[5rem] md:text-[9rem] lg:text-[12rem] font-medium tracking-tighter leading-[0.8] text-white select-none">
                Hruthvik
              </h1>
            </div>

            <div className="fly-right w-full md:w-1/4 order-3 text-center md:text-right flex flex-col gap-1 items-center md:items-end">
              <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/40">dayananda sagar</span>
              <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/40">university</span>
              <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/40">bangalore, in</span>
            </div>
          </div>

          <div className="fade-bottom flex flex-col sm:flex-row justify-between items-start sm:items-end w-full max-w-[1600px] absolute bottom-12 px-6 md:px-12 left-1/2 -translate-x-1/2 gap-6">
            <p className="text-sm md:text-base font-light text-white/70 max-w-xl leading-relaxed">
              Pre-final year B.Tech student specializing in production-grade Artificial Intelligence frameworks, automated infrastructure architectures, and physical system kinematics.
            </p>
            <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 hidden sm:block">
              Scroll down to navigate
            </div>
          </div>
        </section>

        {/* --- MAIN PAGE CONTENT WRAPPER --- */}
        <div className="px-6 md:px-12 max-w-[1600px] mx-auto w-full flex flex-col">

          {/* ================= SECTION 2: EXPERIENCE (Capitalized Heading) ================= */}
          <section id="experience" className="min-h-screen py-40 flex flex-col md:flex-row gap-16 md:gap-32 border-b border-white/5 scroll-mt-20">
            <div className="md:w-1/3 md:sticky top-40 h-fit">
              <div className="section-mask overflow-hidden pb-2 pr-6">
                <h2 className="mask-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-none block w-full">
                  Experience.
                </h2>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <span className="h-[1px] w-12 bg-white/20"></span>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#ff8c00] font-semibold">Work History</p>
              </div>
            </div>

            <div className="md:w-2/3 flex flex-col gap-20">
              <div className="reverse-fade-block group border-t border-white/10 pt-10 transition-transform will-change-transform">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-4 gap-2">
                  <h3 className="text-2xl md:text-3xl font-light text-white group-hover:text-[#ff8c00] transition-colors duration-300">Balfour Beatty</h3>
                  <span className="text-xs font-mono text-white/40 bg-white/5 px-3 py-1 rounded-md border border-white/5">Nov 2025 — Feb 2026</span>
                </div>
                <p className="text-xs tracking-[0.15em] uppercase text-white/50 font-semibold mb-6">Computer Vision & Web Automation Intern</p>
                <ul className="space-y-4 text-white/70 font-light text-base leading-relaxed">
                  <li className="flex items-start gap-4">
                    <span className="text-[#ff8c00] mt-2.5 shrink-0 w-1 h-1 rounded-full bg-[#ff8c00]" />
                    <span>Engineered an advanced web automation pipeline using Python and Playwright architectures to parse and fetch micro-utility mappings across enterprise target servers.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-[#ff8c00] mt-2.5 shrink-0 w-1 h-1 rounded-full bg-[#ff8c00]" />
                    <span>Designed real-time image computer vision filters inside OpenCV to analyze multi-spectral satellite geometry data, applying red-line separation profiles to export structural asset maps into engineering DXF formats.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-[#ff8c00] mt-2.5 shrink-0 w-1 h-1 rounded-full bg-[#ff8c00]" />
                    <span>Deployed a production Flask orchestration framework, creating secure back-end interfaces to bridge automation infrastructure safely across non-technical internal teams.</span>
                  </li>
                </ul>
              </div>

              <div className="reverse-fade-block group border-t border-white/10 pt-10 transition-transform will-change-transform">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-4 gap-2">
                  <h3 className="text-2xl md:text-3xl font-light text-white group-hover:text-[#ff8c00] transition-colors duration-300">Elevate Labs</h3>
                  <span className="text-xs font-mono text-white/40 bg-white/5 px-3 py-1 rounded-md border border-white/5">Aug 2025 — Sep 2025</span>
                </div>
                <p className="text-xs tracking-[0.15em] uppercase text-white/50 font-semibold mb-6">AI & Machine Learning Intern (Remote)</p>
                <ul className="space-y-4 text-white/70 font-light text-base leading-relaxed">
                  <li className="flex items-start gap-4">
                    <span className="text-[#ff8c00] mt-2.5 shrink-0 w-1 h-1 rounded-full bg-[#ff8c00]" />
                    <span>Applied supervised and unsupervised pattern discovery models across clean training frameworks using Scikit-learn and Pandas libraries to perform feature scaling and architectural engineering blocks.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-[#ff8c00] mt-2.5 shrink-0 w-1 h-1 rounded-full bg-[#ff8c00]" />
                    <span>Maintained collaborative project version histories across modular workspace networks using structured Git protocols to align system parameters safely.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ================= SECTION 3: PROJECTS (Capitalized Heading) ================= */}
          <section id="projects" className="min-h-screen py-40 flex flex-col md:flex-row gap-16 md:gap-32 border-b border-white/5 scroll-mt-20">
            <div className="md:w-1/3 md:sticky top-40 h-fit">
              <div className="section-mask overflow-hidden pb-2 pr-6">
                <h2 className="mask-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-none block w-full">
                  Projects.
                </h2>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <span className="h-[1px] w-12 bg-white/20"></span>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#ff8c00] font-semibold">Selected Operations</p>
              </div>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="reverse-fade-block group p-8 border border-white/10 bg-black/30 backdrop-blur-md rounded-md flex flex-col justify-between hover:border-[#ff8c00]/30 hover:bg-neutral-950/40 transition-all duration-500 will-change-transform">
                <div>
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-xl font-medium tracking-tight group-hover:text-[#ff8c00] transition-colors duration-300">Colorectal Tissue Classifier</h3>
                    <span className="text-[9px] font-mono border border-white/20 rounded-full px-2.5 py-0.5 uppercase tracking-wider text-white/50 bg-white/5 shrink-0">Deep Learning</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#ff8c00] uppercase tracking-wider mb-4">TensorFlow / Custom CNN Architecture</p>
                  <p className="text-white/70 font-light text-sm leading-relaxed mb-6">
                    Designed and built an end-to-end custom Convolutional Neural Network (CNN) pipeline to classify histopathology images with medical-grade accuracy.
                  </p>
                </div>
                <p className="text-[11px] text-white/40 font-light border-t border-white/5 pt-4">
                  Normalized a target warehouse containing over 6,000 clean architectural graphics profiles, utilizing algorithmic data augmentation parameters.
                </p>
              </div>

              <div className="reverse-fade-block group p-8 border border-white/10 bg-black/30 backdrop-blur-md rounded-md flex flex-col justify-between hover:border-[#ff8c00]/30 hover:bg-neutral-950/40 transition-all duration-500 will-change-transform">
                <div>
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-xl font-medium tracking-tight group-hover:text-[#ff8c00] transition-colors duration-300">Atman Avatar Simulation</h3>
                    <span className="text-[9px] font-mono border border-white/20 rounded-full px-2.5 py-0.5 uppercase tracking-wider text-white/50 bg-white/5 shrink-0">Reinforcement Learning</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#ff8c00] uppercase tracking-wider mb-4">Python / Streamlit Vector Analytics</p>
                  <p className="text-white/70 font-light text-sm leading-relaxed mb-6">
                    Built an analytical simulation layout designed to map out system behavior profiles by guiding autonomous algorithmic agents across specific environment states.
                  </p>
                </div>
                <p className="text-[11px] text-white/40 font-light border-t border-white/5 pt-4">
                  Configured the backend computation matrix models directly inside clean Python environments alongside a dashboard interface.
                </p>
              </div>

              <div className="reverse-fade-block group p-8 border border-white/10 bg-black/30 backdrop-blur-md rounded-md flex flex-col justify-between hover:border-[#ff8c00]/30 hover:bg-neutral-950/40 transition-all duration-500 will-change-transform">
                <div>
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-xl font-medium tracking-tight group-hover:text-[#ff8c00] transition-colors duration-300">DSI Wingman Portal</h3>
                    <span className="text-[9px] font-mono border border-white/20 rounded-full px-2.5 py-0.5 uppercase tracking-wider text-white/50 bg-white/5 shrink-0">Full-Stack Production</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#ff8c00] uppercase tracking-wider mb-4">MERN Stack Architecture</p>
                  <p className="text-white/70 font-light text-sm leading-relaxed mb-6">
                    Architected, scaled, and managed an integrated university software database interface network, serving over 100 active ecosystem student nodes safely.
                  </p>
                </div>
                <p className="text-[11px] text-white/40 font-light border-t border-white/5 pt-4">
                  Built robust user encryption algorithms alongside rapid dynamic component rendering pipelines optimized for persistent database lookups.
                </p>
              </div>

              <div className="reverse-fade-block group p-8 border border-white/10 bg-black/30 backdrop-blur-md rounded-md flex flex-col justify-between hover:border-[#ff8c00]/30 hover:bg-neutral-950/40 transition-all duration-500 will-change-transform">
                <div>
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-xl font-medium tracking-tight group-hover:text-[#ff8c00] transition-colors duration-300">3-DOF Kinematic Model</h3>
                    <span className="text-[9px] font-mono border px-2.5 py-0.5 uppercase tracking-wider text-white/50 bg-white/5 shrink-0">Robotics Simulation</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#ff8c00] uppercase tracking-wider mb-4">MATLAB / Simscape Environment</p>
                  <p className="text-white/70 font-light text-sm leading-relaxed mb-6">
                    Simulated rigid body dynamic properties and physical hardware transformations across a 3-Degree-of-Freedom arm structure.
                  </p>
                </div>
                <p className="text-[11px] text-white/40 font-light border-t border-white/5 pt-4">
                  Computed inverse transformation paths using localized rigid calculation sequences to test vector consistency and track trajectories.
                </p>
              </div>

              <div className="reverse-fade-block group p-8 border border-white/10 bg-black/30 backdrop-blur-md rounded-md flex flex-col justify-between md:col-span-2 hover:border-[#ff8c00]/30 hover:bg-neutral-950/40 transition-all duration-500 will-change-transform">
                <div>
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <h3 className="text-xl font-medium tracking-tight group-hover:text-[#ff8c00] transition-colors duration-300">IoT Noise Level Radar</h3>
                    <span className="text-[9px] font-mono border border-white/20 rounded-full px-2.5 py-0.5 uppercase tracking-wider text-white/50 bg-white/5 shrink-0">Embedded IoT</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#ff8c00] uppercase tracking-wider mb-4">ThingSpeak Cloud Analytics</p>
                  <p className="text-white/70 font-light text-sm leading-relaxed mb-4">
                    Engineered an IoT-based environmental monitoring system that captures decibel data and uploads it to ThingSpeak cloud in real time.
                  </p>
                </div>
                <p className="text-[11px] text-white/40 font-light border-t border-white/5 pt-4">
                  Developed a MATLAB classification algorithm to categorize noise levels (Quiet, Moderate, Hazardous) and trigger dynamic alerts for immediate visualization.
                </p>
              </div>
            </div>
          </section>

          {/* ================= SECTION 4: SKILLS (Obsidian Cards Re-Styled) ================= */}
          <section id="skills" className="py-40 flex flex-col md:flex-row gap-16 md:gap-32 border-b border-white/5 scroll-mt-20">
            <div className="md:w-1/3 md:sticky top-40 h-fit">
              <div className="section-mask overflow-hidden pb-2 pr-6">
                <h2 className="mask-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-none block w-full">
                  Skills.
                </h2>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <span className="h-[1px] w-12 bg-white/20"></span>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#ff8c00] font-semibold">Technical Profile</p>
              </div>
            </div>

            <div className="md:w-2/3 flex flex-col gap-4 justify-center">
              <div className="reverse-fade-block flex flex-col gap-4 w-full select-none">
                
                {/* Refined font scaling and synchronized typography stack across lists */}
                <div className="bg-neutral-950/40 backdrop-blur-md p-8 rounded-xl border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-[#ff8c00]/40 transition-all duration-300">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/30 group-hover:text-[#ff8c00]/60 font-bold shrink-0">
                    Languages
                  </span>
                  <span className="text-base md:text-lg font-light tracking-wide text-white/80 sm:text-right">
                    Python, C++, SQL, JavaScript, HTML/CSS
                  </span>
                </div>

                <div className="bg-neutral-950/40 backdrop-blur-md p-8 rounded-xl border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-[#ff8c00]/40 transition-all duration-300">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/30 group-hover:text-[#ff8c00]/60 font-bold shrink-0">
                    Machine Learning
                  </span>
                  <span className="text-base md:text-lg font-light tracking-wide text-white/80 sm:text-right">
                    TensorFlow, PyTorch, Keras, Scikit-learn, XGBoost, OpenCV, YOLO, RapidMiner
                  </span>
                </div>

                <div className="bg-neutral-950/40 backdrop-blur-md p-8 rounded-xl border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-[#ff8c00]/40 transition-all duration-300">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/30 group-hover:text-[#ff8c00]/60 font-bold shrink-0">
                    Generative AI
                  </span>
                  <span className="text-base md:text-lg font-light tracking-wide text-white/80 sm:text-right">
                    LangChain, Retrieval-Augmented Generation (RAG), NLTK, LLM Development, Vector Databases, Agent Workflows
                  </span>
                </div>

                <div className="bg-neutral-950/40 backdrop-blur-md p-8 rounded-xl border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-[#ff8c00]/40 transition-all duration-300">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/30 group-hover:text-[#ff8c00]/60 font-bold shrink-0">
                    Web Architectures
                  </span>
                  <span className="text-base md:text-lg font-light tracking-wide text-white/80 sm:text-right">
                    React.js, Node.js, Express.js, MongoDB, REST API Development, Playwright Systems, Flask
                  </span>
                </div>

                <div className="bg-neutral-950/40 backdrop-blur-md p-8 rounded-xl border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-[#ff8c00]/40 transition-all duration-300">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/30 group-hover:text-[#ff8c00]/60 font-bold shrink-0">
                    Robotics Systems
                  </span>
                  <span className="text-base md:text-lg font-light tracking-wide text-white/80 sm:text-right">
                    ROS (Robot Operating System), Gazebo, MATLAB, Simulink, Simscape Multibody, ThingSpeak, Docker, Linux
                  </span>
                </div>

              </div>
            </div>
          </section>

          {/* ================= SECTION 5: ACHIEVEMENTS (Capitalized Heading) ================= */}
          <section id="achievements" className="py-40 flex flex-col md:flex-row gap-16 md:gap-32 border-b border-white/5 scroll-mt-20">
            <div className="md:w-1/3 md:sticky top-40 h-fit">
              <div className="section-mask overflow-hidden pb-2 pr-6">
                <h2 className="mask-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-none block w-full">
                  Achievements.
                </h2>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <span className="h-[1px] w-12 bg-white/20"></span>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#ff8c00] font-semibold">Honors & Competitions</p>
              </div>
            </div>

            <div className="md:w-2/3 flex flex-col gap-12 justify-center">
              <ul className="space-y-12 font-light text-white/70">
                <li className="reverse-fade-block border-l-2 border-[#ff8c00]/40 pl-6 hover:border-[#ff8c00] transition-colors duration-300 will-change-transform">
                  <p className="font-medium text-white text-xl md:text-2xl tracking-tight">National Finalist (Top 20) — PARSEC DevHack 6.0, IIT Dharwad</p>
                  <p className="text-sm text-white/40 mt-2 leading-relaxed max-w-3xl">
                    Selected from 120+ teams; developed and pitched a tech solution under a competitive 36-hour deadline.
                  </p>
                </li>
                <li className="reverse-fade-block border-l-2 border-[#ff8c00]/40 pl-6 hover:border-[#ff8c00] transition-colors duration-300 will-change-transform">
                  <p className="font-medium text-white text-xl md:text-2xl tracking-tight">Top 20 Finalist — BITHUNT 2025, IIT Dharwad</p>
                  <p className="text-sm text-white/40 mt-2 leading-relaxed max-w-3xl">
                    Cleared competitive DSA rounds and strategic real-time problem-solving challenges out of 90+ participating teams.
                  </p>
                </li>
                <li className="reverse-fade-block border-l-2 border-[#ff8c00]/40 pl-6 hover:border-[#ff8c00] transition-colors duration-300 will-change-transform">
                  <p className="font-medium text-white text-xl md:text-2xl tracking-tight">Finalist — EUREKATHON 2025, Dayananda Sagar University</p>
                  <p className="text-sm text-white/40 mt-2 leading-relaxed max-w-3xl">
                    Presented "AI Oratory Coach," an NLP-based public speaking tool, receiving expert mentorship from industry judges.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* ================= SECTION 6: CERTIFICATIONS (Capitalized Heading) ================= */}
          <section id="certifications" className="py-40 flex flex-col md:flex-row gap-16 md:gap-32 border-b border-white/5 scroll-mt-20">
            <div className="md:w-1/3 md:sticky top-40 h-fit">
              <div className="section-mask overflow-hidden pb-2 pr-6">
                <h2 className="mask-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-none block w-full">
                  Certifications.
                </h2>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <span className="h-[1px] w-12 bg-white/20"></span>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#ff8c00] font-semibold">Validated Credentials</p>
              </div>
            </div>

            <div className="md:w-2/3 flex flex-col justify-center">
              <div className="reverse-fade-block grid grid-cols-1 sm:grid-cols-2 gap-4 will-change-transform">
                {[
                  { title: 'AWS Cloud Certified', provider: 'Amazon Web Services' },
                  { title: 'Google GenAI Specialist', provider: 'Google Cloud' },
                  { title: 'Google LLM Architecture', provider: 'Google Cloud' },
                  { title: 'RapidMiner Certified Professional', provider: 'RapidMiner Enterprise' }
                ].map((cert) => (
                  <div key={cert.title} className="p-6 border border-white/10 bg-black/20 backdrop-blur-sm rounded-md hover:border-[#ff8c00]/40 hover:bg-neutral-950/40 transition-all duration-300 group">
                    <p className="font-medium text-white text-lg group-hover:text-[#ff8c00] transition-colors duration-300">{cert.title}</p>
                    <p className="text-xs text-white/40 font-mono mt-1 uppercase tracking-wider">{cert.provider}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= SECTION 7: EDITORIAL FOOTER RE-DESIGN ================= */}
          <footer className="py-32 mt-12 flex flex-col items-center text-center w-full">
            <div className="section-mask overflow-hidden pb-3">
               <h2 className="mask-text text-xl md:text-2xl font-light tracking-widest uppercase text-white/40 select-none">
                 Designed & Engineered By Hruthvik
               </h2>
            </div>
            
            <div className="reverse-fade-block flex flex-wrap justify-center gap-2 mt-4 text-[10px] font-mono text-white/30 max-w-xl will-change-transform">
              <span>B.Tech Artificial Intelligence & Robotics Engineering</span>
              <span>•</span>
              <span>Available for Global Roles</span>
            </div>
            
            <div className="reverse-fade-block border-t border-white/5 pt-12 mt-12 flex flex-col items-center gap-8 w-full will-change-transform pointer-events-auto">
              <a href="mailto:hruthvikhn7@gmail.com" className="text-2xl md:text-4xl font-light hover:text-[#ff8c00] transition-colors duration-300 tracking-tight text-white">
                hruthvikhn7@gmail.com
              </a>

              {/* Enhanced & Maximized SVG Vector Social Grid Matrix */}
              <div className="flex items-center gap-8 mt-2">
                {/* LinkedIn */}
                <a href="https://linkedin.com/in/hruthvikhn" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#ff8c00] transition-colors duration-300" aria-label="LinkedIn">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                
                {/* GitHub */}
                <a href="https://github.com/hruthvikhn" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#ff8c00] transition-colors duration-300" aria-label="GitHub">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 3.523 1.304 4.381.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a href="https://instagram.com/hruthvikhn" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#ff8c00] transition-colors duration-300" aria-label="Instagram">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.719.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.025-1.664 4.571-4.919 4.719-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.72-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.027 1.664-4.571 4.919-4.719 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </main>
  );
}
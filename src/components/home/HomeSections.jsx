import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import {
  ArrowRight, Sparkles, Zap, Target, Award,
  Code2, Cpu, Globe, Rocket, BookOpen, Swords,
  Terminal, Database, Layers, GitBranch,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   SECTION 1: ACHIEVEMENT MARQUEE
   A horizontal scrolling strip of key stats
   ═══════════════════════════════════════════ */

const achievements = [
  { emoji: '🏆', text: 'Meta Hacker Cup — Global Rank 141' },
  { emoji: '🎓', text: 'IIT JAM AIR 1317 — Top Percentile' },
  { emoji: '🏀', text: 'National Bronze — SGFI Basketball' },
  { emoji: '💻', text: '500+ CP Problems Crushed' },
  { emoji: '⚡', text: 'SIH 2025 College Representative' },
  { emoji: '🔬', text: 'P4-SpecTec @ KAIST — PR Merged' },
  { emoji: '👑', text: 'Overall Coordinator — Aether Club' },
  { emoji: '🚀', text: '10+ Projects Shipped & Live' },
];

export const AchievementMarquee = () => (
  <section className="py-6 overflow-hidden border-y border-[var(--border-default)]" style={{ background: 'var(--bg-secondary)' }}>
    <div className="relative">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...achievements, ...achievements].map((a, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-sm font-mono">
            <span className="text-lg">{a.emoji}</span>
            <span className="text-[var(--text-secondary)]">{a.text}</span>
            <span className="text-[var(--primary)] opacity-30">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════
   SECTION 2: ABOUT ME
   A clean, elegant split layout with the portfolio image
   ═══════════════════════════════════════════ */

export const AboutMeSection = () => (
  <section className="section-container relative overflow-hidden bg-[var(--bg-primary)] py-20">
    <div className="content-container relative z-10">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 max-w-6xl mx-auto">
        
        {/* Left: Image */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 w-full max-w-md mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-transparent opacity-20 mix-blend-overlay"></div>
            <img 
              src="https://res.cloudinary.com/du8isxcag/image/upload/v1779047603/portfolio_assets/portfolio.png" 
              alt="Aayush Sharma" 
              className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition-transform duration-700"
            />
            {/* Elegant border accent */}
            <div className="absolute inset-0 border-[1px] border-[var(--border-default)] rounded-2xl pointer-events-none"></div>
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-12 bg-[var(--text-primary)]" />
            <span className="text-[11px] font-mono text-[var(--text-primary)] tracking-[0.25em] uppercase font-semibold">About Me</span>
          </div>
          
          <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight text-[var(--text-primary)]">
            Designing across dimensions.
          </h2>
          
          <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
            I am an M.Sc AI/ML student at IIIT Lucknow, specializing in building intelligent, scalable systems. With a passion for competitive programming and open-source development, I don't just write code—I craft experiences.
          </p>
          
          <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
            Whether I'm debugging C++ internals, optimizing neural networks, or designing breathtaking web interfaces, my goal remains the same: <b className="text-[var(--text-primary)] font-semibold">pushing boundaries</b>.
          </p>

          <div className="pt-6 flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-3xl font-display font-bold text-[var(--primary)]">500+</span>
              <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-mono mt-1">Problems Solved</span>
            </div>
            <div className="w-[1px] h-12 bg-[var(--border-default)]"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-display font-bold text-[var(--secondary)]">Top 0.1%</span>
              <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-mono mt-1">Meta Hacker Cup</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════
   SECTION 3: SKILL CLOUD
   Floating skills around a central MC character
   ═══════════════════════════════════════════ */

const skillsData = [
  // ==========================================
  // LEFT SIDE: AI / ML & Data Science
  // ==========================================
  { name: 'Artificial Intelligence', top: '15%', left: '15%', size: 'lg' },
  { name: 'Machine Learning',        top: '35%', left: '10%', size: 'lg' },
  { name: 'Deep Learning',           top: '45%', left: '30%' },
  { name: 'Computer Vision',         top: '55%', left: '8%' },
  { name: 'PyTorch',                 top: '70%', left: '18%' },
  { name: 'TensorFlow',              top: '80%', left: '5%' },
  { name: 'Scikit-learn',            top: '85%', left: '32%' },
  { name: 'MLOps',                   top: '90%', left: '15%' },
  { name: 'Linear Algebra',          top: '6%',  left: '36%' },
  { name: 'Probability & Stat',      top: '25%', left: '35%' },
  { name: 'Python',                  top: '95%', left: '32%' },
  { name: 'Semantic Search',         top: '60%', left: '32%' },
  { name: 'RAG',                     top: '26%', left: '4%' },
  { name: 'Keras',                   top: '98%', left: '5%' },

  // ==========================================
  // RIGHT SIDE: Software Engineering & Core CS
  // ==========================================
  { name: 'DSA',                     top: '15%', left: '80%', size: 'lg' },
  { name: 'Comp. Programming',       top: '35%', left: '85%', size: 'lg' },
  { name: 'C++',                     top: '55%', left: '75%', size: 'lg' },
  { name: 'ReactJS',                 top: '65%', left: '92%' },
  { name: 'Node.js',                 top: '75%', left: '70%' },
  { name: 'Java',                    top: '8%',  left: '68%' },
  { name: 'DBMS',                    top: '88%', left: '85%' },
  { name: 'ExpressJS',               top: '85%', left: '65%' },
  { name: 'Flask',                   top: '98%', left: '82%' },
  { name: 'Prisma ORM',              top: '40%', left: '65%' },
  { name: 'PostgreSQL',              top: '95%', left: '92%' },
  { name: 'MySQL',                   top: '95%', left: '70%' },
  { name: 'Docker',                  top: '45%', left: '92%' },
  { name: 'Kubernetes',              top: '50%', left: '65%' },
  { name: 'CI/CD',                   top: '25%', left: '65%' },
  { name: 'Git',                     top: '25%', left: '95%' },
  { name: 'AWS',                     top: '10%', left: '92%' },
  { name: 'Operating System',        top: '75%', left: '92%' },
  { name: 'OOPs',                    top: '85%', left: '95%' },
];

export const SkillCloudSection = () => {
  const navigate = useNavigate();
  const [cppClicks, setCppClicks] = useState(0);

  const handleSkillClick = (skillName) => {
    if (skillName === 'C++') {
      const newClicks = cppClicks + 1;
      setCppClicks(newClicks);
      if (newClicks === 6) {
        sessionStorage.setItem('easterEggTriggered', 'true');
        navigate('/hidden');
        setCppClicks(0); // reset in case they come back
      }
    } else {
      setCppClicks(0); // reset if they click something else
    }
  };

  return (
    <section className="section-container relative overflow-hidden bg-[var(--bg-primary)] pt-12 pb-24">
      <div className="content-container relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-[var(--primary)]" />
            <span className="text-sm font-mono text-[var(--primary)] tracking-[0.25em] uppercase font-bold">Tech Stack</span>
            <Sparkles className="w-5 h-5 text-[var(--primary)]" />
          </div>
          <h2 className="font-heading text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--primary)] to-[var(--text-secondary)] drop-shadow-sm pb-2">
            My Skills
          </h2>
        </motion.div>

        {/* Desktop Layout - Big Center MC and Floating Individually */}
        <div className="relative w-full max-w-6xl h-[800px] md:h-[1000px] mx-auto hidden sm:block mt-10">
          
          {/* Main Character Centered completely */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
            whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-[50%] left-[50%] z-20 w-[70%] md:w-[50%] max-w-[650px] pointer-events-none flex justify-center"
          >
            {/* Massive Soft glow behind MC */}
            <div className="absolute inset-0 bg-gray-200 opacity-40 blur-[120px] rounded-full scale-110" />
            <img 
              src="https://res.cloudinary.com/du8isxcag/image/upload/v1779047601/portfolio_assets/MC.png" 
              alt="Main Character" 
              className="relative z-10 w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.25)]" 
              style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}
            />
          </motion.div>

          {/* Individually Floating Skills */}
          {skillsData.map((skill, index) => {
            const randomDelay = Math.random() * 2;
            const randomDuration = 4 + Math.random() * 3;
            const floatOffset = (Math.random() - 0.5) * 20; // 10px to -10px
            const isLg = skill.size === 'lg';
            
            return (
              <motion.div
                key={skill.name}
                className="absolute z-10"
                style={{ 
                  top: skill.top, 
                  left: skill.left,
                }}
                initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
                whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  onClick={() => handleSkillClick(skill.name)}
                  animate={{ y: [0, -18, 0], x: [0, floatOffset, 0] }}
                  transition={{ 
                    duration: randomDuration, 
                    repeat: Infinity, 
                    repeatType: 'reverse', 
                    ease: "easeInOut",
                    delay: randomDelay 
                  }}
                  className={`rounded-full border border-[var(--border-default)] bg-[var(--bg-secondary)] shadow-lg hover:shadow-xl hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 cursor-pointer flex items-center justify-center whitespace-nowrap
                    ${isLg ? 'px-8 py-4 md:px-10 md:py-5' : 'px-5 py-2.5 md:px-7 md:py-3.5'}
                  `}
                >
                  <span className={`font-mono font-bold tracking-wide text-[var(--text-primary)] ${isLg ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>
                    {skill.name}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Fallback Layout */}
        <div className="sm:hidden flex flex-col items-center gap-8 mt-10 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-[85%] relative"
          >
            <div className="absolute inset-0 bg-gray-200 opacity-40 blur-[60px] rounded-full" />
            <img 
              src="https://res.cloudinary.com/du8isxcag/image/upload/v1779047601/portfolio_assets/MC.png" 
              alt="MC" 
              className="relative z-10 w-full drop-shadow-2xl object-contain" 
              style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}
            />
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-3 w-full px-2">
            {skillsData.map((skill, i) => (
              <motion.div
                key={skill.name}
                onClick={() => handleSkillClick(skill.name)}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="px-4 py-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-secondary)] shadow-sm hover:border-[var(--primary)] hover:text-[var(--primary)] cursor-pointer"
              >
                <span className="font-mono text-sm font-bold text-[var(--text-primary)]">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   SECTION 4: PROJECT SHOWCASE
   Large, immersive project cards
   ═══════════════════════════════════════════ */

const showcaseItems = [
  {
    title: 'Aether Platform',
    subtitle: 'IIIT Lucknow Club',
    desc: 'Full-stack web platform with JWT auth, Razorpay integration, event management, and role-based access control.',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '#',
    image: 'https://res.cloudinary.com/du8isxcag/image/upload/v1779048016/portfolio_assets/card9_lossless.webp',
    align: 'left', // Character on the left
    scale: 1.45, 
    translateX: '-35px', // Push left to stop overlapping the text
    translateY: '-40px', // Shift upward
  },
  {
    title: 'P4-SpecTec',
    subtitle: 'KAIST Research',
    desc: 'Core contribution to WebAssembly spec tooling. Implemented non-local type inference in OCaml.',
    tags: ['OCaml', 'WebAssembly'],
    link: '#',
    image: 'https://res.cloudinary.com/du8isxcag/image/upload/v1779047552/portfolio_assets/card7.png', 
    align: 'right', // Character on the right
    scale: 1.25,
    translateX: '-45px', // Push left to attach arm to the card
  },
  {
    title: 'AimPeak',
    subtitle: 'CP Tracker',
    desc: 'Platform that aggregates CP profiles, tracks progress, and generates heatmaps across platforms.',
    tags: ['Next.js', 'Firebase', 'APIs'],
    link: '#',
    image: 'https://res.cloudinary.com/du8isxcag/image/upload/v1779048030/portfolio_assets/card5_lossless.webp', 
    align: 'left',
    scale: 1.35,
    translateX: '45px', // Push right to attach to the card
  },
  {
    title: 'Project 4',
    subtitle: 'Coming Soon',
    desc: 'An upcoming professional project. Currently in development with cutting-edge tech.',
    tags: ['React', 'Tailwind', 'Node.js'],
    link: '#',
    image: 'https://res.cloudinary.com/du8isxcag/image/upload/v1779047554/portfolio_assets/card8.png', 
    align: 'right', // Character on the right
    scale: 1.35,
    translateX: '-45px', // Push left to attach to the card
  },
];

export const ProjectShowcase = () => {
  return (
    <section className="section-container relative overflow-hidden bg-[var(--bg-primary)] py-20">
      <div className="content-container relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center flex flex-col items-center relative"
        >
          <div className="relative">
            <h2 
              className="relative z-10 font-heading text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--primary)] to-[var(--text-secondary)] drop-shadow-sm pb-2 mt-4"
            >
              Things I've Built
            </h2>
          </div>
        </motion.div>

        {/* Grid layout for multiple compact cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 justify-items-center gap-10 md:gap-x-4 md:gap-y-64 max-w-[1400px] mx-auto px-2">
          {showcaseItems.map((project, idx) => {
            const isLeft = project.align === 'left';
            
            return (
              <div 
                key={project.title} 
                className="flex flex-row items-center justify-center relative"
              >
                
                {isLeft && (
                  <motion.div 
                    initial={{ opacity: 0, x: -100, rotate: -5 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ duration: 1.4, delay: idx * 0.3, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative z-20 pointer-events-none" 
                    style={{ marginRight: '-30px' }}
                  >
                    <img 
                      src={project.image} 
                      alt={`${project.title} character`} 
                      className="h-[280px] md:h-[360px] w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-transform duration-500"
                      style={{ transform: `scale(${project.scale}) translateX(${project.translateX}) translateY(${project.translateY || '0px'})` }}
                      onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                  </motion.div>
                )}

                <motion.div 
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.2, delay: (idx * 0.3) + 0.3, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="w-[260px] md:w-[320px] min-h-[260px] md:min-h-[340px] bg-[var(--bg-secondary)] border border-[var(--border-default)] p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)] hover:border-[var(--primary)] transition-all duration-500 group relative overflow-hidden flex flex-col justify-center z-10"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <p className="text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase text-[var(--primary)] mb-2">
                      {project.subtitle}
                    </p>
                    <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-[var(--text-primary)] mb-3">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed mb-5 line-clamp-4">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-[var(--bg-primary)] border border-[var(--border-default)] text-[var(--text-primary)] text-[9px] md:text-[10px] font-mono font-bold rounded shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a 
                      href={project.link}
                      className="inline-flex items-center gap-1 text-[var(--primary)] text-xs font-bold hover:text-[var(--secondary)] transition-colors group/link mt-auto"
                    >
                      VIEW PROJECT <ArrowRight size={14} className="group-hover/link:translate-x-1.5 transition-transform" />
                    </a>
                  </div>
                </motion.div>

                {!isLeft && (
                  <motion.div 
                    initial={{ opacity: 0, x: 100, rotate: 5 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ duration: 1.4, delay: idx * 0.3, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative z-20 pointer-events-none" 
                    style={{ marginLeft: '-30px' }}
                  >
                    <img 
                      src={project.image} 
                      alt={`${project.title} character`} 
                      className="h-[280px] md:h-[360px] w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-transform duration-500"
                      style={{ transform: `scale(${project.scale}) translateX(${project.translateX}) translateY(${project.translateY || '0px'})` }}
                      onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                  </motion.div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   SECTION 5: CTA — CONNECT
   Immersive call to action with gradient border
   ═══════════════════════════════════════════ */

export const ConnectCTA = () => (
  <section className="section-container">
    <div className="content-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden"
      >
        {/* Animated gradient border */}
        <div
          className="absolute inset-0 rounded-3xl p-[1px]"
          style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary), var(--romance-pink), var(--primary))',
            backgroundSize: '300% 300%',
            animation: 'gradient-shift 6s ease infinite',
          }}
        >
          <div className="w-full h-full rounded-3xl bg-[var(--bg-secondary)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
          {/* Ambient blobs */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-[var(--primary)] opacity-[0.04] blur-[80px] rounded-full" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 bg-[var(--romance-pink)] opacity-[0.04] blur-[80px] rounded-full" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 mb-6">
              <Sparkles size={12} className="text-[var(--primary)]" />
              <span className="text-[10px] font-mono text-[var(--primary)] tracking-wider uppercase">Let's Build Something</span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--romance-pink)] bg-clip-text text-transparent">
                Want to Connect?
              </span>
            </h2>
            <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-md mx-auto mb-10">
              Drop a message on the wall, check out my journal, or reach out directly. I'm always up for a conversation.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Link
                to="/wall"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:shadow-[var(--glow-purple)] transition-all duration-300 group"
              >
                Leave a Whisper
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/blog"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--primary)]/30 hover:text-[var(--primary)] transition-all duration-300 group"
              >
                Read My Journal
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

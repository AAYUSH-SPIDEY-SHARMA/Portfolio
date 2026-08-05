import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cld, cldSrcSet, ASSETS } from '../../lib/images';

/* ═══════════════════════════════════════════
   SECTION 1: ABOUT ME
   ═══════════════════════════════════════════ */

export const AboutMeSection = () => (
  <section className="section-container relative overflow-hidden bg-[var(--bg-primary)] py-20">
    <div className="content-container relative z-10">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full max-w-md mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
            <img
              src={cld(ASSETS.portrait, { width: 720 })}
              srcSet={cldSrcSet(ASSETS.portrait, [400, 560, 720, 960])}
              sizes="(max-width: 768px) 90vw, 420px"
              alt="Portrait of Aayush Sharma"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 border border-[var(--border-default)] rounded-2xl pointer-events-none" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 space-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-[var(--text-primary)]" />
            <span className="text-[11px] font-mono text-[var(--text-primary)] tracking-[0.25em] uppercase font-semibold">
              About Me
            </span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight text-[var(--text-primary)]">
            Designing across dimensions.
          </h2>

          <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
            I am an M.Sc AI/ML student at IIIT Lucknow, specializing in building intelligent,
            scalable systems. With a passion for competitive programming and open-source
            development, I don’t just write code—I craft experiences.
          </p>

          <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
            Whether I’m debugging C++ internals, optimizing neural networks, or designing
            breathtaking web interfaces, my goal remains the same:{' '}
            <b className="text-[var(--text-primary)] font-semibold">pushing boundaries</b>.
          </p>

          <dl className="pt-6 flex items-center gap-8">
            <div className="flex flex-col">
              <dd className="text-3xl font-display font-bold text-[var(--primary)]">500+</dd>
              <dt className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-mono mt-1">
                Problems Solved
              </dt>
            </div>
            <div className="w-px h-12 bg-[var(--border-default)]" />
            <div className="flex flex-col">
              <dd className="text-3xl font-display font-bold text-[var(--secondary)]">Top 0.1%</dd>
              <dt className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-mono mt-1">
                Meta Hacker Cup
              </dt>
            </div>
          </dl>
        </motion.div>

      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════
   SECTION 2: SKILL CLOUD
   Skills orbit a central character on desktop; a plain wrapped list on mobile.
   ═══════════════════════════════════════════ */

const skillsData = [
  // Left cluster — AI / ML & data science
  { name: 'Artificial Intelligence', top: '15%', left: '15%', size: 'lg' },
  { name: 'Machine Learning', top: '35%', left: '10%', size: 'lg' },
  { name: 'Deep Learning', top: '45%', left: '30%' },
  { name: 'Computer Vision', top: '55%', left: '8%' },
  { name: 'PyTorch', top: '70%', left: '18%' },
  { name: 'TensorFlow', top: '80%', left: '5%' },
  { name: 'Scikit-learn', top: '85%', left: '32%' },
  { name: 'MLOps', top: '90%', left: '15%' },
  { name: 'Linear Algebra', top: '6%', left: '36%' },
  { name: 'Probability & Stat', top: '25%', left: '35%' },
  { name: 'Python', top: '95%', left: '32%' },
  { name: 'Semantic Search', top: '60%', left: '32%' },
  { name: 'RAG', top: '26%', left: '4%' },
  { name: 'Keras', top: '98%', left: '5%' },

  // Right cluster — software engineering & core CS
  { name: 'DSA', top: '15%', left: '80%', size: 'lg' },
  { name: 'Comp. Programming', top: '35%', left: '85%', size: 'lg' },
  { name: 'C++', top: '55%', left: '75%', size: 'lg' },
  { name: 'ReactJS', top: '65%', left: '92%' },
  { name: 'Node.js', top: '75%', left: '70%' },
  { name: 'Java', top: '8%', left: '68%' },
  { name: 'DBMS', top: '88%', left: '85%' },
  { name: 'ExpressJS', top: '85%', left: '65%' },
  { name: 'Flask', top: '98%', left: '82%' },
  { name: 'Prisma ORM', top: '40%', left: '65%' },
  { name: 'PostgreSQL', top: '95%', left: '92%' },
  { name: 'MySQL', top: '95%', left: '70%' },
  { name: 'Docker', top: '45%', left: '92%' },
  { name: 'Kubernetes', top: '50%', left: '65%' },
  { name: 'CI/CD', top: '25%', left: '65%' },
  { name: 'Git', top: '25%', left: '95%' },
  { name: 'AWS', top: '10%', left: '92%' },
  { name: 'Operating System', top: '75%', left: '92%' },
  { name: 'OOPs', top: '85%', left: '95%' },
];

/** Deterministic pseudo-random in [0,1) so float timings are stable across renders. */
const seeded = (i, salt) => {
  const x = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const CPP_CLICKS_TO_UNLOCK = 6;

export const SkillCloudSection = ({ variant = 'default' }) => {
  const navigate = useNavigate();
  const [cppClicks, setCppClicks] = useState(0);
  const interactive = variant !== 'hidden';

  const handleSkillClick = (skillName) => {
    if (!interactive) return;
    if (skillName !== 'C++') {
      setCppClicks(0);
      return;
    }
    const next = cppClicks + 1;
    if (next >= CPP_CLICKS_TO_UNLOCK) {
      sessionStorage.setItem('easterEggTriggered', 'true');
      setCppClicks(0);
      navigate('/hidden');
      return;
    }
    setCppClicks(next);
  };

  const pillBase =
    'rounded-full border border-[var(--border-default)] bg-[var(--bg-secondary)] shadow-lg transition-all duration-300 flex items-center justify-center whitespace-nowrap hover:shadow-xl hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white';

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
            <Sparkles className="w-5 h-5 text-[var(--primary)]" aria-hidden="true" />
            <span className="text-sm font-mono text-[var(--primary)] tracking-[0.25em] uppercase font-bold">
              Tech Stack
            </span>
            <Sparkles className="w-5 h-5 text-[var(--primary)]" aria-hidden="true" />
          </div>
          <h2 className="font-heading text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--primary)] to-[var(--text-secondary)] pb-2">
            My Skills
          </h2>
        </motion.div>

        {/* Desktop — orbiting layout */}
        <div className="relative w-full max-w-6xl h-[800px] md:h-[1000px] mx-auto hidden sm:block mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
            whileInView={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 z-20 w-[70%] md:w-[50%] max-w-[650px] pointer-events-none flex justify-center"
          >
            <div className="absolute inset-0 bg-gray-200 opacity-40 blur-[120px] rounded-full scale-110" />
            <img
              src={cld(ASSETS.mainCharacter, { width: 900 })}
              srcSet={cldSrcSet(ASSETS.mainCharacter, [480, 650, 900, 1300])}
              sizes="(max-width: 768px) 70vw, 650px"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="relative z-10 w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
              }}
            />
          </motion.div>

          <ul>
            {skillsData.map((skill, index) => {
              const isLg = skill.size === 'lg';
              const Pill = interactive ? 'button' : 'span';

              return (
                <motion.li
                  key={skill.name}
                  className="absolute z-10 list-none"
                  style={{ top: skill.top, left: skill.left }}
                  initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
                  whileInView={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04, duration: 0.6, ease: 'easeOut' }}
                >
                  <motion.div
                    animate={{
                      y: [0, -18, 0],
                      x: [0, (seeded(index, 1) - 0.5) * 20, 0],
                    }}
                    transition={{
                      duration: 4 + seeded(index, 2) * 3,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                      delay: seeded(index, 3) * 2,
                    }}
                  >
                    <Pill
                      {...(interactive
                        ? { type: 'button', onClick: () => handleSkillClick(skill.name) }
                        : {})}
                      className={`${pillBase} ${interactive ? 'cursor-pointer' : 'cursor-default'} ${
                        isLg ? 'px-8 py-4 md:px-10 md:py-5' : 'px-5 py-2.5 md:px-7 md:py-3.5'
                      }`}
                    >
                      <span
                        className={`font-mono font-bold tracking-wide text-[var(--text-primary)] ${
                          isLg ? 'text-base md:text-lg' : 'text-sm md:text-base'
                        }`}
                      >
                        {skill.name}
                      </span>
                    </Pill>
                  </motion.div>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Mobile — wrapped list */}
        <div className="sm:hidden flex flex-col items-center gap-8 mt-10 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-[85%] relative"
          >
            <div className="absolute inset-0 bg-gray-200 opacity-40 blur-[60px] rounded-full" />
            <img
              src={cld(ASSETS.mainCharacter, { width: 560 })}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="relative z-10 w-full drop-shadow-2xl object-contain"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
              }}
            />
          </motion.div>

          <ul className="flex flex-wrap justify-center gap-3 w-full px-2">
            {skillsData.map((skill, i) => {
              const Pill = interactive ? 'button' : 'span';
              return (
                <motion.li
                  key={skill.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.03, 0.5) }}
                >
                  <Pill
                    {...(interactive
                      ? { type: 'button', onClick: () => handleSkillClick(skill.name) }
                      : {})}
                    className="px-4 py-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-secondary)] shadow-sm hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  >
                    <span className="font-mono text-sm font-bold text-[var(--text-primary)]">
                      {skill.name}
                    </span>
                  </Pill>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   SECTION 3: PROJECT SHOWCASE
   ═══════════════════════════════════════════ */

const showcaseItems = [
  {
    title: 'Aether',
    subtitle: 'The Data Science and AI/ML Club of IIIT Lucknow',
    desc: 'Full-stack web platform with JWT auth, Razorpay integration, event management, and role-based access control.',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: 'https://aether-frontend.sharmaaayush598.workers.dev',
    image: ASSETS.card9,
    align: 'left',
    scale: 1.45,
    translateX: '-35px',
    translateY: '-40px',
  },
  {
    title: 'AimPeak',
    subtitle: 'An AI powered test platform for JEE/NEET students',
    desc: 'Architected a scalable full-stack platform for JEE/NEET prep with adaptive testing and real-time analytics.',
    tags: ['Next.js', 'Node.js' , 'PostgreSQL'],
    link: '#',
    image: ASSETS.card7,
    align: 'right',
    scale: 1.25,
    // Right-aligned characters sit after the card, so a negative offset drags
    // them back across the copy. Positive moves them clear.
    translateX: '25px',
  },
  {
    title: 'DOTCODE',
    subtitle: 'All in One website for cs students',
    desc: 'platform in which you can find all the hackathons happening in different platform , practice dsa , cp contest , find job opprtunites , meet new people.',
    tags: ['Next.js', 'Firebase', 'APIs'],
    link: '#',
    image: ASSETS.card5,
    align: 'left',
    scale: 1.35,
    // +45px overlapped the card, -30px overshot the other way.
    translateX: '-12px',
  },
  {
    title: 'HRMS',
    subtitle: 'HR Management system',
    desc: 'A human resource management system — employee records, attendance, and admin workflows in a single dashboard',
    tags: ['React', 'Node.js', 'JavaScript'],
    link: 'https://hrms-beryl-delta.vercel.app/signin.html',
    image: ASSETS.card8,
    hiddenImage: ASSETS.card6,
    align: 'right',
    scale: 1.35,
    translateX: '25px',
  },
];

const ProjectCharacter = ({ project, image, fromLeft, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: fromLeft ? -100 : 100, rotate: fromLeft ? -5 : 5 }}
    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true, amount: 0.3 }}
    className="relative z-20 pointer-events-none"
    style={fromLeft ? { marginRight: '-30px' } : { marginLeft: '-30px' }}
  >
    <img
      src={cld(image, { width: 720 })}
      srcSet={cldSrcSet(image, [360, 540, 720])}
      sizes="360px"
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className="h-[280px] md:h-[360px] w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-transform duration-500"
      style={{
        transform: `scale(${project.scale}) translateX(${project.translateX}) translateY(${project.translateY || '0px'})`,
      }}
      onError={(e) => { e.currentTarget.style.display = 'none'; }}
    />
  </motion.div>
);

export const ProjectShowcase = ({ variant = 'default' }) => {
  const isHidden = variant === 'hidden';

  return (
    <section className="section-container relative overflow-hidden bg-[var(--bg-primary)] py-20">
      <div className="content-container relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-center flex flex-col items-center relative ${isHidden ? 'mb-28 -mt-8' : 'mb-16'}`}
        >
          <div className="relative">
            {isHidden && (
              <motion.img
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                src={cld(ASSETS.card6, { width: 640 })}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="relative w-56 md:w-[320px] z-20 pointer-events-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] -mb-[95px] md:-mb-[135px] translate-x-[10px] md:translate-x-[15px]"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            )}

            <h2
              className={`relative z-10 font-heading text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--primary)] to-[var(--text-secondary)] pb-2 mt-4 ${
                isHidden ? 'translate-x-[12px] md:translate-x-[16px]' : ''
              }`}
            >
              {isHidden ? (
                <>Things<span className="inline-block w-6 md:w-8" />I’ve Built</>
              ) : (
                "Things I’ve Built"
              )}
            </h2>

            {/* Hidden variant: re-draws just the "i" above the character so the
                dot reads in front of it. */}
            {isHidden && (
              <h2
                aria-hidden="true"
                className="absolute inset-0 z-30 font-heading text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--primary)] to-[var(--text-secondary)] pb-2 mt-4 translate-x-[12px] md:translate-x-[16px] pointer-events-none select-none"
              >
                <span className="invisible">Th</span>i
                <span className="invisible">ngs<span className="inline-block w-6 md:w-8" />I’ve Built</span>
              </h2>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 justify-items-center gap-10 md:gap-x-4 md:gap-y-64 max-w-[1400px] mx-auto px-2">
          {showcaseItems.map((project, idx) => {
            const isLeft = project.align === 'left';
            const image = isHidden && project.hiddenImage ? project.hiddenImage : project.image;

            /*
              Stagger by column, not by absolute index. The grid is two-up, so
              cards 3 and 4 scroll into view as their own row — keying off idx
              made them sit there for the best part of a second first.
            */
            const stagger = (idx % 2) * 0.1;

            return (
              <div key={project.title} className="flex flex-row items-center justify-center relative">
                {isLeft && (
                  <ProjectCharacter project={project} image={image} fromLeft delay={stagger} />
                )}

                <motion.article
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.55, delay: stagger + 0.08, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="w-[260px] md:w-[320px] min-h-[260px] md:min-h-[340px] bg-[var(--bg-secondary)] border border-[var(--border-default)] p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.18)] hover:border-[var(--primary)] transition-all duration-500 group relative overflow-hidden flex flex-col justify-center z-10"
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

                    <ul className="flex flex-wrap gap-1.5 md:gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="px-2 py-1 bg-[var(--bg-primary)] border border-[var(--border-default)] text-[var(--text-primary)] text-[9px] md:text-[10px] font-mono font-bold rounded shadow-sm"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    {/* A '#' href looked like a working link and went nowhere.
                        Only ship a link when there is something to link to. */}
                    {project.link && project.link !== '#' ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[var(--primary)] text-xs font-bold hover:text-[var(--secondary)] transition-colors group/link mt-auto"
                      >
                        LIVE LINK
                        <ArrowRight size={14} className="group-hover/link:translate-x-1.5 transition-transform" aria-hidden="true" />
                        <span className="sr-only">: {project.title} (opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[var(--text-muted)] text-xs font-bold mt-auto">
                        COMING SOON
                      </span>
                    )}
                  </div>
                </motion.article>

                {!isLeft && (
                  <ProjectCharacter project={project} image={image} fromLeft={false} delay={stagger} />
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
   SECTION 4: CONNECT CTA
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
        <div
          className="absolute inset-0 rounded-3xl p-px"
          style={{
            background:
              'linear-gradient(135deg, var(--primary), var(--secondary), var(--romance-pink), var(--primary))',
            backgroundSize: '300% 300%',
            animation: 'gradient-shift 6s ease infinite',
          }}
        >
          <div className="w-full h-full rounded-3xl bg-[var(--bg-secondary)]" />
        </div>

        <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-[var(--primary)] opacity-[0.04] blur-[80px] rounded-full" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 bg-[var(--romance-pink)] opacity-[0.04] blur-[80px] rounded-full" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 mb-6">
              <Sparkles size={12} className="text-[var(--primary)]" aria-hidden="true" />
              <span className="text-[10px] font-mono text-[var(--primary)] tracking-wider uppercase">
                Let’s Build Something
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--romance-pink)] bg-clip-text text-transparent">
                Want to Connect?
              </span>
            </h2>
            <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-md mx-auto mb-10">
              Drop a message on the wall, check out my journal, or reach out directly.
              I’m always up for a conversation.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Link
                to="/wall"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:shadow-[var(--glow-purple)] transition-all duration-300 group"
              >
                Leave a Whisper
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link
                to="/blog"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--primary)]/30 hover:text-[var(--primary)] transition-all duration-300 group"
              >
                Read My Journal
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

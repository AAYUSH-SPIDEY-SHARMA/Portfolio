import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Rocket, Trophy, Zap, Code2, Globe, BookOpen } from 'lucide-react';

const cards = [
  {
    title: 'Aether Platform',
    desc: 'Full-stack IIITL club platform with JWT auth & Razorpay',
    link: '/projects',
    icon: <Rocket size={18} />,
    span: 'col-span-2 row-span-1',
    gradient: 'from-[var(--primary)] to-[var(--secondary)]',
    tag: 'Featured Project',
  },
  {
    title: 'Meta Hacker Cup',
    desc: 'Global Rank 141 — Top 0.1%',
    link: '/achievements',
    icon: <Trophy size={18} />,
    span: 'col-span-1 row-span-1',
    gradient: 'from-[var(--accent-gold)] to-[var(--gaming-orange)]',
    tag: 'Achievement',
  },
  {
    title: 'SIH 2025',
    desc: 'College Representative at Smart India Hackathon',
    link: '/hackathons',
    icon: <Zap size={18} />,
    span: 'col-span-1 row-span-1',
    gradient: 'from-[var(--accent-matrix)] to-[var(--secondary)]',
    tag: 'Hackathon',
  },
  {
    title: 'P4-SpecTec',
    desc: 'Core contribution to KAIST research project — PR #106',
    link: '/open-source',
    icon: <Code2 size={18} />,
    span: 'col-span-1 row-span-1',
    gradient: 'from-[var(--accent-matrix)] to-emerald-500',
    tag: 'Open Source',
  },
  {
    title: 'IIT JAM AIR 1317',
    desc: 'National exam — one of India\'s most competitive',
    link: '/achievements',
    icon: <Globe size={18} />,
    span: 'col-span-1 row-span-1',
    gradient: 'from-[var(--accent-coral)] to-[var(--romance-pink)]',
    tag: 'Academic',
  },
  {
    title: 'The Journey',
    desc: 'From Sangam University to IIIT Lucknow — every chapter matters',
    link: '/journey',
    icon: <BookOpen size={18} />,
    span: 'col-span-2 row-span-1',
    gradient: 'from-[var(--journey-mid)] to-[var(--primary)]',
    tag: 'Story',
  },
];

const FeaturedBento = () => {
  return (
    <section className="section-container relative">
      <div className="content-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono text-[var(--accent-coral)] tracking-widest uppercase">// Highlights</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">
            <span className="bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-gold)] bg-clip-text text-transparent">
              Featured
            </span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`${card.span} group`}
            >
              <Link
                to={card.link}
                className="block h-full p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--primary)]/20 transition-all duration-300 card-spotlight relative overflow-hidden"
              >
                {/* Gradient accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

                {/* Tag */}
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                  {card.tag}
                </span>

                <div className="flex items-start gap-3 mt-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white flex-shrink-0`}>
                    {card.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-[var(--text-accent)] group-hover:text-[var(--primary)] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-end mt-4">
                  <span className="text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all">
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBento;

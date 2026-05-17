import { motion } from 'framer-motion';

const stats = [
  { label: 'Level', value: '23', color: 'var(--primary)' },
  { label: 'Class', value: 'Full-Stack Sorcerer', color: 'var(--secondary)' },
];

const attributes = [
  { name: 'Frontend', value: 85, max: 100, color: '#6C5CE7' },
  { name: 'Backend', value: 78, max: 100, color: '#00D2FF' },
  { name: 'AI / ML', value: 65, max: 100, color: '#FF6B6B' },
  { name: 'CP / DSA', value: 80, max: 100, color: '#FECA57' },
  { name: 'DevOps', value: 55, max: 100, color: '#00FF41' },
  { name: 'Open Source', value: 70, max: 100, color: '#FF69B4' },
];

const titles = [
  '🕸️ Spider-Verse Developer',
  '🏆 Hackathon Warrior',
  '⚔️ Open Source Knight',
  '🎮 Gaming Champion',
  '🏀 National Athlete',
  '🎯 Competitive Programmer',
];

const BarStat = ({ name, value, max, color, delay }) => (
  <div className="mb-3">
    <div className="flex justify-between items-center mb-1">
      <span className="text-xs font-mono text-[var(--text-secondary)]">{name}</span>
      <span className="text-xs font-mono" style={{ color }}>{value}/{max}</span>
    </div>
    <div className="h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        initial={{ width: 0 }}
        whileInView={{ width: `${(value / max) * 100}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: delay * 0.15, ease: 'easeOut' }}
      />
    </div>
  </div>
);

const PlayerStats = () => {
  return (
    <section className="section-container bg-dot-grid relative overflow-hidden">
      <div className="content-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono text-[var(--primary)] tracking-widest uppercase">// Player Profile</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">
            <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
              Character Stats
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Left — Character Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[var(--primary)]/20 bg-[var(--bg-secondary)] p-6 glow-border-purple">
              {/* Top badge */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent-coral)]" />

              {/* Avatar placeholder */}
              <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center mb-4 shadow-[var(--glow-purple)]">
                <span className="text-white font-display text-3xl font-bold">AS</span>
              </div>

              <h3 className="font-display text-xl font-bold text-center text-[var(--text-accent)] mb-1">
                AAYUSH SHARMA
              </h3>
              <p className="text-xs text-center text-[var(--primary)] font-mono mb-3">
                M.Sc AI/ML · IIIT Lucknow
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-center p-2 rounded-lg bg-[var(--bg-elevated)]">
                  <div className="text-lg font-bold font-display text-[var(--accent-gold)]">23</div>
                  <div className="text-[10px] text-[var(--text-muted)] uppercase">Level</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-[var(--bg-elevated)]">
                  <div className="text-lg font-bold font-display text-[var(--accent-coral)]">500+</div>
                  <div className="text-[10px] text-[var(--text-muted)] uppercase">Problems</div>
                </div>
              </div>

              {/* XP Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-[10px] text-[var(--text-muted)] mb-1">
                  <span>EXP</span>
                  <span>7,250 / 10,000</span>
                </div>
                <div className="h-3 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: '72.5%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-center gap-1.5 mt-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400">Active · Building</span>
              </div>
            </div>
          </motion.div>

          {/* Right — Stats Bars + Titles */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Attribute Bars */}
            <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-default)] p-6">
              <h3 className="font-heading font-bold text-sm text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                Skill Attributes
              </h3>
              {attributes.map((attr, i) => (
                <BarStat key={attr.name} {...attr} delay={i} />
              ))}
            </div>

            {/* Titles / Roles */}
            <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-default)] p-6">
              <h3 className="font-heading font-bold text-sm text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)]" />
                Active Titles
              </h3>
              <div className="flex flex-wrap gap-2">
                {titles.map((title, i) => (
                  <motion.span
                    key={title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--primary)]/20 hover:text-[var(--primary)] transition-all cursor-default"
                  >
                    {title}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlayerStats;

import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '../../data/skills';
import { useState, useMemo } from 'react';

/* ═══ NODE CONSTELLATION ═══ */
const generateNodePositions = (skills, centerX, centerY, radius) => {
  return skills.map((skill, i) => {
    const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
    const r = radius + (i % 2 === 0 ? 0 : radius * 0.25);
    return {
      ...skill,
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    };
  });
};

const SkillNode = ({ skill, index, isActive, onClick }) => {
  const size = skill.level > 75 ? 56 : skill.level > 50 ? 48 : 40;
  const glowIntensity = skill.level / 100;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 300, damping: 20 }}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      {/* Glow ring */}
      <motion.circle
        cx={skill.x} cy={skill.y} r={size / 2 + 6}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={isActive ? 2 : 0.5}
        opacity={isActive ? 0.6 : glowIntensity * 0.2}
        animate={isActive ? { r: [size / 2 + 6, size / 2 + 10, size / 2 + 6] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Main circle */}
      <motion.circle
        cx={skill.x} cy={skill.y} r={size / 2}
        fill={isActive ? 'var(--primary)' : 'var(--bg-elevated)'}
        stroke={isActive ? 'var(--secondary)' : 'var(--border-default)'}
        strokeWidth={1.5}
        whileHover={{ scale: 1.15 }}
      />

      {/* Emoji */}
      <text
        x={skill.x} y={skill.y + 1}
        textAnchor="middle" dominantBaseline="central"
        fontSize={size > 48 ? 18 : 14}
        style={{ pointerEvents: 'none' }}
      >
        {skill.icon}
      </text>
    </motion.g>
  );
};

const ConnectionLine = ({ from, to, delay }) => (
  <motion.line
    x1={from.x} y1={from.y}
    x2={to.x} y2={to.y}
    stroke="var(--primary)"
    strokeWidth={0.5}
    strokeOpacity={0.12}
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ delay: delay * 0.02, duration: 0.5 }}
  />
);

/* ═══ SKILL TOOLTIP ═══ */
const SkillTooltip = ({ skill }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 5, scale: 0.98 }}
    className="p-4 rounded-xl border border-[var(--primary)]/20 backdrop-blur-md text-center"
    style={{ background: 'rgba(19,19,26,0.95)' }}
  >
    <div className="text-2xl mb-1">{skill.icon}</div>
    <h4 className="font-heading font-bold text-sm text-[var(--text-accent)]">{skill.name}</h4>
    <div className="flex items-center justify-center gap-2 mt-2">
      <div className="w-24 h-1.5 rounded-full bg-[var(--bg-primary)] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>
      <span className="text-[10px] font-mono text-[var(--primary)]">{skill.level}%</span>
    </div>
  </motion.div>
);

/* ═══ MAIN COMPONENT ═══ */
const SkillsConstellation = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const svgSize = 500;
  const center = svgSize / 2;

  const nodes = useMemo(() => {
    const cat = skillCategories[activeCategory];
    return generateNodePositions(cat.skills, center, center, 160);
  }, [activeCategory]);

  // Generate connections (each node to its neighbors + to center)
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      // Connect to next node (circular)
      const next = (i + 1) % nodes.length;
      lines.push({ from: nodes[i], to: nodes[next], id: `${i}-${next}` });
      // Connect every other node to create web pattern
      if (i % 2 === 0 && nodes.length > 4) {
        const cross = (i + Math.floor(nodes.length / 2)) % nodes.length;
        lines.push({ from: nodes[i], to: nodes[cross], id: `${i}-${cross}` });
      }
    }
    return lines;
  }, [nodes]);

  return (
    <section className="section-container relative overflow-hidden">
      {/* Hex grid background */}
      <div className="absolute inset-0 bg-hex-grid opacity-50" />

      <div className="content-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono text-[var(--secondary)] tracking-widest uppercase">// Tech Stack</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">
            <span className="bg-gradient-to-r from-[var(--secondary)] to-[var(--accent-coral)] bg-clip-text text-transparent">
              Skills Constellation
            </span>
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mt-2 max-w-lg mx-auto">
            Interactive node map — click any star to explore
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {skillCategories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => { setActiveCategory(i); setHoveredSkill(null); }}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                activeCategory === i
                  ? 'bg-[var(--primary)] text-white shadow-[var(--glow-purple)]'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--primary)]/20 hover:text-[var(--text-primary)]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Constellation SVG */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-lg mx-auto relative"
        >
          <svg
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className="w-full h-auto"
            style={{ maxHeight: '500px' }}
          >
            {/* Center glow */}
            <defs>
              <radialGradient id="centerGlow">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx={center} cy={center} r={80} fill="url(#centerGlow)" />

            {/* Connection lines */}
            {connections.map((conn, i) => (
              <ConnectionLine key={conn.id} from={conn.from} to={conn.to} delay={i} />
            ))}

            {/* Skill nodes */}
            {nodes.map((skill, i) => (
              <SkillNode
                key={skill.name}
                skill={skill}
                index={i}
                isActive={hoveredSkill === i}
                onClick={() => setHoveredSkill(hoveredSkill === i ? null : i)}
              />
            ))}

            {/* Center label */}
            <text
              x={center} y={center}
              textAnchor="middle" dominantBaseline="central"
              fill="var(--text-muted)"
              fontSize={10}
              fontFamily="monospace"
            >
              {skillCategories[activeCategory].name}
            </text>
          </svg>

          {/* Tooltip overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <AnimatePresence>
              {hoveredSkill !== null && nodes[hoveredSkill] && (
                <SkillTooltip skill={nodes[hoveredSkill]} />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Quick Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-8 mt-10"
        >
          {[
            { value: skillCategories.length.toString(), label: 'Categories' },
            { value: `${skillCategories.reduce((sum, c) => sum + c.skills.length, 0)}+`, label: 'Technologies' },
            { value: '∞', label: 'Curiosity' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold font-display text-[var(--secondary)]">{s.value}</div>
              <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsConstellation;

import PageWrapper from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from '../components/icons/BrandIcons';
import { useState } from 'react';
import { github, linkedin, twitter, instagram, email as userEmail, resume } from '../data/links';

const socials = [
  { icon: GithubIcon, href: github, label: 'GitHub' },
  { icon: LinkedinIcon, href: linkedin, label: 'LinkedIn' },
  { icon: TwitterIcon, href: twitter, label: 'Twitter' },
  { icon: InstagramIcon, href: instagram, label: 'Instagram' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  return (
    <PageWrapper>
      <section className="pt-24 pb-16 section-container relative min-h-screen overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #10081a 40%, #0A0A0F 100%)' }}>
        {/* Purple neon top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-40" />
        {/* Subtle spider-web radial pattern */}
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at center, var(--primary) 1px, transparent 1px), radial-gradient(circle at center, var(--primary) 1px, transparent 1px)', backgroundSize: '40px 40px', backgroundPosition: '0 0, 20px 20px' }} />
        <div className="content-container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                Let's Connect
              </span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg">Got an idea? Let's build something legendary together.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info Side */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-green-400 font-medium">Open to opportunities</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <Mail size={16} className="text-[var(--primary)]" />
                    <span className="text-sm">{userEmail}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <MapPin size={16} className="text-[var(--primary)]" />
                    <span className="text-sm">IIIT Lucknow, India</span>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <h3 className="font-heading font-semibold text-sm text-[var(--text-primary)] mb-3 uppercase tracking-wider">Connect</h3>
              <div className="flex gap-3 mb-8">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 hover:shadow-[var(--glow-purple)] transition-all duration-300">
                    <s.icon size={18} />
                  </a>
                ))}
              </div>

              {/* Resume */}
              <a href={resume} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--primary)]/30 hover:text-[var(--primary)] transition-all">
                <Download size={16} /> Download Resume
              </a>
            </motion.div>

            {/* Form Side */}
            <motion.form initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="space-y-4 p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-default)]"
              onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]/50 focus:outline-none transition-all" />
              <input type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]/50 focus:outline-none transition-all" />
              <input type="text" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]/50 focus:outline-none transition-all" />
              <textarea placeholder="Your Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]/50 focus:outline-none transition-all resize-none" />
              <button type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:shadow-[var(--glow-purple)] transition-all">
                <Send size={16} /> Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Contact;

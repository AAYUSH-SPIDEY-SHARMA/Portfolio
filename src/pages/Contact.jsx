import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, Download, Check, Copy, AlertCircle } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Seo from '../components/Seo';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from '../components/icons/BrandIcons';
import { github, linkedin, twitter, instagram, email as userEmail, resume } from '../data/links';

const socials = [
  { Icon: GithubIcon, href: github, label: 'GitHub' },
  { Icon: LinkedinIcon, href: linkedin, label: 'LinkedIn' },
  { Icon: TwitterIcon, href: twitter, label: 'Twitter' },
  { Icon: InstagramIcon, href: instagram, label: 'Instagram' },
];

const EMPTY = { name: '', email: '', subject: '', message: '' };

function validate({ name, email, subject, message }) {
  const errors = {};
  if (!name.trim()) errors.name = 'Please tell me your name.';
  if (!email.trim()) errors.email = 'I need an email to reply to.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) errors.email = "That email doesn't look right.";
  if (!subject.trim()) errors.subject = 'Give it a subject line.';
  if (!message.trim()) errors.message = 'The message is empty.';
  else if (message.trim().length < 10) errors.message = 'A little more detail would help.';
  return errors;
}

const fieldClass = (hasError) =>
  `w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none transition-all ${
    hasError
      ? 'border-[var(--accent-red)]/60 focus:border-[var(--accent-red)]'
      : 'border-[var(--border-default)] focus:border-[var(--primary)]/60'
  }`;

const FieldError = ({ id, children }) =>
  children ? (
    <p id={id} className="flex items-center gap-1.5 text-xs text-[var(--accent-red)] mt-1.5">
      <AlertCircle size={12} aria-hidden="true" />
      {children}
    </p>
  ) : null;

const Contact = () => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sent
  const [copied, setCopied] = useState(false);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    // Clear a field's error as soon as the user starts correcting it.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    // Hand off to the visitor's mail client with everything pre-filled.
    const body = `${form.message.trim()}\n\n—\n${form.name.trim()}\n${form.email.trim()}`;
    const href = `mailto:${userEmail}?subject=${encodeURIComponent(form.subject.trim())}&body=${encodeURIComponent(body)}`;
    window.location.href = href;

    setStatus('sent');
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(userEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <PageWrapper>
      <Seo
        title="Contact"
        description="Get in touch with Aayush Sharma — open to internships, collaborations, and open-source work."
        path="/contact"
      />
      <section
        className="pt-24 pb-16 section-container relative min-h-screen overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #10081a 40%, #0A0A0F 100%)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-40" />
        <div
          className="absolute top-1/3 right-0 w-[500px] h-[500px] opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, var(--primary) 1px, transparent 1px), radial-gradient(circle at center, var(--primary) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px',
          }}
        />

        <div className="content-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                Let’s Connect
              </span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg">
              Got an idea? Let’s build something legendary together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* ── Info ── */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <div className="mb-8">
                <p className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                  <span className="text-sm text-green-400 font-medium">Open to opportunities</span>
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <Mail size={16} className="text-[var(--primary)] shrink-0" aria-hidden="true" />
                    <a href={`mailto:${userEmail}`} className="text-sm hover:text-[var(--primary)] transition-colors">
                      {userEmail}
                    </a>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                      aria-label={copied ? 'Email copied' : 'Copy email address'}
                    >
                      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <p className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <MapPin size={16} className="text-[var(--primary)] shrink-0" aria-hidden="true" />
                    <span className="text-sm">IIIT Lucknow, India</span>
                  </p>
                </div>
              </div>

              <h2 className="font-heading font-semibold text-sm text-[var(--text-primary)] mb-3 uppercase tracking-wider">
                Connect
              </h2>
              <ul className="flex gap-3 mb-8">
                {socials.map(({ Icon, href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-11 h-11 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 hover:shadow-[var(--glow-purple)] transition-all duration-300"
                    >
                      <Icon size={18} />
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--primary)]/30 hover:text-[var(--primary)] transition-all"
              >
                <Download size={16} aria-hidden="true" /> Download Resume
              </a>
            </motion.div>

            {/* ── Form ── */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    className="p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-default)] text-center"
                    role="status"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                      <Check size={22} className="text-green-400" aria-hidden="true" />
                    </div>
                    <h2 className="font-heading font-bold text-lg text-[var(--text-primary)] mb-2">
                      Your mail app should be open
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                      I pre-filled everything — just hit send. If nothing opened, no problem:
                      mail me directly at{' '}
                      <a href={`mailto:${userEmail}`} className="text-[var(--primary)] hover:underline">
                        {userEmail}
                      </a>.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <button
                        type="button"
                        onClick={copyEmail}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all"
                      >
                        {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                        {copied ? 'Copied' : 'Copy address'}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setForm(EMPTY); setErrors({}); setStatus('idle'); }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all"
                      >
                        Write another
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                    onSubmit={handleSubmit}
                    className="space-y-4 p-8 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-default)]"
                  >
                    <div>
                      <label htmlFor="c-name" className="sr-only">Your name</label>
                      <input
                        id="c-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={update('name')}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'c-name-err' : undefined}
                        className={fieldClass(errors.name)}
                      />
                      <FieldError id="c-name-err">{errors.name}</FieldError>
                    </div>

                    <div>
                      <label htmlFor="c-email" className="sr-only">Your email</label>
                      <input
                        id="c-email"
                        type="email"
                        autoComplete="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={update('email')}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'c-email-err' : undefined}
                        className={fieldClass(errors.email)}
                      />
                      <FieldError id="c-email-err">{errors.email}</FieldError>
                    </div>

                    <div>
                      <label htmlFor="c-subject" className="sr-only">Subject</label>
                      <input
                        id="c-subject"
                        type="text"
                        placeholder="Subject"
                        value={form.subject}
                        onChange={update('subject')}
                        aria-invalid={Boolean(errors.subject)}
                        aria-describedby={errors.subject ? 'c-subject-err' : undefined}
                        className={fieldClass(errors.subject)}
                      />
                      <FieldError id="c-subject-err">{errors.subject}</FieldError>
                    </div>

                    <div>
                      <label htmlFor="c-message" className="sr-only">Your message</label>
                      <textarea
                        id="c-message"
                        rows={5}
                        placeholder="Your Message"
                        value={form.message}
                        onChange={update('message')}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'c-message-err' : undefined}
                        className={`${fieldClass(errors.message)} resize-none`}
                      />
                      <FieldError id="c-message-err">{errors.message}</FieldError>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:shadow-[var(--glow-purple)] transition-all"
                    >
                      <Send size={16} aria-hidden="true" /> Send Message
                    </button>

                    <p className="text-[11px] text-[var(--text-muted)] text-center leading-relaxed">
                      Opens your email app with the message ready to send.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Contact;

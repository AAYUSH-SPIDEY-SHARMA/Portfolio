import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, PenLine } from 'lucide-react';

const CTAStrip = () => {
  return (
    <section className="section-container relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-[var(--secondary)]/5 rounded-full blur-3xl" />

      <div className="content-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--romance-pink)] bg-clip-text text-transparent animate-gradient-shift">
              Want to Connect?
            </span>
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mt-2">
            Leave a message, read my thoughts, or just say hi
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex-1"
          >
            <Link
              to="/wall"
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-medium bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:shadow-[var(--glow-purple)] transition-all group"
            >
              <MessageCircle size={16} />
              Leave a Whisper
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            <Link
              to="/blog"
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-medium bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--primary)]/20 hover:text-[var(--primary)] transition-all group"
            >
              <PenLine size={16} />
              Read My Journal
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTAStrip;

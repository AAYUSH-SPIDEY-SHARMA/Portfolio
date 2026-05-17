import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from '../icons/BrandIcons';
import { github, linkedin, twitter, instagram, email } from '../../data/links';

const footerLinks = [
  { label: 'Blog', path: '/blog' },
  { label: 'Wall', path: '/wall' },
  { label: 'Contact', path: '/contact' },
];

const socialLinks = [
  { icon: GithubIcon, href: github, label: 'GitHub' },
  { icon: LinkedinIcon, href: linkedin, label: 'LinkedIn' },
  { icon: TwitterIcon, href: twitter, label: 'Twitter' },
  { icon: InstagramIcon, href: instagram, label: 'Instagram' },
  { icon: Mail, href: `mailto:${email}`, label: 'Email' },
];

const Footer = () => {
  return (
    <footer className="relative mt-20 overflow-hidden" style={{ height: '360px' }}>

      {/* ── EYES IMAGE ── Full-width background, full opacity ── */}
      <img
        src="https://res.cloudinary.com/du8isxcag/image/upload/v1779047589/portfolio_assets/EYES_HD.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
      />

      {/* ── Dark gradient overlay at the bottom only ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, #080010 0%, #080010dd 20%, #08001066 50%, transparent 100%)',
        }}
      />

      {/* ── Content pinned to the bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 w-full max-w-5xl mx-auto px-6 pb-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-2">

          {/* Left: Brand */}
          <div className="flex-1 max-w-xs">
            <h3
              className="font-display text-2xl font-bold mb-1 tracking-wide italic"
              style={{
                color: '#ff4d94',
                textShadow: '0 0 10px rgba(255,77,148,0.6)',
              }}
            >
              Aayush Sharma
            </h3>
            <p className="text-[#d1d5db] font-mono text-[11px] leading-relaxed mb-1">
              M.Sc AI/ML @ IIIT Lucknow · Full-Stack Developer · Open Source Contributor · Competitive Programmer
            </p>
            <p className="text-[#9ca3af] font-mono text-[11px]">
              "I don't choose one path. I walk them all."
            </p>
          </div>

          {/* Middle: Navigate */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <Link
              to="/"
              className="font-mono text-[12px] tracking-wide"
              style={{ color: '#ff4d94', textShadow: '0 0 8px rgba(255,77,148,0.8)' }}
            >
              Home
            </Link>
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="font-mono text-[#d1d5db] text-[12px] tracking-wide hover:text-[#ff4d94] transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Connect */}
          <div className="flex-1 flex flex-col items-center">
            <h4
              className="font-display text-lg font-bold mb-2 tracking-widest uppercase italic"
              style={{ color: '#ff4d94', textShadow: '0 0 10px rgba(255,77,148,0.6)' }}
            >
              Connect
            </h4>
            <div className="flex items-center gap-2 mb-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 flex items-center justify-center text-white rounded-lg transition-all duration-300 hover:bg-[rgba(255,77,148,0.15)]"
                  style={{
                    border: '1px solid rgba(255,77,148,0.6)',
                    boxShadow: '0 0 8px rgba(255,77,148,0.2)',
                  }}
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00ff41] shadow-[0_0_8px_#00ff41]" />
              <span className="font-mono text-[#d1d5db] text-[11px] tracking-wide">
                Open to opportunities
              </span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

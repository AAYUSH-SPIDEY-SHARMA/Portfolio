import { motion } from 'framer-motion';
import { github, instagram, linkedin, twitter, resume } from '../data/links';
import { cld, ASSETS } from '../lib/images';
import Typewriter from './animations/Typewriter';
import { GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from './icons/BrandIcons';

const socials = [
  { href: instagram, label: 'Instagram', Icon: InstagramIcon, bg: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]' },
  { href: github, label: 'GitHub', Icon: GithubIcon, bg: 'bg-[#181717]' },
  { href: linkedin, label: 'LinkedIn', Icon: LinkedinIcon, bg: 'bg-[#0A66C2]' },
  { href: twitter, label: 'X (Twitter)', Icon: TwitterIcon, bg: 'bg-gray-900' },
];

/**
 * Landing hero. `variant="hidden"` is the easter-egg dimension — same layout,
 * warmer accent treatment.
 */
const Hero = ({ variant = 'default' }) => {
  const isHidden = variant === 'hidden';

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center overflow-hidden"
      style={{
        // 2560 + auto:best — at w_1920/q_auto the sky banded badly on wide
        // displays, which read as a low-resolution image.
        backgroundImage: `url(${cld(ASSETS.heroBg, { width: 2560, quality: 'auto:best' })})`,
        backgroundSize: 'cover',
        // The artwork's subject — moon, and the figure on the right — sits in
        // the upper half. Anchoring to the bottom cropped both away.
        backgroundPosition: 'center 35%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/*
        Legibility scrim. The artwork is pale on the left and dark on the
        right; this lifts the left edge just enough for near-black body copy
        to clear contrast without flattening the painting.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(100deg, rgba(247,248,252,0.92) 0%, rgba(247,248,252,0.78) 28%, rgba(247,248,252,0.25) 48%, transparent 62%)',
        }}
      />

      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 py-16 md:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-4">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 max-w-xl text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Hi,
            </h1>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-3 leading-tight">
              <Typewriter text="I'm Aayush Sharma" loop />
            </h1>

            {isHidden && (
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                Welcome to the dimension few people find.
              </h2>
            )}

            <p className="text-base md:text-lg text-gray-800 mb-6 leading-relaxed max-w-md mx-auto lg:mx-0">
              AI/ML Student at IIIT Lucknow
            </p>

            {/* Socials */}
            <ul className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
              {socials.map(({ href, label, Icon, bg }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`${bg} w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm transition-transform duration-200 hover:scale-110 hover:shadow-md`}
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
              className="inline-block px-14 py-3 bg-[#3B9AE8] text-white font-medium text-base rounded-lg hover:bg-[#2d8ad6] transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Resume
            </a>
          </motion.div>

          {/*
            The flat vector illustration and the ARISE silhouette used to live
            here. Both sat directly on the painted figure once the background
            became full-bleed artwork, so the right half is deliberately left
            empty — the illustration IS the hero visual now.
          */}
          <div className="hidden lg:block flex-1" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

import { motion } from 'framer-motion';
import { github, instagram, linkedin, twitter, resume } from '../data/links';
import { cld, cldSrcSet, ASSETS } from '../lib/images';
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
        backgroundImage: `url(${cld(ASSETS.heroBg, { width: 1920 })})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Decorative silhouette */}
      <img
        src={cld(ASSETS.ariseSilhouette, { width: 900 })}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute right-0 bottom-0 h-[70vh] w-auto pointer-events-none hidden lg:block"
        style={{ transform: 'translateX(30%)', mixBlendMode: 'multiply' }}
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
              <Typewriter text="I'm Aayush Sharma" />
            </h1>

            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              {isHidden
                ? 'Welcome to the dimension few people find.'
                : 'Open Source Contributor · Bitcoin Protocol Learner · GSoC Aspirant'}
            </h2>

            <p className="text-sm md:text-base text-gray-700 mb-6 leading-relaxed max-w-md mx-auto lg:mx-0">
              I work on open-source systems, competitive programming, and protocol-level
              debugging with a current focus on Bitcoin internals.
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

          {/* Right — illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <img
              src={cld(ASSETS.heroIllustration, { width: 900 })}
              srcSet={cldSrcSet(ASSETS.heroIllustration, [480, 720, 900, 1200])}
              sizes="(max-width: 1024px) 90vw, 45vw"
              alt="Illustration of a developer working at a desk"
              fetchPriority="high"
              decoding="async"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

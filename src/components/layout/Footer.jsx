import { cldOriginal, ASSETS } from '../../lib/images';

/**
 * Site footer: the banner artwork, and nothing else.
 *
 * Served as the untouched original — no Cloudinary resize or quality pass —
 * and rendered at its natural 1280×400 so it is never upscaled. The dark
 * surround matches the artwork's own background, so on wide viewports the
 * image reads as centred rather than as a floating box.
 */
const Footer = () => (
  <footer className="w-full bg-[#0B0410] leading-[0]">
    <img
      src={cldOriginal(ASSETS.footerBanner)}
      alt=""
      aria-hidden="true"
      width={1280}
      height={400}
      loading="lazy"
      decoding="async"
      className="mx-auto block h-auto max-w-full"
    />
  </footer>
);

export default Footer;

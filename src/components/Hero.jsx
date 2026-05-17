import { github, instagram, linkedin, twitter, resume } from "../data/links";
const heroBg = "https://res.cloudinary.com/du8isxcag/image/upload/v1779048913/portfolio_assets/src_assets/hero-bg.png";
const heroIllustration = "https://res.cloudinary.com/du8isxcag/image/upload/v1779048915/portfolio_assets/src_assets/hero-illustration.png";
const githubIcon = "https://res.cloudinary.com/du8isxcag/image/upload/v1779048911/portfolio_assets/src_assets/github-icon.png";
const instagramIcon = "https://res.cloudinary.com/du8isxcag/image/upload/v1779048916/portfolio_assets/src_assets/instagram-icon.png";
const ariseSilhouette = "https://res.cloudinary.com/du8isxcag/image/upload/v1779048917/portfolio_assets/src_assets/arise-silhouette.jpg";

const Hero = () => {
    return (
        <section
            id="home"
            className="relative min-h-screen w-full flex items-center overflow-hidden"
            style={{
                backgroundImage: `url(${heroBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center bottom",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Decorative Sticker - ARISE Silhouette */}
            <img
                src={ariseSilhouette}
                alt=""
                aria-hidden="true"
                className="absolute right-0 bottom-0 h-[70vh] w-auto opacity-100 pointer-events-none hidden lg:block"
                style={{
                    transform: "translateX(30%)",
                    mixBlendMode: "multiply",
                }}
            />

            {/* Main Content Container - Shifted more left with less padding */}
            <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 py-16 md:py-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-4">

                    {/* Left Side - Text Content */}
                    <div className="flex-1 max-w-xl text-center lg:text-left">
                        {/* Line 1: Hi, */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-0 leading-tight">
                            Hi,
                        </h1>

                        {/* Line 2: I'm Aayush Sharma - with typewriter animation */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-3 leading-tight overflow-hidden">
                            <span className="inline-block animate-typewriter">
                                I'm Aayush Sharma
                            </span>
                        </h1>

                        {/* Subheading - Darker color for contrast against sky background */}
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                            Open Source Contributor · Bitcoin Protocol Learner · GSoC Aspirant
                        </h2>

                        {/* Description */}
                        <p className="text-sm md:text-base text-gray-700 mb-6 leading-relaxed max-w-md mx-auto lg:mx-0">
                            I work on open-source systems, competitive programming,
                            and protocol-level debugging with a current focus on Bitcoin internals.
                        </p>

                        {/* Social Icons Row */}
                        <div className="flex items-center gap-3 mb-5 justify-center lg:justify-start">
                            {/* Instagram Icon */}
                            <a
                                href={instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full overflow-hidden hover:opacity-80 transition-all duration-200 hover:scale-110 transform"
                                title="Instagram"
                            >
                                <img
                                    src={instagramIcon}
                                    alt="Instagram"
                                    className="w-full h-full object-cover"
                                />
                            </a>

                            {/* GitHub Icon */}
                            <a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full overflow-hidden hover:opacity-80 transition-all duration-200 hover:scale-110 transform"
                                title="GitHub"
                            >
                                <img
                                    src={githubIcon}
                                    alt="GitHub"
                                    className="w-full h-full object-cover"
                                />
                            </a>

                            {/* LinkedIn Icon */}
                            <a
                                href={linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center hover:opacity-80 transition-all duration-200 hover:scale-110 transform"
                                title="LinkedIn"
                            >
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>

                            {/* X (Twitter) Icon */}
                            <a
                                href={twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:opacity-80 transition-all duration-200 hover:scale-110 transform"
                                title="X (Twitter)"
                            >
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                        </div>

                        {/* Resume Button */}
                        <a
                            href={resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-14 py-3 bg-[#3B9AE8] text-white font-medium text-base rounded-lg 
                         hover:bg-[#2d8ad6] transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                            Resume
                        </a>
                    </div>

                    {/* Right Side - Illustration */}
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <img
                            src={heroIllustration}
                            alt="Developer at desk illustration"
                            className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

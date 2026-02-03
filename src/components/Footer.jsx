import { github, devto, medium, linkedin, twitter, resume } from "../data/links";
import chibiItachi from "../assets/stickers/anime/chibi-itachi.jpg";

const Footer = () => {
    const professionalLinks = [
        {
            name: "GitHub",
            url: github,
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
            )
        },
        {
            name: "Dev.to",
            url: devto,
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.29zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.79 6.68z" />
                </svg>
            )
        },
        {
            name: "Medium",
            url: medium,
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
            )
        },
        {
            name: "LinkedIn",
            url: linkedin,
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            )
        },
        {
            name: "X (Twitter)",
            url: twitter,
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            )
        },
        {
            name: "Resume",
            url: resume,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        }
    ];

    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 py-16">

                {/* Main Footer Grid */}
                <div className="grid md:grid-cols-3 gap-12 md:gap-8">

                    {/* Identity Block */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Aayush Sharma
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Open Source Contributor · Bitcoin Protocol Learner · GSoC Aspirant
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Focused on open-source systems, protocol design, and long-term impact.
                        </p>
                    </div>

                    {/* Professional Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                            Professional Presence
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                            {professionalLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                                >
                                    <span className="text-gray-400">{link.icon}</span>
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Meta / Closing Note */}
                    <div className="md:text-right">
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                            About This Site
                        </h4>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                            Built with React and Tailwind CSS.<br />
                            Designed for clarity, maintainability, and performance.
                        </p>
                        <p className="text-gray-400 text-sm flex items-center gap-2 justify-end">
                            © 2026 Aayush Sharma
                            {/* Easter Egg Sticker */}
                            <img
                                src={chibiItachi}
                                alt=""
                                aria-hidden="true"
                                className="w-6 h-6 opacity-100 rounded hover:opacity-100 transition-opacity cursor-default"
                                title="You found the easter egg! 👀"
                            />
                        </p>
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;

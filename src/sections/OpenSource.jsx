import { featuredContributions, ossStats, holopin } from "../data/oss";
import milesHeadphones from "../assets/stickers/spiderman/miles-headphones.jpg";
import spideyHoodie from "../assets/stickers/spiderman/spidey-hoodie.jpg";

const OpenSource = () => {
    return (
        <section id="opensource" className="bg-gradient-to-b from-white to-gray-50 py-20 md:py-28 relative overflow-hidden">
            {/* Decorative Sticker - Miles Headphones */}
            <img
                src={milesHeadphones}
                alt=""
                aria-hidden="true"
                className="absolute right-0 top-1/4 w-64 md:w-80 opacity-100 pointer-events-none hidden lg:block"
                style={{
                    transform: "translateX(10%) rotate(-3deg)",
                }}
            />

            {/* Decorative Sticker - Spidey Hoodie */}
            <img
                src={spideyHoodie}
                alt=""
                aria-hidden="true"
                className="absolute left-0 bottom-20 w-56 md:w-72 opacity-100 pointer-events-none hidden lg:block"
                style={{
                    transform: "translateX(-15%) rotate(5deg)",
                }}
            />

            <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Open Source Contributions
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Selected contributions to open-source projects, including GSoC organizations,
                        focused on debugging, system design, and protocol-level improvements.
                    </p>
                </div>

                {/* Stats Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {ossStats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100"
                        >
                            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                                {stat.number}
                            </div>
                            <div className="text-sm text-gray-500 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Featured Contributions */}
                <div className="grid gap-8 mb-16">
                    {featuredContributions.map((contribution) => (
                        <div
                            key={contribution.id}
                            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            {/* Header Row */}
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        {contribution.project}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        {contribution.organization} · {contribution.contributionType}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {contribution.techStack.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Problem */}
                            <p className="text-gray-700 mb-5 leading-relaxed">
                                {contribution.problem}
                            </p>

                            {/* Actions - Horizontal on Desktop */}
                            <div className="grid md:grid-cols-2 gap-2 mb-5">
                                {contribution.actions.map((action, index) => (
                                    <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {action}
                                    </div>
                                ))}
                            </div>

                            {/* Outcome & Links */}
                            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium text-gray-800">Outcome:</span> {contribution.outcome}
                                </p>
                                <div className="flex gap-4">
                                    {contribution.prLink && (
                                        <a
                                            href={contribution.prLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                            </svg>
                                            View PR
                                        </a>
                                    )}
                                    {contribution.issueLink && (
                                        <a
                                            href={contribution.issueLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            View Issue
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Hacktoberfest Recognition - Full Width Big Board */}
                <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            Hacktoberfest & OSS Recognition
                        </h3>
                        <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Badges earned through consistent participation in open-source programs
                            including Hacktoberfest and community-driven contributions.
                        </p>
                    </div>
                    <a
                        href={holopin.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:opacity-90 transition-opacity"
                    >
                        <img
                            src={holopin.badgeUrl}
                            alt={`Holopin badges for ${holopin.username}`}
                            className="w-full h-auto rounded-lg"
                        />
                    </a>
                </div>

            </div>
        </section>
    );
};

export default OpenSource;

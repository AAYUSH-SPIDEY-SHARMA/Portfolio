import { profileCards, featuredAchievements, competitiveStats, otherAchievements, profileLinks } from "../data/cp";
import basketballSilhouette from "../assets/stickers/anime/basketball-silhouette.jpg";
import milesJordan from "../assets/stickers/spiderman/miles-jordan.png";
import egoRin from "../assets/stickers/anime/ego-rin.png";

const CPAchievements = () => {
    const getIcon = (iconType) => {
        switch (iconType) {
            case "academic":
                return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                );
            case "trophy":
                return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                );
            case "code":
            default:
                return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                );
        }
    };

    const getGradient = (color) => {
        const gradients = {
            emerald: "from-emerald-500 to-teal-600",
            amber: "from-amber-500 to-orange-600",
            blue: "from-blue-500 to-indigo-600",
            purple: "from-purple-500 to-pink-600",
            indigo: "from-indigo-500 to-purple-700"
        };
        return gradients[color] || gradients.blue;
    };

    const getBgLight = (color) => {
        const bgs = {
            emerald: "bg-emerald-50 border-emerald-200",
            amber: "bg-amber-50 border-amber-200",
            blue: "bg-blue-50 border-blue-200",
            purple: "bg-purple-50 border-purple-200"
        };
        return bgs[color] || bgs.blue;
    };

    return (
        <section id="cp" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Decorative Sticker - EGO Rin */}
            <img
                src={egoRin}
                alt=""
                aria-hidden="true"
                className="absolute right-0 top-20 w-56 md:w-72 opacity-100 pointer-events-none hidden lg:block"
                style={{
                    transform: "translateX(10%) rotate(-3deg)",
                }}
            />

            {/* Decorative Sticker - Basketball Silhouette */}
            <img
                src={basketballSilhouette}
                alt=""
                aria-hidden="true"
                className="absolute right-0 bottom-0 w-64 md:w-80 opacity-100 pointer-events-none hidden lg:block"
                style={{
                    transform: "translateX(5%) translateY(10%) rotate(-5deg)",
                    mixBlendMode: "multiply",
                }}
            />

            {/* Decorative Sticker - Miles Jordan */}
            <img
                src={milesJordan}
                alt=""
                aria-hidden="true"
                className="absolute left-0 top-1/3 w-64 md:w-80 opacity-100 pointer-events-none hidden lg:block"
                style={{
                    transform: "translateX(-10%) rotate(3deg)",
                }}
            />

            <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Competitive Excellence
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Years of dedication in competitive programming, academics, and sports —
                        achieving national and global recognition.
                    </p>
                </div>

                {/* Stats Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {competitiveStats.map((stat, index) => (
                        <div key={index} className="text-center p-5 bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-500 font-medium mt-1">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CP Profile Cards */}
                <div className="mb-16">
                    <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">
                        💻 Competitive Programming Profiles
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {profileCards.map((card) => (
                            <a
                                key={card.id}
                                href={card.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block"
                            >
                                <div className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] bg-gradient-to-br ${getGradient(card.color)} p-6 h-full`}>
                                    {/* Platform Badge */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                                            {card.platform}
                                        </span>
                                        <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {card.title}
                                    </h3>

                                    {/* Highlight Stat */}
                                    <div className="bg-white/20 rounded-lg px-4 py-3 mb-3">
                                        <div className="text-xl font-bold text-white">
                                            {card.highlight}
                                        </div>
                                        <div className="text-white/80 text-sm">
                                            {card.details}
                                        </div>
                                    </div>

                                    {/* Handle */}
                                    {card.handle && (
                                        <p className="text-white/70 text-sm font-mono">
                                            @{card.handle}
                                        </p>
                                    )}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Featured Achievements - Large Cards */}
                <div className="mb-16">
                    <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">
                        🏆 Prestigious Achievements
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {featuredAchievements.map((achievement) => (
                            <div
                                key={achievement.id}
                                className={`relative overflow-hidden rounded-2xl border-2 ${getBgLight(achievement.color)} p-6 md:p-8 transition-transform hover:scale-[1.02]`}
                            >
                                {/* Gradient Accent */}
                                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${getGradient(achievement.color)}`} />

                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${getGradient(achievement.color)} text-white shadow-lg`}>
                                        {getIcon(achievement.icon)}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-gradient-to-r ${getGradient(achievement.color)} text-white`}>
                                                {achievement.category}
                                            </span>
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-1">
                                            {achievement.title}
                                        </h4>
                                        <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                                            {achievement.rank}
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {achievement.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Other Achievements - Compact Grid */}
                <div className="mb-12">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">
                        Other Notable Achievements
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {otherAchievements.map((achievement, index) => (
                            <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                        {achievement.badge}
                                    </span>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-1">
                                    {achievement.title}
                                </h4>
                                <p className="text-gray-500 text-sm">
                                    {achievement.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Profile Links */}
                <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-1">
                                Verify My Profiles
                            </h3>
                            <p className="text-gray-400 text-sm">
                                All achievements are verifiable through official platforms
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {profileLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-sm font-semibold shadow-sm"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CPAchievements;

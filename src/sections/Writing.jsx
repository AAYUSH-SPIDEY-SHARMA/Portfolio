import { featuredArticle } from "../data/writing";

const Writing = () => {
    return (
        <section
            id="writing"
            className="py-20 md:py-28 relative"
            style={{
                backgroundImage: "url('/bitcoin-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-white/50"></div>

            <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Writing & Technical Research
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Long-form technical writing focused on Bitcoin internals,
                        protocol design, and systems-level debugging.
                    </p>
                </div>

                {/* Featured Article Card */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-5 gap-0">

                        {/* Left - UTXO Lifecycle Image */}
                        <div className="md:col-span-2 relative min-h-[300px] md:min-h-full">
                            <img
                                src="/utxo-lifecycle.jpg"
                                alt="Bitcoin UTXO Lifecycle Flow"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            {/* Overlay content */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                                <span className="text-blue-200 text-sm font-medium uppercase tracking-wider mb-2">Featured Article</span>
                                <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
                                    {featuredArticle.title}
                                </h3>
                            </div>
                        </div>

                        {/* Right - Content Panel */}
                        <div className="md:col-span-3 p-8 md:p-10">
                            {/* Metadata Row */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-5">
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {featuredArticle.publishedYear}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {featuredArticle.readingTime}
                                </span>
                                <span>{featuredArticle.platform}</span>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {featuredArticle.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="text-xs font-medium bg-orange-100 text-orange-700 px-3 py-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Summary */}
                            <p className="text-gray-700 leading-relaxed mb-8">
                                {featuredArticle.summary}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href={featuredArticle.devtoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.29zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.79 6.68z" />
                                    </svg>
                                    Read on Dev.to
                                </a>
                                <a
                                    href={featuredArticle.mediumLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                                    </svg>
                                    Read on Medium
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Writing;

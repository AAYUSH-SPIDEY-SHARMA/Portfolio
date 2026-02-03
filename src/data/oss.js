// Open Source Contributions Data

export const featuredContributions = [
    {
        id: 1,
        project: "P4 Language Consortium",
        organization: "GSoC Organization",
        techStack: ["C++", "Compiler", "Networking"],
        contributionType: "Merged Pull Request · Issue Debugging",
        problem: "Identified and resolved a parser inconsistency causing incorrect packet behavior under edge-case rule ordering in the P4 compiler toolchain.",
        actions: [
            "Reproduced issue using minimal failing examples",
            "Traced bug across parsing and validation stages",
            "Proposed fix after discussion with maintainers",
            "Implemented patch and updated tests"
        ],
        outcome: "maintainer accepted pr fixes the issue but there is some inconsistency in the p4 spec so after the update pr will be merged.",
        prLink: "https://github.com/kaist-plrg/p4-spectec/pull/106",
        issueLink: "https://github.com/kaist-plrg/p4-spectec/issues/37"
    },
    {
        id: 2,
        project: "Bitcoin Protocol Research",
        organization: "Open Source",
        techStack: ["C++", "Protocol", "Cryptography"],
        contributionType: "Documentation · Protocol Analysis",
        problem: "Analyzed Bitcoin Core's transaction validation logic to understand edge cases in script execution and propagation rules.",
        actions: [

        ],
        outcome: "",
        prLink: "",
        issueLink: null
    },
    {
        id: 3,
        project: "Open Source Tooling",
        organization: "Various Projects",
        techStack: ["Python", "JavaScript", "DevOps"],
        contributionType: "Bug Fixes · Feature Implementations",
        problem: "Contributed to multiple open-source projects by fixing bugs, improving documentation, and adding features.",
        actions: [
            "Identified and fixed cross-platform compatibility issues",
            "Improved error handling and user feedback",
            "Enhanced documentation for better developer experience",
            "Participated in code reviews and discussions"
        ],
        outcome: "Multiple PRs merged across repositories; ongoing contributor status.",
        prLink: "https://github.com/AAYUSH-SPIDEY-SHARMA",
        issueLink: null
    }
];

export const ossStats = [
    { number: "15+", label: "Merged PRs" },
    { number: "5+", label: "Organizations" },
    { number: "2", label: "GSoC Orgs" },
    { number: "1+", label: "Years Active" }
];

export const holopin = {
    username: "aayushspideysharma",
    badgeUrl: "https://holopin.me/aayushspideysharma",
    profileUrl: "https://holopin.io/@aayushspideysharma"
};

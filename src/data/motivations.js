// Motivations, quotes, and daily inspiration
export const motivationalQuotes = [
  { quote: "I don't choose one path. I walk them all.", author: 'Aayush Sharma', category: 'personal' },
  { quote: "The spider web of my universe keeps expanding.", author: 'Aayush Sharma', category: 'personal' },
  { quote: "Every expert was once a beginner.", author: 'Helen Hayes', category: 'growth' },
  { quote: "The only way to do great work is to love what you do.", author: 'Steve Jobs', category: 'work' },
  { quote: "It's not about how hard you hit. It's about how hard you can get hit and keep moving forward.", author: 'Rocky Balboa', category: 'resilience' },
  { quote: "Code is like humor. When you have to explain it, it's bad.", author: 'Cory House', category: 'coding' },
  { quote: "First, solve the problem. Then, write the code.", author: 'John Johnson', category: 'coding' },
  { quote: "The best error message is the one that never shows up.", author: 'Thomas Fuchs', category: 'coding' },
  { quote: "Talk is cheap. Show me the code.", author: 'Linus Torvalds', category: 'coding' },
  { quote: "In the middle of difficulty lies opportunity.", author: 'Albert Einstein', category: 'growth' },
];

export const personalMantras = [
  'Build things. Break things. Build better things.',
  'The best portfolio is the one that never stops evolving.',
  'Competitive coding sharpens the mind. Real projects sharpen the soul.',
  'I code like I game — with focus, strategy, and zero mercy.',
];

export const dailyMotivation = () => {
  const idx = new Date().getDate() % motivationalQuotes.length;
  return motivationalQuotes[idx];
};

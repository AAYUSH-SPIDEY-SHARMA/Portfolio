/**
 * Console Easter egg — prints ASCII art + message when DevTools are opened
 */
export const consoleEasterEgg = () => {
  const style1 = 'color: #6C5CE7; font-size: 16px; font-weight: bold;';
  const style2 = 'color: #00D2FF; font-size: 12px;';
  const style3 = 'color: #FF69B4; font-size: 11px;';
  const style4 = 'color: #8888AA; font-size: 11px;';

  console.log('%c' + `
   ___                       _     
  / _ \\                     | |    
 / /_\\ \\ __ _ _   _ _   _ ___| |__  
 |  _  |/ _\` | | | | | | / __| '_ \\ 
 | | | | (_| | |_| | |_| \\__ \\ | | |
 \\_| |_/\\__,_|\\__, |\\__,_|___/_| |_|
               __/ |                 
              |___/                  
  `, style1);

  console.log('%c🕷️ Welcome to the Spider-Verse, dev.', style2);
  console.log('%c💜 Built with React + Vite + Framer Motion + a LOT of caffeine', style3);
  console.log('%c📧 Interested? → sharmaaayush598@gmail.com', style4);
  console.log('%c🔗 GitHub → https://github.com/AAYUSH-SPIDEY-SHARMA', style4);
  console.log('%c\n⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️ — Try it.', style2);
};

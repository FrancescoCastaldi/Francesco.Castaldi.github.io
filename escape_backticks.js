const fs = require('fs');
const files = ['src/data/blog-posts.ts', 'src/data/projects.ts'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace unescaped ``` with \`\`\`
  // Note: Since backticks are literal string characters in markdown, 
  // replacing '```' with '\\`\\`\\`' ensures the JS compiler sees \` and renders `
  
  content = content.replace(/```/g, '\\`\\`\\`');
  
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed backticks in ' + file);
}

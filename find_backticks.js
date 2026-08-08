const fs = require('fs');
const files = ['src/data/blog-posts.ts', 'src/data/projects.ts'];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    // looking for backticks that don't have a backslash before them
    const unescapedBackticks = line.match(/(?<!\\)`/g);
    if (unescapedBackticks) {
      if (line.includes('content: `') || line.trim() === '`,') return;
      console.log(file + ':' + (i+1) + ': ' + line);
    }
  });
}

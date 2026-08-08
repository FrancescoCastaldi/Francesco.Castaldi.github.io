const fs = require('fs');
const files = ['src/data/blog-posts.ts', 'src/data/projects.ts'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let lines = content.split('\n');
  let inContent = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Check if we are opening a content block
    let openedHere = false;
    if (line.includes('content: `')) {
      inContent = true;
      openedHere = true;
    }
    
    if (inContent) {
      // Escape `${` with `\${` in lines inside the content block
      if (line.includes('${')) {
        // Find if it's already escaped, if not, escape it
        // A simple global replace is safest if we just replace all unescaped ones
        lines[i] = line.replace(/(?<!\\)\$\{/g, '\\${');
      }

      if (line.trim().endsWith('`,')) {
        inContent = false;
      }
    }
  }
  
  fs.writeFileSync(file, lines.join('\n'), 'utf8');
  console.log('Processed ' + file);
}

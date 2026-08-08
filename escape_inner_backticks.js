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
      // We want to escape any backticks AFTER the 'content: `' 
      // But we know none exist on that exact line in our formatting, let's keep it simple.
    }
    
    if (inContent && !openedHere) {
      // Check if this line closes the content block
      if (line.trim().endsWith('`,')) {
        // It closes here. We must escape all backticks EXCEPT the last one.
        // Easiest way: remove the closing `, then escape all, then put it back
        let stripped = line.replace(/`,\s*$/, '');
        let escaped = stripped.replace(/(?<!\\)`/g, '\\`');
        lines[i] = escaped + '`,';
        inContent = false;
      } else {
        // We are fully inside the content block. Escape all unescaped backticks.
        lines[i] = line.replace(/(?<!\\)`/g, '\\`');
      }
    }
  }
  
  fs.writeFileSync(file, lines.join('\n'), 'utf8');
  console.log('Processed ' + file);
}

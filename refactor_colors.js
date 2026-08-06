const fs = require('fs');
const path = require('path');

const replacements = {
  '"#06080C"': '"var(--color-space-void)"',
  '"#0C111A"': '"var(--color-space-surface)"',
  '"#131B27"': '"var(--color-space-elevated)"',
  '"#F59E0B"': '"var(--color-star-gold)"',
  '"#22D3EE"': '"var(--color-nebula)"',
  '"#E7EDF5"': '"var(--color-text-primary)"',
  '"#9BA9BB"': '"var(--color-text-body)"',
  '"#4B5768"': '"var(--color-text-muted)"',
  'rgba(6, 8, 12,': 'rgba(10, 10, 10,',
  '"DM Serif Display", Georgia, serif': 'var(--font-serif)',
  '"Inter", sans-serif': 'var(--font-sans)',
  '"JetBrains Mono", monospace': 'var(--font-mono)'
};

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const srcPath = path.join(__dirname, 'src');

walkDir(srcPath, (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;
    
    for (const [key, value] of Object.entries(replacements)) {
      // Create a global regex for each key, escaping special characters
      const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      if (regex.test(content)) {
        content = content.replace(regex, value);
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated ${filePath}`);
    }
  }
});

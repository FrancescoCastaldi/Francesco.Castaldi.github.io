const fs = require('fs');
const files = ['src/data/blog-posts.ts', 'src/data/projects.ts'];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  console.log('--- Checking ' + file + ' ---');
  
  // Check for mojibake
  const mojibakeMatch = content.match(/Ã[©¨]|â€™/g);
  if (mojibakeMatch) {
    console.log('Found mojibake:', new Set(mojibakeMatch));
  } else {
    console.log('No mojibake found.');
  }

  // Check for unclosed backticks
  const backticks = content.match(/```/g) || [];
  if (backticks.length % 2 !== 0) {
    console.log('WARNING: Odd number of ``` found (' + backticks.length + ')');
  } else {
    console.log('Backticks seem balanced.');
  }

  // Check for some common markdown artifacts
  if (content.includes('```markdown')) {
    console.log('Found ```markdown inside strings.');
  }
}

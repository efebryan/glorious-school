const { execSync } = require('child_process');

console.log('🔄 Auto-sync started. Checking for changes every 30 seconds...');

setInterval(() => {
  try {
    // Check if there are any changes
    const status = execSync('git status --porcelain').toString().trim();
    
    if (status) {
      console.log('Changes detected! Pushing to GitHub...');
      execSync('git add .');
      const timestamp = new Date().toLocaleString();
      execSync(`git commit -m "auto-commit: ${timestamp}"`);
      execSync('git push', { stdio: 'inherit' });
      console.log('✅ Push complete!');
    }
  } catch (err) {
    if (err.stdout) {
      console.log(err.stdout.toString());
    }
    // Ignore errors that might simply mean standard git warnings, etc.
  }
}, 30000); // 30 seconds

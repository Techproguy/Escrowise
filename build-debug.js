const { execSync } = require('child_process');

console.log('Starting build with debug logging...');
try {
  const output = execSync('next build --debug', { stdio: 'inherit' });
  console.log('Build completed successfully');
} catch (error) {
  console.error('Build failed with error:');
  console.error(error);
  process.exit(1);
}

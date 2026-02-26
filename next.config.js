const childProcess = require('child_process');
const packageJson = require('./package.json');

// function getGitHash() {
//   try {
//     return childProcess.execSync('git rev-parse HEAD').toString().trim();
//   } catch (error) {
//     console.error('Error getting git hash:', error);
//     throw error;
//   }
// }

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_BUILD_TIME: Date.now().toString(),
    APP_VERSION: packageJson.version,
  },
};

module.exports = nextConfig;

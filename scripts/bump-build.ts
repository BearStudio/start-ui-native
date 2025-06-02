/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const buildConfigPath = path.resolve(__dirname, '../build.config.json');

if (!fs.existsSync(buildConfigPath)) {
  console.error('❌ build.config.json not found.');
  process.exit(1);
}

const config = require(buildConfigPath);
const currentBuildNumber = parseInt(config.buildNumber, 10);

let newBuildNumber;

if (args[0] && !isNaN(Number(args[0]))) {
  newBuildNumber = parseInt(args[0], 10);
} else {
  newBuildNumber = currentBuildNumber + 1;
  console.log(
    `ℹ️ No build number provided. Incrementing from ${currentBuildNumber} → ${newBuildNumber}`
  );
}

// Always save as a string
config.buildNumber = newBuildNumber.toString();

fs.writeFileSync(buildConfigPath, JSON.stringify(config, null, 2));
console.log(`✅ Build number set to "${config.buildNumber}"`);

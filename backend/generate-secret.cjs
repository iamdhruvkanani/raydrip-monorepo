const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function generateSecret() {
    return crypto.randomBytes(64).toString('hex');
}

const secret = generateSecret();
console.log('Generated JWT Secret:\n', secret);

// Save to .env file
const envPath = path.resolve(__dirname, '.env');

// Check if .env exists
let envContent = '';
if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8');
}

// Check if JWT_SECRET already present
if (/^JWT_SECRET=/m.test(envContent)) {
    envContent = envContent.replace(/^JWT_SECRET=.*$/m, `JWT_SECRET=${secret}`);
} else {
    if (envContent.length > 0 && !envContent.endsWith('\n')) {
        envContent += '\n';
    }
    envContent += `JWT_SECRET=${secret}\n`;
}

fs.writeFileSync(envPath, envContent, 'utf-8');
console.log(`JWT_SECRET saved to ${envPath}`);

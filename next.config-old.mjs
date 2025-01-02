import fs from 'fs';
import dotenv from 'dotenv';

// Log the current environment
// console.log('NEXT_PUBLIC_ENV:', process.env.NEXT_PUBLIC_ENV);

// Determine the environment
const env = process.env.NEXT_PUBLIC_ENV || 'local';
const envFile = `.env.${env}`;

// Clear the `NEXT_PUBLIC_` environment variables
for (const key in process.env) {
  if (key.startsWith('NEXT_PUBLIC_')) {
    delete process.env[key];
  }
}

// Load the correct `.env` file based on the environment
if (fs.existsSync(envFile)) {
  console.log(`Using environment file: ${envFile}`);
  dotenv.config({ path: envFile });
} else {
  console.error(`Environment file ${envFile} does not exist.`);
}

// Re-define the Next.js configuration object
const nextConfig = {
  env: {
    NEXT_PUBLIC_APP_BASE_URL_API_ADMIN_ROOT: process.env.NEXT_PUBLIC_APP_BASE_URL_API_ADMIN_ROOT,
    NEXT_PUBLIC_APP_BASE_URL_API_PUBLIC_ROOT: process.env.NEXT_PUBLIC_APP_BASE_URL_API_PUBLIC_ROOT,
    NEXT_PUBLIC_FIREBASE_STORE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_STORE_API_KEY,
    NEXT_PUBLIC_FIREBASE_STORE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_STORE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_STORE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_STORE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORE_STORAGE_BUBCKET: process.env.NEXT_PUBLIC_FIREBASE_STORE_STORAGE_BUBCKET,
    NEXT_PUBLIC_FIREBASE_STORE_MSG_SENDER: process.env.NEXT_PUBLIC_FIREBASE_STORE_MSG_SENDER,
    NEXT_PUBLIC_FIREBASE_STORE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_STORE_APP_ID,
  },
};

export default nextConfig;

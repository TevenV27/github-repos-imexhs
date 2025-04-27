const fs = require('fs');
const path = require('path');

// Asegura que la carpeta exista
const dir = './src/environments';
const envPath = path.join(dir, 'environment.prod.ts');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const file = `
export const environment = {
  production: true,
  firebase: {
    apiKey: "${process.env.NG_APP_FIREBASE_API_KEY}",
    authDomain: "${process.env.NG_APP_FIREBASE_AUTH_DOMAIN}",
    projectId: "${process.env.NG_APP_FIREBASE_PROJECT_ID}",
    storageBucket: "${process.env.NG_APP_FIREBASE_STORAGE_BUCKET}",
    messagingSenderId: "${process.env.NG_APP_FIREBASE_MESSAGING_SENDER_ID}",
    appId: "${process.env.NG_APP_FIREBASE_APP_ID}"
  }
};
`;

fs.writeFileSync(envPath, file);


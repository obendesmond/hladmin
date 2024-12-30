import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_STORE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_STORE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_STORE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORE_STORAGE_BUBCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_STORE_MSG_SENDER,
    appId: process.env.NEXT_PUBLIC_FIREBASE_STORE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

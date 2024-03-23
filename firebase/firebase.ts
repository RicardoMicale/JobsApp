// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'jobsapp-8144a.firebaseapp.com',
  projectId: 'jobsapp-8144a',
  storageBucket: 'jobsapp-8144a.appspot.com',
  messagingSenderId: '476953242375',
  appId: '1:476953242375:web:f1632785a0a42dc3f1b3a2',
  measurementId: 'G-4JWQ55LR1R',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: import.meta.env.API_KEY,
//   authDomain: import.meta.env.AUTH_DOMAIN,
//   projectId: import.meta.env.PROJECT_ID,
//   storageBucket: import.meta.env.STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
//   appId: import.meta.env.APP_ID,
//   measurementId: import.meta.env.MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyD-z7dSIkPeHkxRK6QSBqCiGHa5dp0M5FM",
  authDomain: "dineflow-8135b.firebaseapp.com",
  projectId: "dineflow-8135b",
  storageBucket: "dineflow-8135b.appspot.com",
  messagingSenderId: "936071356331",
  appId: "1:936071356331:web:9a1773150efb40d2eafcee",
  measurementId: "G-7CCZZ0S7MV"
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebase_app);
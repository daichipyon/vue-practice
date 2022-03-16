// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain:process.env.VUE_APP_AUTH_LOGIN,
  projectId:process.env.VUE_APP_PROJECT_ID,
  databaseURL: process.env.VUE_APP_DATABSDEURL,
  storageBucket:process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId:process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId:process.env.VUE_APP_APP_ID,
  measurementId:process.env.VUE_APP_EASUREMENT_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);
export default db;

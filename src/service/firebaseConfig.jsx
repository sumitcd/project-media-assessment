// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLQM-WTflEp70wlGTeyegzQMvfCBxkCRA",
  authDomain: "travelease-967d6.firebaseapp.com",
  projectId: "travelease-967d6",
  storageBucket: "travelease-967d6.appspot.com",
  messagingSenderId: "17453270848",
  appId: "1:17453270848:web:a1969ce45b4c61f09c1ca5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
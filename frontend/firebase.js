// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "foodyfy-f233c.firebaseapp.com",
  projectId: "foodyfy-f233c",
  storageBucket: "foodyfy-f233c.firebasestorage.app",
  messagingSenderId: "242208493689",
  appId: "1:242208493689:web:bb07194b78f6d15c66c4a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}

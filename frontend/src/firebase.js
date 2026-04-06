import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbsdcMyCLinymMjrp5EYAotqsQElhvnP0",
  authDomain: "dabs-40c16.firebaseapp.com",
  projectId: "dabs-40c16",
  storageBucket: "dabs-40c16.firebasestorage.app",
  messagingSenderId: "823419398543",
  appId: "1:823419398543:web:54a05b1d1f932b11a643fa",
  measurementId: "G-6EJZF5WXNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
export default app;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwPp1QybK472TJtF6qBu-E6SGElHUEB4Y",
  authDomain: "ondev-zombies-network.firebaseapp.com",
  databaseURL:
    "https://ondev-zombies-network-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ondev-zombies-network",
  storageBucket: "ondev-zombies-network.appspot.com",
  messagingSenderId: "650450269367",
  appId: "1:650450269367:web:929902a09f117049300932",
  measurementId: "G-2K2V29EFBK",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const database = getDatabase(app)
const auth = getAuth(app)

export default {
  app,
  analytics,
  database,
  auth,
}

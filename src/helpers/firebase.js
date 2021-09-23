// v9 compat packages are API compatible with v8 code
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
initializeApp({
  apiKey: "AIzaSyBrUHgfk7fNUItZuWczjng4Ud_LW-DK_8A",
  authDomain: "localhost",
  projectId: "zombie-bbfbe",
  storageBucket: "zombie-bbfbe.appspot.com",
  messagingSenderId: "325044354293",
  appId: "1:325044354293:web:8fa23045d646fa4b9699bc",
  measurementId: "G-34GD8TJNG1",
})
export default getFirestore()

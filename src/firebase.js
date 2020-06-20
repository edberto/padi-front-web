import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBKH6JmnVNsiVrtk0dcfgyWz8j2VW2cyP4",
    authDomain: "padi-bangkit.firebaseapp.com",
    databaseURL: "https://padi-bangkit.firebaseio.com",
    projectId: "padi-bangkit",
    storageBucket: "padi-bangkit.appspot.com",
    messagingSenderId: "342557084841",
    appId: "1:342557084841:web:f22ccd78a16b040cb3adb8",
    measurementId: "G-6MC250N2TX"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export { storage, firebase as default };
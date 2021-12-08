import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {

    apiKey: "AIzaSyDDTU5hgHhAPOJC_kLyu7ePuGzLGjFUHbk",

    authDomain: "the-token-investment.firebaseapp.com",

    projectId: "the-token-investment",

    storageBucket: "the-token-investment.appspot.com",

    messagingSenderId: "462098727681",

    appId: "1:462098727681:web:46fd6d967f3dfc512e5100",

    measurementId: "G-C6VBZG35B8"

  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
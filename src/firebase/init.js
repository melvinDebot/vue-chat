import firebase from 'firebase/app';
import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
var config = {
  apiKey: "AIzaSyB0fDEFvlX_qauO8J5qodnTDOuThW4C66w",
  authDomain: "vue-chat-a1484.firebaseapp.com",
  databaseURL: "https://vue-chat-a1484.firebaseio.com",
  projectId: "vue-chat-a1484",
  storageBucket: "vue-chat-a1484.appspot.com",
  messagingSenderId: "332772085611",
  appId: "1:332772085611:web:db4220f6cfe2591938c62e"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });
export default firebaseApp.firestore();
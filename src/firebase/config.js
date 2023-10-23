import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAaeUJ-5q-aqdJMxAc_4ykLIcjzYoigDw8",
  authDomain: "english-words-edf76.firebaseapp.com",
  projectId: "english-words-edf76",
  storageBucket: "english-words-edf76.appspot.com",
  messagingSenderId: "1057527388094",
  appId: "1:1057527388094:web:bdcc7ddb6d2f43a95a8bef"
};

// Initialize Firebase pociatocne nastavenie firebase (init)
firebase.initializeApp(firebaseConfig)

//pociatocne nastavenie sluzieb (services)
const projectFirestore = firebase.firestore()

export {projectFirestore}
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyASsbFkjGETgCwyV6N5Q2eGALLAMydrEMc",
  authDomain: "login-form-89122.firebaseapp.com",
  databaseURL: "https://login-form-89122.firebaseio.com",
  projectId: "login-form-89122",
  storageBucket: "login-form-89122.appspot.com",
  messagingSenderId: "26581276588",
  appId: "1:26581276588:web:fa2fc2f262399678d10c09"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// import './firebase';

const config = {
  apiKey: 'AIzaSyArbmBRG4-elnoN-TNMl8956TrSJmgNmrQ',
  authDomain: 'react-chat-app-8d34c.firebaseapp.com',
  projectId: 'react-chat-app-8d34c',
  storageBucket: 'react-chat-app-8d34c.appspot.com',
  messagingSenderId: '367673712417',
  appId: '1:367673712417:web:7998277113b5057ef3a860',
  measurementId: 'G-DJQ2XJ06Q5',
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();

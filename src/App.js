import React from 'react';
import firebase from "firebase/app";
import Providers from '@/Providers';
import Routing from '@/Routing';
import logger from "@firebase-logger/web";

logger.init(process.env.NODE_ENV === 'production');

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyB_kJ0U4kj7MOQZ1dU4CRcKCkkvh-gTAtk",
  authDomain: "start-ui-native.firebaseapp.com",
  databaseURL: "https://start-ui-native-default-rtdb.firebaseio.com",
  projectId: "start-ui-native",
  storageBucket: "start-ui-native.appspot.com",
  messagingSenderId: "469838741377",
  appId: "1:469838741377:web:663ea413796dd796593280"
};

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

const App = () => {
  return (
    <Providers>
      <Routing />
    </Providers>
  );
};

export default App;

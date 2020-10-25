import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Import Firebase as well as any extensions. In this case we're just adding on Firestore (our database)
import firebase from "firebase/app";
import "firebase/firestore";

// Initialize Firebase
const config = {
    "apiKey": "AIzaSyCPQrcn6LKESGwYDvcv2TyL69DBGkYGPzM",
    "authDomain": "ecomake-litter-detection.firebaseapp.com",
    "databaseURL": "https://ecomake-litter-detection.firebaseio.com",
    "projectId": "ecomake-litter-detection",
    "storageBucket": "ecomake-litter-detection.appspot.com",
    "messagingSenderId": "33879517927",
    "appId": "1:33879517927:web:ead9dd0ac58eb1678f5042",
    "measurementId": "G-2P7F8DTD3B"
};
firebase.initializeApp(config);

// This prevents a warning message for changes to firestore timestamp syntax in the console
// Firestore is still in Beta - in the future this won't be necessary
const firestore = firebase.firestore();
const settings = {};
firestore.settings(settings);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyCPBUsCCVJ5j_AAHmKyMHLAc0Tgu7gQaQc",
    authDomain: "medkitc.firebaseapp.com",
    databaseURL: "https://medkitc.firebaseio.com",
    projectId: "medkitc",
    storageBucket: "medkitc.appspot.com",
    messagingSenderId: "155055518569",
    appId: "1:155055518569:web:b607e06a4bb3276a7203f8",
    measurementId: "G-QFC77J5M9S"
  }

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
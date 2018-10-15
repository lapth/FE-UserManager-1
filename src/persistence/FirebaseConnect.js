import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBsTi0ssrvzNwlBcOzlUKq1s9PuPnUDno0",
    authDomain: "react-study-51a01.firebaseapp.com",
    databaseURL: "https://react-study-51a01.firebaseio.com",
    projectId: "react-study-51a01",
    storageBucket: "react-study-51a01.appspot.com",
    messagingSenderId: "868593375855"
};
firebase.initializeApp(config);

export const appDB = firebase.database().ref('root_node');
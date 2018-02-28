import * as firebase from "firebase";

const config = {apiKey: "AIzaSyB0si1iezjtjhKke33vJvg9QsKhdoEY-ps",
    authDomain: "checkmein-3b603.firebaseapp.com",
    databaseURL: "https://checkmein-3b603.firebaseio.com",
    projectId: "checkmein-3b603",
    storageBucket: "checkmein-3b603.appspot.com",
    messagingSenderId: "173482721628"};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
import firebase from "firebase"

var config = {
  apiKey: "AIzaSyBxpisHwc1jXZfL74TB6f6vT9ezJN4IoDI",
  authDomain: "timetablrca.firebaseapp.com",
  databaseURL: "https://timetablrca.firebaseio.com",
  projectId: "timetablrca",
  storageBucket: "timetablrca.appspot.com",
  messagingSenderId: "506044234497"
};

var fire = firebase.initializeApp(config);
export default fire;

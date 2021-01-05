import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// 	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// 	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// 	appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const firebaseConfig = {
	apiKey: "AIzaSyBub8Cdl47x93QwbiWTbdA2ewmWs9oJvAg",
	authDomain: "todo-list-2-c0d05.firebaseapp.com",
	projectId: "todo-list-2-c0d05",
	storageBucket: "todo-list-2-c0d05.appspot.com",
	messagingSenderId: "851238300268",
	appId: "1:851238300268:web:9026c84ebc9abcc68cc649",
};

firebase.initializeApp(firebaseConfig);
export default firebase;

import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
const Login = () => {
	const firebaseConfig = {
		apiKey: "AIzaSyBub8Cdl47x93QwbiWTbdA2ewmWs9oJvAg",
		authDomain: "todo-list-2-c0d05.firebaseapp.com",
		projectId: "todo-list-2-c0d05",
		storageBucket: "todo-list-2-c0d05.appspot.com",
		messagingSenderId: "851238300268",
		appId: "1:851238300268:web:9026c84ebc9abcc68cc649",
	};
	// Configure FirebaseUI.
	const uiConfig = {
		// Popup signin flow rather than redirect flow.
		signInFlow: "popup",
		// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
		signInSuccessUrl: "/signedIn",
		// We will display Google and Facebook as auth providers.
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		],
	};

	return (
		<div id="loginContainer">
			<StyledFirebaseAuth
				uiConfig={uiConfig}
				firebaseAuth={firebase.auth()}
			></StyledFirebaseAuth>
		</div>
	);
};

export default Login;

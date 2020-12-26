import { React, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBub8Cdl47x93QwbiWTbdA2ewmWs9oJvAg",
	authDomain: "todo-list-2-c0d05.firebaseapp.com",
	projectId: "todo-list-2-c0d05",
	storageBucket: "todo-list-2-c0d05.appspot.com",
	messagingSenderId: "851238300268",
	appId: "1:851238300268:web:9026c84ebc9abcc68cc649",
};

firebase.initializeApp(firebaseConfig);

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleChange = (e) => {
		if (e.target.type === "email") return setEmail(e.target.value);
		if (e.target.type === "password") return setPassword(e.target.value);
	};

	const loginWithEmail = (e) => {
		e.preventDefault();
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.catch((error) => {
				// Handle Errors here.
				let errorCode = error.code;
				let errorMessage = error.message;
				if (errorCode === "auth/wrong-password") {
					alert("Wrong password.");
				} else {
					alert(errorMessage);
				}
				console.log(error);
			});
	};
	const loginWithGoogle = (e) => {
		let provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider);
	};

	return (
		<form id="loginContainer">
			<h2>Login</h2>
			<label>
				Email:
				<input type="email" onChange={(e) => handleChange(e)}></input>
			</label>
			<label>
				Password:
				<input type="password" onChange={(e) => handleChange(e)}></input>
			</label>
			<button onClick={(e) => loginWithEmail(e)}>Login</button>
			<br></br>
			<p>or</p>
			<br></br>
			<button onClick={(e) => loginWithGoogle(e)}>Login with Google </button>
			<br></br>
			<p>Don't have an account?</p>
			<Link style={{ textDecoration: "none" }} to="/SignUp">
				<button>Sign Up</button>
			</Link>
		</form>
	);
};

export default Login;

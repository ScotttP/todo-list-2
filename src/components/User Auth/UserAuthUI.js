import { React, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
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

const UserAuthUI = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [login, setLogin] = useState(true);

	const toggleLoginAndSignupUI = () => {
		console.log("ottlge");
		setLogin((prevState) => {
			if (prevState === true) return false;
			else return true;
		});
	};

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

	const signUpWithEmail = (e) => {
		e.preventDefault();
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.catch(function (error) {
				// Handle Errors here.
				let errorCode = error.code;
				let errorMessage = error.message;
				if (errorCode == "auth/weak-password") {
					alert("The password is too weak.");
				} else {
					alert(errorMessage);
				}
				console.log(error);
			});
	};
	if (login === true) {
		return (
			<Login
				handleChange={(e) => handleChange(e)}
				loginWithEmail={(e) => loginWithEmail(e)}
				loginWithGoogle={(e) => loginWithGoogle(e)}
				toggleLoginAndSignupUI={() => {
					toggleLoginAndSignupUI();
				}}
			></Login>
		);
	} else {
		return (
			<SignUp
				handleChange={(e) => handleChange(e)}
				toggleLoginAndSignupUI={() => toggleLoginAndSignupUI()}
				signUpWithEmail={(e) => signUpWithEmail(e)}
			/>
		);
	}
};

export default UserAuthUI;

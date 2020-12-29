import { React, useState, useEffect } from "react";
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navigation/Navbar";
import Projects from "./components/Project/Projects";
import Todos from "./components/Todo/Todos";
import Login from "./components/User Auth/Login";
import SignUp from "./components/User Auth/SignUp";
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

const App = () => {
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [signUpEmail, setSignUpEmail] = useState("");
	const [signUpPassword, setSignUpPassword] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState("");

	const handleChange = (e) => {
		if (e.target.type === "email" && e.target.id === "loginEmailInput")
			return setLoginEmail(e.target.value);
		if (e.target.type === "password" && e.target.id === "loginPasswordInput")
			return setLoginPassword(e.target.value);
		if (e.target.type === "email" && e.target.id === "signUpEmailInput")
			return setSignUpEmail(e.target.value);
		if (e.target.type === "password" && e.target.id === "signUpPasswordInput")
			return setSignUpPassword(e.target.value);
	};

	const loginWithEmail = (e) => {
		e.preventDefault();
		firebase
			.auth()
			.signInWithEmailAndPassword(loginEmail, loginPassword)
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
	const signUpWithEmail = (e) => {
		e.preventDefault();
		firebase
			.auth()
			.createUserWithEmailAndPassword(signUpEmail, signUpPassword)
			.catch(function (error) {
				// Handle Errors here.
				let errorCode = error.code;
				let errorMessage = error.message;
				if (errorCode === "auth/weak-password") {
					alert("The password is too weak.");
				} else {
					alert(errorMessage);
				}
				console.log(error);
			});
	};
	const loginWithGoogle = (e) => {
		let provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider);

		setCurrentUser(firebase.auth().currentUser);
	};

	const signOut = () => {
		firebase.auth().signOut();
	};

	const authStateObserver = (user) => {
		if (user) {
			setCurrentUser(firebase.auth().currentUser);
		} else {
			setCurrentUser("");
		}

		console.log(firebase.auth().currentUser);
	};

	useEffect(() => {
		firebase.auth().onAuthStateChanged(authStateObserver);
	}, [currentUser]);

	return (
		<Router basename={process.env.PUBLIC_URL + "/"}>
			<Navbar
				isLoggedIn={isLoggedIn}
				currentUser={currentUser}
				signOut={signOut}
			></Navbar>

			<Switch>
				<Route
					exact
					path="/"
					render={() =>
						currentUser ? (
							<Redirect to="/Todos" />
						) : (
							<Login
								handleChange={(e) => handleChange(e)}
								loginWithEmail={(e) => loginWithEmail(e)}
								loginWithGoogle={(e) => loginWithGoogle(e)}
							/>
						)
					}
				/>

				<Route
					path="/Login"
					render={() =>
						currentUser ? (
							<Redirect to="/Todos" />
						) : (
							<Login
								handleChange={(e) => handleChange(e)}
								loginWithEmail={(e) => loginWithEmail(e)}
								loginWithGoogle={(e) => loginWithGoogle(e)}
							/>
						)
					}
				></Route>

				<Route
					path="/SignUp"
					render={() =>
						currentUser ? (
							<Redirect to="/Todos" />
						) : (
							<SignUp
								handleChange={(e) => handleChange(e)}
								signUpWithEmail={(e) => signUpWithEmail(e)}
								loginWithGoogle={(e) => loginWithGoogle(e)}
							/>
						)
					}
				></Route>

				<Route
					path="/Todos"
					render={() =>
						currentUser ? (
							<div id="projectsAndTodosDisplay">
								<Projects></Projects>
								<Todos></Todos>
							</div>
						) : (
							<div>Need to login or sign up to see this page.</div>
						)
					}
				></Route>
			</Switch>
		</Router>
	);
};

export default App;

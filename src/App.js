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
import firebase from "./firebaseConfig";

const App = () => {
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [signUpEmail, setSignUpEmail] = useState("");
	const [signUpPassword, setSignUpPassword] = useState("");
	const [currentUser, setCurrentUser] = useState("");
	const [errors, setErrors] = useState("");

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
				setErrors(error);
			});
		setCurrentUser(firebase.auth().currentUser);
		setErrors("");
	};
	const signUpWithEmail = (e) => {
		e.preventDefault();
		firebase
			.auth()
			.createUserWithEmailAndPassword(signUpEmail, signUpPassword)
			.catch((error) => {
				setErrors(error);
			});
		setCurrentUser(firebase.auth().currentUser);
		setErrors("");
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
	};

	useEffect(() => {
		firebase.auth().onAuthStateChanged(authStateObserver);
	});

	return (
		<Router basename={process.env.PUBLIC_URL + "/"}>
			<Navbar currentUser={currentUser} signOut={signOut}></Navbar>

			<Switch>
				<Route
					// once logged in, re route to the todos route, else keep on the login page
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
								errors={errors}
								resetErrors={() => setErrors("")}
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
								errors={errors}
								resetErrors={() => setErrors("")}
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
								errors={errors}
								resetErrors={() => setErrors("")}
							/>
						)
					}
				></Route>

				<Route
					path="/Todos"
					render={() =>
						currentUser ? (
							<div id="projectsAndTodosDisplay">
								{/* <Projects currentUser={currentUser}></Projects> */}
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

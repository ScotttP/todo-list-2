import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const Navbar = (props) => {
	const renderSignUpAndSignOutButton = () => {
		// firebase.auth().onAuthStateChanged((user) => {
		// 	console.log("firebase auth in navbar component");
		// 	console.log(props);
		// 	console.log(user);
		// });
		if (
			props.isLoggedIn &&
			props.currentUser !== null &&
			props.currentUser !== undefined
		)
			return (
				<div id="navbarLeft">
					<p>Welcome, {props.currentUser.displayName}</p>
					<a onClick={props.signOut}>Sign Out</a>
				</div>
			);
		else
			return (
				<div id="navbarLeft">
					<Link style={{ textDecoration: "none" }} to="/Login">
						Login
					</Link>

					<Link style={{ textDecoration: "none" }} to="/SignUp">
						SignUp
					</Link>
				</div>
			);
	};

	return (
		<header id="navbarContainer">
			<div id="navbarRight">
				<Link style={{ textDecoration: "none" }} to="/Todos">
					ToDo App
				</Link>
			</div>
			{renderSignUpAndSignOutButton()}
		</header>
	);
};

export default Navbar;

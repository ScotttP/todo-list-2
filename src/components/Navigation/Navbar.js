import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
	const renderSignUpAndSignOutButton = () => {
		if (props.currentUser === null)
			// this stops the app from crashing when there isnt a user signed in.
			return (
				<div id="navbarLeft">
					<Link
						onClick={props.resetErrors}
						style={{ textDecoration: "none" }}
						to="/Login"
					>
						Login
					</Link>

					<Link
						onClick={props.resetErrors}
						style={{ textDecoration: "none" }}
						to="/SignUp"
					>
						SignUp
					</Link>
				</div>
			);

		if (props.currentUser && props.currentUser.displayName !== null)
			return (
				<div id="navbarLeft">
					<p>Welcome, {props.currentUser.displayName}</p>
					<button onClick={props.signOut}>Sign Out</button>
				</div>
			);
		if (props.currentUser.displayName === null)
			return (
				<div id="navbarLeft">
					<p>Welcome, {props.currentUser.email}</p>
					<button onClick={props.signOut}>Sign Out</button>
				</div>
			);
		else
			return (
				<div id="navbarLeft">
					<Link
						onClick={props.resetErrors}
						style={{ textDecoration: "none" }}
						to="/Login"
					>
						Login
					</Link>

					<Link
						onClick={props.resetErrors}
						style={{ textDecoration: "none" }}
						to="/SignUp"
					>
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

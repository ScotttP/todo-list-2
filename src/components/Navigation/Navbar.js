import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const renderSignUpAndSignOutButton = () => {
		// if user is logged in, show only sign out. else show the login and sign up tabs
	};
	return (
		<header id="navbarContainer">
			<div id="navbarRight">
				<Link style={{ textDecoration: "none" }} to="/Todos">
					ToDo App
				</Link>
			</div>
			<div id="navbarLeft">
				<Link style={{ textDecoration: "none" }} to="/Login">
					Login
				</Link>
				{/* need to add logic here for login / logout */}
				<Link style={{ textDecoration: "none" }} to="/SignUp">
					SignUp
				</Link>
			</div>
		</header>
	);
};

export default Navbar;

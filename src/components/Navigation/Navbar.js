import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<header id="navbarContainer">
			<div id="navbarRight">
				<Link to="">ToDo App</Link>
			</div>
			<div id="navbarLeft">
				<Link to="/Login">Login</Link>
				{/* need to add logic here for login / logout */}
				<Link to="/SignUp">SignUp</Link>
			</div>
		</header>
	);
};

export default Navbar;

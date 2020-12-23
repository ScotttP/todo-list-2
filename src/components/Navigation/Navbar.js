import React from "react";
import SignUp from "./SignUp";
import Login from "./Login";

const Navbar = () => {
	return (
		<div id="navbarContainer">
			<Login></Login>
			<SignUp></SignUp>
		</div>
	);
};

export default Navbar;

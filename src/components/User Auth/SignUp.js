import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
	return (
		<form id="signUpContainer">
			<h2>Sign Up</h2>
			<label>
				First Name:
				<input type="text"></input>
			</label>
			<label>
				Last Name:
				<input type="email"></input>
			</label>
			<label>
				Email:
				<input type="email"></input>
			</label>
			<label>
				Password:
				<input type="password"></input>
			</label>
			<button>Sign Up</button>
			<br></br>
			<p>or</p>
			<br></br>
			<button>Sign up with Google </button>
			<br></br>
			<p>Already have an account?</p>
			<Link style={{ textDecoration: "none" }} to="/">
				<button>Login</button>
			</Link>
		</form>
	);
};

export default SignUp;

import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
	return (
		<form id="loginContainer">
			<h2>Login</h2>
			<label>
				Email:
				<input type="email"></input>
			</label>
			<label>
				Password:
				<input type="password"></input>
			</label>
			<button>Login</button>
			<br></br>
			<p>or</p>
			<br></br>
			<button>Login with Google </button>
			<br></br>
			<p>Don't have an account?</p>
			<Link style={{ textDecoration: "none" }} to="/SignUp">
				<button>Sign Up</button>
			</Link>
		</form>
	);
};

export default Login;

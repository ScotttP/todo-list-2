import React from "react";
import { Link } from "react-router-dom";

const SignUp = (props) => {
	return (
		<form id="signUpAndLoginContainer">
			<h2>Sign Up</h2>
			<label>
				Email:
				<input type="email" onChange={(e) => props.handleChange(e)}></input>
			</label>
			<label>
				Password:
				<input type="password" onChange={(e) => props.handleChange(e)}></input>
			</label>
			<button onClick={(e) => props.loginWithEmail}>Sign Up</button>
			<br></br>
			<p>or</p>
			<br></br>
			<button onClick={(e) => props.loginWithGoogle(e)}>
				Sign Up with Google{" "}
			</button>
			<br></br>
			<p>Already have an account?</p>
			<Link style={{ textDecoration: "none" }} to="/Login">
				<button onClick={props.toggleLoginAndSignupUI()}>Login</button>
			</Link>
		</form>
	);
};

export default SignUp;

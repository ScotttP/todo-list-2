import { React } from "react";
import { Link } from "react-router-dom";

const SignUp = (props) => {
	return (
		<form id="signUpAndLoginContainer">
			<h2>Sign Up</h2>
			<label>
				Email:
				<input
					id="signUpEmailInput"
					type="email"
					onChange={(e) => props.handleChange(e)}
				></input>
			</label>
			<label>
				Password:
				<input
					id="signUpPasswordInput"
					type="password"
					onChange={(e) => props.handleChange(e)}
				></input>
			</label>
			<button onClick={(e) => props.signUpWithEmail(e)}>Sign Up</button>
			<br></br>
			<p>or</p>
			<br></br>
			<button onClick={(e) => props.loginWithGoogle(e)}>
				Sign Up with Google{" "}
			</button>
			<br></br>
			<p>Already have an account?</p>
			<Link style={{ textDecoration: "none" }} to="/Login">
				<button>Login</button>
			</Link>
		</form>
	);
};

export default SignUp;

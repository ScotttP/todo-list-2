import { React } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
	return (
		<form id="signUpAndLoginContainer">
			<h2>Login</h2>
			<label>
				Email:
				<input type="email" onChange={(e) => props.handleChange(e)}></input>
			</label>
			<label>
				Password:
				<input type="password" onChange={(e) => props.handleChange(e)}></input>
			</label>
			<button onClick={(e) => props.loginWithEmail(e)}>Login</button>
			<br></br>
			<p>or</p>
			<br></br>
			<button onClick={(e) => props.loginWithGoogle(e)}>
				Login with Google{" "}
			</button>
			<br></br>
			<p>Don't have an account?</p>
			<Link style={{ textDecoration: "none" }} to="/SignUp">
				<button onClick={props.toggleLoginAndSignupUI()}>Sign Up</button>
			</Link>
		</form>
	);
};

export default Login;

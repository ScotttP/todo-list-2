import { React, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleChange = (e) => {
		if (e.target.type === "email") return setEmail(e.target.value);
		if (e.target.type === "password") return setPassword(e.target.value);
	};

	const signUpWithEmail = (e) => {
		e.preventDefault();
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.catch(function (error) {
				// Handle Errors here.
				let errorCode = error.code;
				let errorMessage = error.message;
				if (errorCode == "auth/weak-password") {
					alert("The password is too weak.");
				} else {
					alert(errorMessage);
				}
				console.log(error);
			});
	};
	return (
		<form id="signUpContainer">
			<h2>Sign Up</h2>

			<label>
				Email:
				<input type="email" onChange={(e) => handleChange(e)}></input>
			</label>
			<label>
				Password:
				<input type="password" onChange={(e) => handleChange(e)}></input>
			</label>
			<button onClick={signUpWithEmail}>Sign Up</button>
			<br></br>
			<p>or</p>
			<br></br>
			<button>Sign up with Google </button>
			<br></br>
			<p>Already have an account?</p>
			<Link style={{ textDecoration: "none" }} to="/Login">
				<button>Login</button>
			</Link>
		</form>
	);
};

export default SignUp;

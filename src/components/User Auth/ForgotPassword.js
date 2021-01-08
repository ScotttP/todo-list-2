import { React, useState } from "react";
import firebase from "../../firebaseConfig";
import Error from "../Error";
const firebaseAuth = firebase.auth();

const ForgotPassword = (props) => {
	const [emailAddress, setEmailAddress] = useState("");
	const [error, setError] = useState("");

	const forgotPassword = () => {
		firebaseAuth
			.sendPasswordResetEmail(emailAddress)
			.then()
			.catch((error) => {
				setError(error);
			});
	};
	return (
		<form id="signUpAndLoginContainer">
			<h2>Forgot Password?</h2>
			<label>
				Email:
				<input
					id="signUpEmailInput"
					type="email"
					onChange={(e) => setEmailAddress(e.target.value)}
				></input>
			</label>
			<Error errors={error} />
			<button onClick={() => forgotPassword()}>Send</button>
		</form>
	);
};

export default ForgotPassword;

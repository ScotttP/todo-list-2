import { React } from "react";

const Error = (props) => {
	if (
		props.errors === "" ||
		props.errors === undefined ||
		props.errors === null
	)
		return null;
	if (props.errors.code === "auth/user-not-found") {
		return (
			<div>
				<p>Sorry, we couldn't find this email. </p>
				<p>Please enter another email address or sign up.</p>
			</div>
		);
	}
	if (props.errors.code === "auth/wrong-password") {
		return (
			<div>
				<p>Your password doesn't match our records.</p>
				<p>Please Try Again.</p>
			</div>
		);
	}
	if (props.errors.code === "auth/email-already-in-use") {
		return (
			<div>
				<p>This email is already registered.</p>
				<p>Please login or sign up with a new email.</p>
			</div>
		);
	} else
		return (
			<div>
				<p>Looks like there was an error. Please try again.</p>
			</div>
		);
};

export default Error;

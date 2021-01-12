import { React } from "react";

import styled from "styled-components";

const ErrorDiv = styled.div`
	text-align: center;
	border-radius: 5px;
	width: 20vw;
	min-width: 231px;
	background-color: #ffcccc;
	color: #272626;
	border: 2px solid #5f1111;
`;

const Error = (props) => {
	if (
		props.errors === "" ||
		props.errors === undefined ||
		props.errors === null
	)
		return null;
	if (props.errors.code === "auth/user-not-found") {
		return (
			<ErrorDiv>
				<p>Sorry, we couldn't find this email. </p>
				<p>Please enter another email address or sign up.</p>
			</ErrorDiv>
		);
	}
	if (props.errors.code === "auth/wrong-password") {
		return (
			<ErrorDiv>
				<p>Your password doesn't match with that email.</p>
				<p>Please Try Again.</p>
			</ErrorDiv>
		);
	}
	if (props.errors.code === "auth/email-already-in-use") {
		return (
			<ErrorDiv>
				<p>This email is already registered.</p>
				<p>Please login or sign up with a new email.</p>
			</ErrorDiv>
		);
	} else
		return (
			<ErrorDiv>
				<p>Looks like there was an error. Please try again.</p>
			</ErrorDiv>
		);
};

export default Error;

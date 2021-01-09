import { React, useState } from "react";
import firebase from "../../firebaseConfig";
import Error from "../Error";
import styled from "styled-components";
const firebaseAuth = firebase.auth();

const FormDiv = styled.div`
	height: 90vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const SignUpAndLoginContainer = styled.form`
	background-color: #272626;
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	align-items: center;
	width: 25vw;
	height: 30vh;
	min-width: 290px;
	min-height: 250px;
	max-height: 550px;
	box-shadow: 0px 1px 20px 1px rgb(40, 40, 40);
`;

const FormContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
	width: 20vw;
	height: 100%;
	min-width: 240px;
	max-height: 550px;
`;

const ForgotPasswordHeader = styled.h1`
	margin: 5%;
	text-align: center;
`;

const FormLabels = styled.label`
	width: 20vw;
	min-width: 231px;
	margin: 5%;
	font-size: 13px;
`;

const FormInputs = styled.input`
	width: 100%;
	height: 2rem;
	margin-top: 10px;
	padding: 2%;
	border: none;
	border-radius: 5px;
`;

const SendButton = styled.button`
	&:hover {
		cursor: pointer;
		background-color: #272626;
		color: #1da930;
	}
	width: 100%;
	height: 2rem;
	border: none;
	border-radius: 5px;
	background-color: #1da930;
	color: #fff;

	border: 1px #1da930 solid;
	transition: 0.3s;
`;

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
		<FormDiv>
			<SignUpAndLoginContainer>
				<FormContent>
					<ForgotPasswordHeader>Forgot Password?</ForgotPasswordHeader>
					<FormLabels>
						<FormInputs
							type="email"
							placeholder="Enter Your Email..."
							onChange={(e) => setEmailAddress(e.target.value)}
						></FormInputs>
					</FormLabels>
					<Error errors={error} />
					<SendButton onClick={() => forgotPassword()}>Send</SendButton>
				</FormContent>
			</SignUpAndLoginContainer>
		</FormDiv>
	);
};

export default ForgotPassword;

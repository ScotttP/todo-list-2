import { React } from "react";
import { Link } from "react-router-dom";
import Error from "../Error";
import styled from "styled-components";

const FormContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
	width: 20vw;
	height: 100%;
`;

const LoginHeader = styled.h1`
	margin: 5%;
`;

const FormLabels = styled.label`
	width: 20vw;
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

const PasswordTextDiv = styled.div`
	display: flex;
	justify-content: space-between;
`;

const LoginButton = styled.button`
	width: 100%;
	height: 2rem;
	border: none;
	border-radius: 5px;
	background-color: #1db954;
	color: #fff;
`;

const GoogleButton = styled.button`
	width: 100%;
	height: 2rem;
	border: none;
	border-radius: 5px;
`;

const SignUpButton = styled.button`
	width: 100%;
	height: 2rem;
	border: none;
	border-radius: 5px;
`;

const Login = (props) => {
	return (
		<div id="formDiv">
			<form id="signUpAndLoginContainer">
				<FormContent>
					<LoginHeader>Login</LoginHeader>
					<FormLabels>
						Email
						<br></br>
						<FormInputs
							id="loginEmailInput"
							type="email"
							onChange={(e) => props.handleChange(e)}
						></FormInputs>
					</FormLabels>
					<FormLabels>
						<PasswordTextDiv>
							Password
							<Link
								style={{ textDecoration: "none", color: "#1DB954" }}
								to="/ForgotPassword"
							>
								Forgot Your Password?
							</Link>
						</PasswordTextDiv>

						<FormInputs
							id="loginPasswordInput"
							type="password"
							onChange={(e) => props.handleChange(e)}
						></FormInputs>
					</FormLabels>

					<br></br>
					<Error errors={props.errors} />
					<LoginButton onClick={(e) => props.loginWithEmail(e)}>
						Login
					</LoginButton>
					<br></br>
					<p>or sign in with</p>
					<br></br>
					<GoogleButton onClick={(e) => props.loginWithGoogle(e)}>
						Google
					</GoogleButton>
					<br></br>
					<p>Don't have an account?</p>
					<Link style={{ textDecoration: "none" }} to="/SignUp">
						<SignUpButton onClick={props.resetErrors}>Sign Up</SignUpButton>
					</Link>
				</FormContent>
			</form>
		</div>
	);
};

export default Login;

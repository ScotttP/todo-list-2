import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBarContainer = styled.header`
	background-color: #1f1f1f;
	height: 7vh;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const NavBarRight = styled.div`
	& > a {
		color: #1db954;
		text-decoration: none;
		margin: 5px;
	}

	&:hover {
		cursor: pointer;
	}
	font-size: 1.7rem;
	margin-left: 5px;
`;

const UserGreeting = styled.p`
	width: 175px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const NavBarLeft = styled.div`
	& > a {
		color: #1db954;
		text-decoration: none;
		margin: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 80px;
		padding: 5px;
		transition: 0.2s;
	}
	& > a:hover {
		cursor: pointer;
		background-color: #2f2f2f;
		border-bottom: 3px solid #1db954;
	}

	& > a > b {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	margin-right: 15px;
`;

const Navbar = (props) => {
	const renderSignUpAndSignOutButton = () => {
		if (props.currentUser === null)
			// this stops the app from crashing when there isnt a user signed in.
			return (
				<NavBarLeft>
					<Link onClick={props.resetErrors} to="/Login">
						<b>Login</b>
					</Link>

					<Link onClick={props.resetErrors} to="/SignUp">
						<b>Sign Up</b>
					</Link>
				</NavBarLeft>
			);

		if (props.currentUser && props.currentUser.displayName !== null)
			return (
				<NavBarLeft>
					<UserGreeting> Welcome, {props.currentUser.displayName}</UserGreeting>
					<Link to="/Login">
						<b onClick={props.signOut}>Sign Out</b>
					</Link>
				</NavBarLeft>
			);
		if (props.currentUser.displayName === null)
			return (
				<NavBarLeft>
					<UserGreeting> Welcome, {props.currentUser.email}</UserGreeting>
					<Link to="/Login">
						<b onClick={props.signOut}>Sign Out</b>
					</Link>
				</NavBarLeft>
			);
		else
			return (
				<NavBarLeft>
					<Link onClick={props.resetErrors} to="/Login">
						<b>Login</b>
					</Link>

					<Link onClick={props.resetErrors} to="/SignUp">
						<b>Sign Up</b>
					</Link>
				</NavBarLeft>
			);
	};

	return (
		<NavBarContainer>
			<NavBarRight>
				<Link to="/Todos">
					<b>ToDo App</b>
				</Link>
			</NavBarRight>
			{renderSignUpAndSignOutButton()}
		</NavBarContainer>
	);
};

export default Navbar;

import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navigation/Navbar";
import Projects from "./components/Project/Projects";
import Todos from "./components/Todo/Todos";
import Login from "./components/User Auth/Login";
import SignUp from "./components/User Auth/SignUp";

const App = () => {
	return (
		<Router basename={process.env.PUBLIC_URL + "/"}>
			<Navbar></Navbar>

			<Switch>
				<Route exact path="/" component={Login} />

				<Route exact path="/SignUp" component={SignUp}></Route>

				<Route exact path="/Todos">
					<div id="projectsAndTodosDisplay">
						<Projects></Projects>
						<Todos></Todos>
					</div>
				</Route>
			</Switch>
		</Router>
	);
};

export default App;

import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navigation/Navbar";
import Projects from "./components/Project/Projects";
import Todos from "./components/Todo/Todos";
import Login from "./components/User Auth/Login";
import UserAuthUI from "./components/User Auth/UserAuthUI";

const App = () => {
	return (
		<Router basename={process.env.PUBLIC_URL + "/"}>
			<Navbar></Navbar>

			<Switch>
				<Route path="/Login" component={UserAuthUI} />

				<Route path="/SignUp" component={UserAuthUI}></Route>

				<Route path="/Todos">
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

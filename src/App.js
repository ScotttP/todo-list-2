import React from "react";
import "./App.css";
import Navbar from "./components/Navigation/Navbar";
import Projects from "./components/Project/Projects";
import Tasks from "./components/Task/Tasks";

const App = () => {
	return (
		<div id="appContainer">
			<Navbar></Navbar>
			<Projects></Projects>
			<Tasks></Tasks>
		</div>
	);
};

export default App;

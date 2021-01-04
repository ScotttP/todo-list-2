import { React, useState } from "react";
import TodoCardDisplay from "./TodoCardDisplay";
import TodoCardForm from "./TodoCardForm";

const Todos = () => {
	const [formViewDisplay, setformViewDisplay] = useState("none");

	// const toggleExtendedViewDisplay = () => {
	// 	setExtendedViewDisplay((prevState) => {
	// 		if (prevState === "none") return "flex";
	// 		else return "none";
	// 	});
	// };
	return (
		<main id="todosContainer">
			<div id="todosHeader">
				<h2>To-Do Items</h2>
				<button onClick={() => setformViewDisplay("flex")}>Add New Todo</button>
			</div>

			<div id="todoListTable">
				<TodoCardForm
					display={formViewDisplay}
					hideForm={() => setformViewDisplay("none")}
				/>
				<TodoCardDisplay></TodoCardDisplay>
			</div>
		</main>
	);
};

export default Todos;

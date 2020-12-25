import { React, useState } from "react";
import TodoCard from "./TodoCard";
import AddTodoWindow from "./AddTodoWindow";
import ExpandedViewTodoCard from "./ExpandedViewTodoCard";

const Todos = () => {
	const [extendedViewDisplay, setExtendedViewDisplay] = useState("none");

	const toggleExtendedViewDisplay = () => {
		setExtendedViewDisplay((prevState) => {
			if (prevState === "none") return "inline";
			else return "none";
		});
	};
	return (
		<main id="todosContainer">
			<h2>To-Do Items</h2>
			<button>+ Add Todo</button>
			<table id="todoListTable">
				<thead id="tableHeaders">
					<tr>
						<th>Completed</th>
						<th>Task Name</th>
						<th>Due Date</th>
						<th>Priority</th>
					</tr>
				</thead>
				<tbody>
					<TodoCard toggleExpandedView={toggleExtendedViewDisplay}></TodoCard>
					<ExpandedViewTodoCard
						view={extendedViewDisplay}
					></ExpandedViewTodoCard>
				</tbody>
			</table>

			{/* <AddTodoWindow></AddTodoWindow> */}
		</main>
	);
};

export default Todos;

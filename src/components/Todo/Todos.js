import React from "react";
import TodoCard from "./TodoCard";
import AddTodoWindow from "./AddTodoWindow";

const Todos = () => {
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
					<TodoCard></TodoCard>
				</tbody>
			</table>

			{/* <AddTodoWindow></AddTodoWindow> */}
		</main>
	);
};

export default Todos;

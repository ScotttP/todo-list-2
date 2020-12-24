import React from "react";
import TodoCard from "./TodoCard";
import AddTodoWindow from "./AddTodoWindow";

const Todos = () => {
	return (
		<div id="todosContainer">
			<TodoCard></TodoCard>
			<AddTodoWindow></AddTodoWindow>
		</div>
	);
};

export default Todos;

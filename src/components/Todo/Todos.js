import { React, useState } from "react";
import TodoCardDisplay from "./TodoCardDisplay";
import TodoCardForm from "./TodoCardForm";
import firebase from "../../firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
const firestore = firebase.firestore();

const Todos = (props) => {
	//console.log(props.firestore.collection("todos").orderBy(''));

	const todosRef = firestore.collection("todos");
	const todosQuery = todosRef.orderBy("name");
	const [formViewDisplay, setformViewDisplay] = useState("none");

	const [todos] = useCollectionData(todosQuery, { idField: "id" });

	const [todoName, setTodoName] = useState("");
	const [todoDescription, setTodoDescription] = useState("");
	const [todoDueDate, setTodoDueDate] = useState("");
	const [todoPriority, setTodoPriority] = useState("");

	const handleFormChange = (e) => {
		if (e.target.name === "todoName") return setTodoName(e.target.value);
		if (e.target.name === "todoDescription")
			return setTodoDescription(e.target.value);
		if (e.target.name === "todoDueDate") return setTodoDueDate(e.target.value);
		if (e.target.name === "todoPriority")
			return setTodoPriority(e.target.value);
	};

	const addTodo = async (e) => {
		e.preventDefault();

		await todosRef.add({
			name: todoName,
			description: todoDescription,
			dueDate: todoDueDate,
			priority: todoPriority,
		});
		setTodoName("");
		setTodoDescription("");
		setTodoDueDate("");
		setTodoPriority("");
	};
	console.log(todos);
	console.log(todosQuery);
	return (
		<main id="todosContainer">
			<div id="todosHeader">
				<h2>To-Do Items</h2>
				<button onClick={() => setformViewDisplay("flex")}>Add New Todo</button>
			</div>

			<div id="todoListTable">
				<TodoCardForm
					display={formViewDisplay}
					hideForm={(e) => {
						e.preventDefault();
						setformViewDisplay("none");
					}}
					handleFormChange={(e) => handleFormChange(e)}
					addTodo={(e) => addTodo(e)}
					todoName={todoName}
					todoDescription={todoDescription}
					todoDueDate={todoDueDate}
					todoPriority={todoPriority}
				/>
				{todos.map((todo) => (
					<TodoCardDisplay key={todos.id} todo={todo} />
				))}
			</div>
		</main>
	);
};

export default Todos;

import { React, useState } from "react";
import TodoCardFormAndDisplay from "./TodoCardFormAndDisplay";
import NewTodoCardForm from "./NewTodoCardForm";
import firebase from "../../firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
const firestore = firebase.firestore();

const Todos = () => {
	const todosRef = firestore.collection("todos");
	const todosQuery = todosRef.orderBy("name");
	const [formViewDisplay, setformViewDisplay] = useState("none");

	const [todos] = useCollectionData(todosQuery, { idField: "id" });

	const [newTodo, setNewTodo] = useState({
		todo: {
			name: "",
			description: "",
			dueDate: "",
			priority: "Low",
			completed: false,
		},
	});

	const handleNewTodo = (e) => {
		setNewTodo((prevState) => ({
			todo: { ...prevState.todo, [e.target.name]: e.target.value },
		}));
	};

	const addTodo = async (e) => {
		e.preventDefault();

		await todosRef.add({
			name: newTodo.todo.name,
			description: newTodo.todo.description,
			dueDate: newTodo.todo.dueDate,
			priority: newTodo.todo.priority,
			completed: newTodo.todo.completed,
		});

		setNewTodo({
			todo: {
				name: "",
				description: "",
				dueDate: "",
				priority: "Low",
				completed: false,
			},
		});
	};

	return (
		<main id="todosContainer">
			<div id="todosHeader">
				<h2>To-Do Items</h2>
				<button onClick={() => setformViewDisplay("flex")}>Add New Todo</button>
			</div>

			<div id="todoListTable">
				<NewTodoCardForm
					display={formViewDisplay}
					hideForm={(e) => {
						e.preventDefault();
						setformViewDisplay("none");
					}}
					handleNewTodo={(e) => handleNewTodo(e)}
					addTodo={(e) => addTodo(e)}
					newTodo={newTodo}
				/>
				{todos &&
					todos.map((todo) => (
						<TodoCardFormAndDisplay key={todos.id} todo={todo} />
					))}
			</div>
		</main>
	);
};

export default Todos;

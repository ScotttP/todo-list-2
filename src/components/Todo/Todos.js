import { React, useState } from "react";
import TodoCardDisplay from "./TodoCardDisplay";
import NewTodoCardForm from "./NewTodoCardForm";
import firebase from "../../firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
const firestore = firebase.firestore();

const Todos = (props) => {
	const todosRef = firestore.collection("todos");
	const todosQuery = todosRef.orderBy("name");
	const [formViewDisplay, setformViewDisplay] = useState("none");

	const [todos] = useCollectionData(todosQuery, { idField: "id" });

	const [newTodo, setNewTodo] = useState({
		todo: {
			name: "",
			description: "",
			dueDate: "",
			priority: "",
			completed: false,
		},
	});

	const handleFormChange = (e) => {
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
				priority: "",
				completed: false,
			},
		});
	};

	const deleteTodo = (todo) => {
		todosRef
			.doc(`${todo.id}`)
			.delete()
			.catch((error) => console.log(error));
	};

	const updateTodo = (e) => {
		console.log("update todo");
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
					handleFormChange={(e) => handleFormChange(e)}
					addTodo={(e) => addTodo(e)}
					newTodo={newTodo}
				/>
				{todos &&
					todos.map((todo) => (
						<TodoCardDisplay
							key={todos.id}
							todo={todo}
							deleteTodo={() => deleteTodo(todo)}
							handleFormChange={(e) => handleFormChange(e)}
							addTodo={(e) => addTodo(e)}
							newTodo={newTodo}
							updateTodo={(e) => updateTodo(e)}
						/>
					))}
			</div>
		</main>
	);
};

export default Todos;

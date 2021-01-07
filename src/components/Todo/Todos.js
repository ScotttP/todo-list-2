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
			priority: "",
			completed: false,
		},
	});

	const [currentTodo, setCurrentTodo] = useState({
		todo: {
			name: "",
			description: "",
			dueDate: "",
			priority: "",
			completed: false,
		},
	});

	const handleNewTodo = (e) => {
		setNewTodo((prevState) =>
			// console.log(prevState)
			({
				todo: { ...prevState.todo, [e.target.name]: e.target.value },
			})
		);
	};

	const handleUpdateTodo = (e) => {
		setCurrentTodo((prevState) => ({
			todo: { ...prevState.todo, [e.target.name]: e.target.value },
		}));
	};

	const setAsCurrentTodo = (
		name,
		description,
		dueDate,
		priority,
		completed
	) => {
		// setAsCurrentTodo({
		// 	todo: {
		// 		name: name,
		// 		description: "test",
		// 		dueDate: "12/23/2019",
		// 		priority: "Low",
		// 		completed: false,
		// 	},
		// });
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

	const updateTodo = (todo) => {
		console.log(currentTodo.todo.name);
		todosRef.doc(todo.id).update({
			name: currentTodo.todo.name,
			description: currentTodo.todo.description,
			dueDate: currentTodo.todo.dueDate,
			priority: currentTodo.todo.priority,
			completed: currentTodo.todo.completed,
		});
		setCurrentTodo({
			todo: {
				name: "",
				description: "",
				dueDate: "",
				priority: "",
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
						<TodoCardFormAndDisplay
							key={todos.id}
							todo={todo}
							currentTodo={currentTodo}
							newTodo={newTodo}
							deleteTodo={() => deleteTodo(todo)}
							handleUpdateTodo={(e) => handleUpdateTodo(e)}
							addTodo={(e) => addTodo(e)}
							updateTodo={(e) => updateTodo(e)}
							setAsCurrentTodo={() => setAsCurrentTodo()}
						/>
					))}
			</div>
		</main>
	);
};

export default Todos;

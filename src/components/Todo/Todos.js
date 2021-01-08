import { React, useState } from "react";
import TodoCardFormAndDisplay from "./TodoCardFormAndDisplay";
import NewTodoCardForm from "./NewTodoCardForm";
import firebase from "../../firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
const firestore = firebase.firestore();

const Todos = () => {
	const [filterData, setFilterData] = useState("dueDate");
	const [filterOrderBy, setFilterOrderBy] = useState("asc");
	const todosRef = firestore.collection("todos");
	const todosQuery = todosRef.orderBy(filterData, filterOrderBy);
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

	const handleFilter = (e) => {
		const optionSelected = e.target.value;
		if (optionSelected === "Due Soon") {
			setFilterData("dueDate");
			setFilterOrderBy("asc");
		}
		if (optionSelected === "Due Later") {
			setFilterData("dueDate");
			setFilterOrderBy("desc");
		}
		if (optionSelected === "Lowest Priority") {
			setFilterData("priority");
			setFilterOrderBy("asc");
		}
		if (optionSelected === "Highest Priority") {
			setFilterData("priority");
			setFilterOrderBy("desc");
		}
	};

	return (
		<main id="todosContainer">
			<div id="todosHeader">
				<h2>To-Do Items</h2>
				<button onClick={() => setformViewDisplay("flex")}>Add New Todo</button>
			</div>
			<div id="filterData">
				Filter By:
				<select onChange={(e) => handleFilter(e)}>
					<option>Due Soon</option>
					<option>Due Later</option>
					<option>Lowest Priority</option>
					<option>Highest Priority</option>
				</select>
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

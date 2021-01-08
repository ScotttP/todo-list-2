import { React, useState, useEffect } from "react";
import firebase from "../../firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
const firestore = firebase.firestore();
const todosRef = firestore.collection("todos");

const TodoCardFormAndDisplay = (props) => {
	const [extendedViewDisplay, setExtendedViewDisplay] = useState("none");
	const [editTodoMode, setEditTodoMode] = useState(false);

	const [todoName, setTodoName] = useState(props.todo.name);
	const [todoDescription, setTodoDescription] = useState(
		props.todo.description
	);
	const [todoDueDate, setTodoDueDate] = useState(props.todo.dueDate);
	const [todoPriority, setTodoPriority] = useState(props.todo.priority);
	const [todoPriorityValue, setTodoPriorityValue] = useState(
		props.todo.priorityValue
	);
	const [todoCompleted, setTodoCompleted] = useState(props.todo.completed);

	useEffect(() => {
		const updateTodo = async () => {
			await todosRef
				.doc(props.todo.id)
				.update({
					name: todoName,
					description: todoDescription,
					dueDate: todoDueDate,
					priority: todoPriority,
					priorityValue: todoPriorityValue,
					completed: todoCompleted,
				})
				.catch((error) => {
					console.log(error);
				});
		};

		updateTodo();
	}, [
		todoName,
		todoDescription,
		todoDueDate,
		todoPriority,
		todoPriorityValue,
		todoCompleted,
		props.todo.id,
	]);

	const deleteTodo = () => {
		todosRef
			.doc(`${props.todo.id}`)
			.delete()
			.catch((error) => console.log(error));
	};

	const toggleExtendedViewDisplay = () => {
		setExtendedViewDisplay((prevState) => {
			if (prevState === "none") return "flex";
			else return "none";
		});
	};

	const toggleEditMode = () => {
		setEditTodoMode((prevState) => {
			if (prevState === false) return true;
			else return false;
		});
	};

	const saveButtonWrapperFunction = () => {
		toggleEditMode();
		toggleExtendedViewDisplay();
	};

	const todoPriorityWrapperFunction = (e) => {
		setTodoPriority(e.target.value);
		if (e.target.value === "Low") {
			setTodoPriorityValue(1);
		}
		if (e.target.value === "Medium") {
			setTodoPriorityValue(2);
		}
		if (e.target.value === "High") {
			setTodoPriorityValue(3);
		}
	};

	if (editTodoMode) {
		return (
			<div className="todoCardContainer">
				<form
					className="todoCardFormDisplay"
					onSubmit={() => saveButtonWrapperFunction()}
				>
					<input
						type="checkbox"
						onClick={(e) => setTodoCompleted(e.target.checked)}
						defaultChecked={todoCompleted}
					></input>
					<input
						onChange={(e) => setTodoName(e.target.value)}
						name="name"
						type="text"
						placeholder="Enter your todo name..."
						value={todoName}
						required
					></input>

					<input
						onChange={(e) => setTodoDescription(e.target.value)}
						name="description"
						type="text"
						placeholder="Description..."
						value={todoDescription}
					></input>

					<input
						onChange={(e) => setTodoDueDate(e.target.value)}
						name="dueDate"
						type="date"
						value={todoDueDate}
						required
					></input>

					<select
						name="priority"
						onChange={(e) => todoPriorityWrapperFunction(e)}
						value={todoPriority}
						required
					>
						<option>Low</option>
						<option>Medium</option>
						<option>High</option>
					</select>
					<button type="submit">Save</button>
					<button onClick={toggleEditMode}>Cancel</button>
				</form>
			</div>
		);
	} else
		return (
			<div className="todoCardContainer">
				<div className="todoCardMainDisplay">
					<input
						type="checkbox"
						onClick={(e) => setTodoCompleted(e.target.checked)}
						defaultChecked={todoCompleted}
					></input>
					<button onClick={toggleExtendedViewDisplay}>expand</button>
					<p>{props.todo.name}</p>
					<p>{props.todo.dueDate}</p>
					<p>{props.todo.priority}</p>
					<button onClick={deleteTodo}>Delete</button>
				</div>

				<div
					className="todoCardExpandedViewDisplay "
					style={{ display: extendedViewDisplay }}
				>
					<p>{props.todo.description}</p>
					<div>
						<button onClick={toggleEditMode}>Edit</button>
					</div>
				</div>
			</div>
		);
};

export default TodoCardFormAndDisplay;

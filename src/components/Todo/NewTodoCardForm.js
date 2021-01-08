import { React, useState } from "react";
import firebase from "../../firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
const firestore = firebase.firestore();
const todosRef = firestore.collection("todos");

const NewTodoCardForm = (props) => {
	const [newTodoName, setNewTodoName] = useState("");
	const [newTodoDescription, setNewTodoDescription] = useState("");
	const [newTodoDueDate, setNewTodoDueDate] = useState("");
	const [newTodoPriority, setNewTodoPriority] = useState("Low");
	const [newTodoPriorityValue, setNewTodoPriorityValue] = useState(1);
	const newTodoCompleted = false;

	const addTodo = async (e) => {
		e.preventDefault();

		await todosRef.add({
			name: newTodoName,
			description: newTodoDescription,
			dueDate: newTodoDueDate,
			priority: newTodoPriority,
			priorityValue: newTodoPriorityValue,
			completed: newTodoCompleted,
		});
		setNewTodoName("");
		setNewTodoDescription("");
		setNewTodoDueDate("");
		setNewTodoPriority("Low");
		setNewTodoPriorityValue(1);
	};

	const onSubmitWrapperFunction = (e) => {
		addTodo(e);
		props.hideForm(e);
	};

	const onChangePriorityWrapperFunction = (e) => {
		setNewTodoPriority(e.target.value);
		if (e.target.value === "Low") {
			setNewTodoPriorityValue(1);
		}
		if (e.target.value === "Medium") {
			setNewTodoPriorityValue(2);
		}
		if (e.target.value === "High") {
			setNewTodoPriorityValue(3);
		}
	};

	return (
		<div className="todoCardContainer" style={{ display: props.display }}>
			<form
				className="todoCardFormDisplay"
				onSubmit={(e) => onSubmitWrapperFunction(e)}
			>
				<input
					onChange={(e) => setNewTodoName(e.target.value)}
					name="name"
					type="text"
					placeholder="Enter your todo name..."
					value={newTodoName}
					required
				></input>

				<input
					onChange={(e) => setNewTodoDescription(e.target.value)}
					name="description"
					type="text"
					placeholder="Description..."
					value={newTodoDescription}
				></input>

				<input
					onChange={(e) => setNewTodoDueDate(e.target.value)}
					name="dueDate"
					type="date"
					value={newTodoDueDate}
					required
				></input>

				<select
					name="priority"
					onChange={(e) => onChangePriorityWrapperFunction(e)}
					value={newTodoPriority}
					required
				>
					<option>Low</option>
					<option>Medium</option>
					<option>High</option>
				</select>
				<button type="submit">Save</button>
				<button onClick={(e) => props.hideForm(e)}>Cancel</button>
			</form>
		</div>
	);
};

export default NewTodoCardForm;

import { React, useState } from "react";
import firebase from "../../firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const firestore = firebase.firestore();
const todosRef = firestore.collection("todos");

const TodoCardContainer = styled.div`
	display: ${(props) => (props.display === "flex" ? "flex" : "none")};
	flex-direction: column;

	width: 80%;
	height: fit-content;
	padding: 2% 5% 2% 5%;
	margin: 2%;
	background-color: #383636;
`;

const TodoCardFormDisplay = styled.form`
	display: flex;
	justify-content: space-between;
	width: 100%;

	& > select {
		border-radius: 5px;
		background-color: #fff;
		color: #272626;
		border: 1px #272626 solid;
	}
	& > select:hover {
		cursor: pointer;
	}
`;

const FormInputs = styled.input`
	width: 20%;
	height: 1.5rem;
	padding: 5px;

	border-radius: 5px;
	background-color: #fff;
	color: #272626;
	border: 1px #272626 solid;
`;

const SubmitAndCancelNewTodoButton = styled.button`
	background-color: transparent;
	border: none;
	font-size: 20px;

	&:hover {
		cursor: pointer;
	}
`;

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
		<TodoCardContainer display={props.display}>
			<TodoCardFormDisplay onSubmit={(e) => onSubmitWrapperFunction(e)}>
				<FormInputs
					onChange={(e) => setNewTodoName(e.target.value)}
					name="name"
					type="text"
					placeholder="Enter your todo name..."
					value={newTodoName}
					required
				></FormInputs>

				<FormInputs
					onChange={(e) => setNewTodoDescription(e.target.value)}
					name="description"
					type="text"
					placeholder="Description..."
					value={newTodoDescription}
				></FormInputs>

				<FormInputs
					onChange={(e) => setNewTodoDueDate(e.target.value)}
					name="dueDate"
					type="date"
					value={newTodoDueDate}
					required
				></FormInputs>

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
				<SubmitAndCancelNewTodoButton type="submit">
					<FontAwesomeIcon
						className="fontAwesomeSaveIcon"
						icon={faCheck}
					></FontAwesomeIcon>
				</SubmitAndCancelNewTodoButton>
				<SubmitAndCancelNewTodoButton onClick={(e) => props.hideForm(e)}>
					<FontAwesomeIcon
						className="fontAwesomeCancelIcon"
						icon={faTimes}
					></FontAwesomeIcon>
				</SubmitAndCancelNewTodoButton>
			</TodoCardFormDisplay>
		</TodoCardContainer>
	);
};

export default NewTodoCardForm;

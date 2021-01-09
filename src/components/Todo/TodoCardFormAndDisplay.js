import { React, useState, useEffect } from "react";
import firebase from "../../firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const firestore = firebase.firestore();
const todosRef = firestore.collection("todos");

const TodoCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	box-shadow: 0px 1px 20px 1px rgb(43, 43, 43);
	width: 80%;
	height: fit-content;
	padding: 2% 5% 2% 5%;
	margin: 2%;
	background-color: #383636;
`;

const TodoCardMainDisplay = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	& > p {
		width: 20%;
		text-align: center;
	}

	& > div {
		width: 10%;
	}
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

const TodoCardExpandedViewDisplay = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 15px;
`;

const CheckboxDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
`;

const DropDownIconButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	background-color: transparent;
	border: none;
	font-size: 20px;
	color: #fff;
	&:hover {
		cursor: pointer;
	}
	outline: none;
	transform: rotate(0deg);
	transition: all 0.2s ease-out;
	transform: ${(props) => (props.display === "flex" ? `rotate(180deg)` : "")};
`;

const DeleteButton = styled.button`
	background-color: transparent;
	border: none;
	font-size: 15px;
	color: #fff;
	transition: 0.3;
	&:hover {
		cursor: pointer;
		color: #ca1616;
	}
`;

const EditButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	background-color: transparent;
	border: none;
	font-size: 15px;
	color: #fff;
	transition: 0.3;
	&:hover {
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
			<TodoCardContainer>
				<TodoCardFormDisplay onSubmit={() => saveButtonWrapperFunction()}>
					<FormInputs
						onChange={(e) => setTodoName(e.target.value)}
						name="name"
						type="text"
						placeholder="Enter your todo name..."
						value={todoName}
						required
					></FormInputs>

					<FormInputs
						onChange={(e) => setTodoDescription(e.target.value)}
						name="description"
						type="text"
						placeholder="Description..."
						value={todoDescription}
					></FormInputs>

					<FormInputs
						onChange={(e) => setTodoDueDate(e.target.value)}
						name="dueDate"
						type="date"
						value={todoDueDate}
						required
					></FormInputs>

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
					<SubmitAndCancelNewTodoButton type="submit">
						<FontAwesomeIcon
							className="fontAwesomeSaveIcon"
							icon={faCheck}
						></FontAwesomeIcon>
					</SubmitAndCancelNewTodoButton>
					<SubmitAndCancelNewTodoButton onClick={toggleEditMode}>
						<FontAwesomeIcon
							className="fontAwesomeCancelIcon"
							icon={faTimes}
						></FontAwesomeIcon>
					</SubmitAndCancelNewTodoButton>
				</TodoCardFormDisplay>
			</TodoCardContainer>
		);
	} else
		return (
			<TodoCardContainer>
				<TodoCardMainDisplay>
					<CheckboxDiv>
						<input
							type="checkbox"
							onClick={(e) => setTodoCompleted(e.target.checked)}
							defaultChecked={todoCompleted}
						></input>
					</CheckboxDiv>

					<DropDownIconButton
						display={extendedViewDisplay}
						onClick={toggleExtendedViewDisplay}
					>
						<FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
					</DropDownIconButton>
					<p>{props.todo.name}</p>
					<p>{props.todo.dueDate}</p>
					<p>{props.todo.priority}</p>
					<EditButton onClick={toggleEditMode}>
						<FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
					</EditButton>
				</TodoCardMainDisplay>

				<TodoCardExpandedViewDisplay style={{ display: extendedViewDisplay }}>
					<p>{props.todo.description}</p>
					<div>
						<DeleteButton onClick={deleteTodo}>
							<FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
						</DeleteButton>
					</div>
				</TodoCardExpandedViewDisplay>
			</TodoCardContainer>
		);
};

export default TodoCardFormAndDisplay;

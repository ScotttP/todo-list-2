import { React, useState, useEffect } from "react";
import TodoCardFormAndDisplay from "./TodoCardFormAndDisplay";
import NewTodoCardForm from "./NewTodoCardForm";
import firebase from "../../firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import styled from "styled-components";
const firestore = firebase.firestore();

const TodosContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 70%;
	background-color: #272626;
	box-shadow: 0px 1px 20px 1px rgb(40, 40, 40);
	border-radius: 5px;
	@media only screen and (max-width: 995px) {
		width: 80%;
	}
	@media only screen and (max-width: 795px) {
		width: 90%;
	}
	@media only screen and (max-width: 500px) {
		width: 95%;
	}
	@media only screen and (max-width: 450px) {
		width: 100%;
	}
`;

const TodosHeaderContainer = styled.div`
	text-align: center;
	margin-bottom: 10px;
`;

const TodoHeader = styled.h2`
	margin: 20px 10px 5px 10px;
	@media only screen and (max-width: 450px) {
		font-size: 16px;
	}
`;

const AddTodoButton = styled.button`
	&:hover {
		cursor: pointer;

		background-color: #1da930;
		color: #fff;
	}
	height: 1.5rem;
	width: 60%;
	border-radius: 5px;
	background-color: #272626;
	color: #1da930;
	border: 1px #1da930 solid;
	transition: 0.2s;
	margin: 10px;
	@media only screen and (max-width: 450px) {
		width: 80%;
		height: 1.2rem;
	}
`;

const TodoListTableDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const FilterDataDiv = styled.div`
	border-top: 1px #404040 solid;
	padding-top: 10px;
	width: 80%;
	display: flex;
	justify-content: flex-start;
	align-items: center;

	& > h4 {
		margin-right: 10px;
		color: #fff;
		@media only screen and (max-width: 450px) {
			font-size: 15px;
		}
	}

	& > select {
		height: 1.5rem;
		border-radius: 5px;
		background-color: #272626;
		color: #fff;
		border: 1px #fff solid;
		@media only screen and (max-width: 450px) {
			height: 1.2rem;
		}
	}

	& > select:hover {
		cursor: pointer;
	}
	@media only screen and (max-width: 706px) {
		width: 90%;
	}

	@media only screen and (max-width: 500px) {
		width: 95%;
	}
	@media only screen and (max-width: 450px) {
		margin-bottom: 10px;
		width: 99%;
	}
`;

const Todos = (props) => {
	const [formViewDisplay, setformViewDisplay] = useState("none");
	const [filterData, setFilterData] = useState("dueDate");
	const [filterOrderBy, setFilterOrderBy] = useState("asc");

	const todosRef = firestore.collection("todos");

	// const todosQuery = todosRef.orderBy(filterData, filterOrderBy);
	const todosQuery = todosRef.where("userId", "==", props.currentUser.uid);

	const [todos] = useCollectionData(todosQuery, { idField: "id" });

	const filterFunction = () => {
		console.log("fitler the results from useCollectiondataHook");
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
			setFilterData("priorityValue");
			setFilterOrderBy("asc");
		}
		if (optionSelected === "Highest Priority") {
			setFilterData("priorityValue");
			setFilterOrderBy("desc");
		}
	};

	return (
		<TodosContainer>
			<TodosHeaderContainer>
				<TodoHeader>ToDo Items</TodoHeader>
				<AddTodoButton onClick={() => setformViewDisplay("flex")}>
					+ New Todo
				</AddTodoButton>
			</TodosHeaderContainer>

			<TodoListTableDiv>
				<NewTodoCardForm
					display={formViewDisplay}
					hideForm={(e) => {
						e.preventDefault();
						setformViewDisplay("none");
					}}
					currentUser={props.currentUser}
				/>
				<FilterDataDiv>
					<h4>Filter By: </h4>

					<select onChange={(e) => handleFilter(e)}>
						<option>Due Soon</option>
						<option>Due Later</option>
						<option>Lowest Priority</option>
						<option>Highest Priority</option>
					</select>
				</FilterDataDiv>
				{todos &&
					todos.map((todo) => (
						<TodoCardFormAndDisplay
							key={todo.id}
							todo={todo}
							currentUser={props.currentUser}
						/>
					))}
			</TodoListTableDiv>
		</TodosContainer>
	);
};

export default Todos;

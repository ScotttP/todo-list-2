import { React, useState } from "react";

const TodoCardFormAndDisplay = (props) => {
	const [extendedViewDisplay, setExtendedViewDisplay] = useState("none");
	const [editTodoMode, setEditTodoMode] = useState(false);

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
		console.log("toggleeditmode");
	};

	const saveButtonWrapperFunction = () => {
		toggleEditMode();
		props.updateTodo(props.todo);
	};

	if (editTodoMode) {
		return (
			<div className="todoCardContainer">
				<form
					className="todoCardFormDisplay"
					onSubmit={() => saveButtonWrapperFunction()}
				>
					<input
						onChange={(e) => props.handleUpdateTodo(e)}
						name="name"
						type="text"
						placeholder="Enter your todo name..."
						value={props.currentTodo.todo.name}
						required
					></input>

					<input
						onChange={(e) => props.handleUpdateTodo(e)}
						name="description"
						type="text"
						placeholder="Description..."
						value={props.currentTodo.todo.description}
						required
					></input>

					<input
						onChange={(e) => props.handleUpdateTodo(e)}
						name="dueDate"
						type="date"
						value={props.currentTodo.todo.dueDate}
						required
					></input>

					<select
						name="priority"
						onChange={(e) => props.handleUpdateTodo(e)}
						value={props.currentTodo.todo.priority}
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
					<input type="checkbox"></input>
					<button onClick={toggleExtendedViewDisplay}>expand</button>
					<p>{props.todo.name}</p>
					<p>{props.todo.dueDate}</p>
					<p>{props.todo.priority}</p>
					<button onClick={props.deleteTodo}>Delete</button>
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

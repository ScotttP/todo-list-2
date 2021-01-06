import { React, useState } from "react";
import UpdateTodoCardForm from "./UpdateTodoCardForm";
const TodoCardDisplay = (props) => {
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
	};

	if (editTodoMode) {
		return (
			<UpdateTodoCardForm
				handleFormChange={(e) => props.handleFormChange(e)}
				toggleEditMode={toggleEditMode}
				todo={props.todo}
				newTodo={props.newTodo}
			/>
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

export default TodoCardDisplay;

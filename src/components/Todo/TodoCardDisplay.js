import { React, useState } from "react";

const TodoCardDisplay = (props) => {
	const [extendedViewDisplay, setExtendedViewDisplay] = useState("none");

	const toggleExtendedViewDisplay = () => {
		setExtendedViewDisplay((prevState) => {
			if (prevState === "none") return "flex";
			else return "none";
		});
	};
	return (
		<div className="todoCardContainer">
			<div className="todoCardMainDisplay">
				<input type="checkbox"></input>
				<button onClick={toggleExtendedViewDisplay}>expand</button>
				<p>{props.todo.name}</p>
				<p>{props.todo.dueDate}</p>
				<p>{props.todo.priority}</p>
				<button>Delete</button>
			</div>

			<div
				className="todoCardExpandedViewDisplay "
				style={{ display: extendedViewDisplay }}
			>
				<p>{props.todo.description}</p>
				<div>
					<button>Edit</button>
				</div>
			</div>
		</div>
	);
};

export default TodoCardDisplay;

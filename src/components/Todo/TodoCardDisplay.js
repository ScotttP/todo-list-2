import { React, useState } from "react";

const TodoCardDisplay = () => {
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
				<p>Task Name</p>
				<p>12/25/2020</p>
				<p>Medium</p>
				<button>Delete</button>
			</div>

			<div
				className="todoCardExpandedViewDisplay "
				style={{ display: extendedViewDisplay }}
			>
				<p>Details of the task are displayed here</p>
				<div>
					<button>Edit</button>
				</div>
			</div>
		</div>
	);
};

export default TodoCardDisplay;

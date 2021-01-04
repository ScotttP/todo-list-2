import React from "react";

const TodoCardForm = (props) => {
	return (
		<div className="todoCardContainer" style={{ display: props.display }}>
			<form className="todoCardFormDisplay">
				<input type="text" placeholder="Enter your task name..."></input>

				<input type="text" placeholder="Description..."></input>

				<input type="date"></input>

				<select>
					<option>Low</option>
					<option>Medium</option>
					<option>High</option>
				</select>
				<button>Save</button>
				<button onClick={props.hideForm}>Cancel</button>
			</form>
		</div>
	);
};

export default TodoCardForm;

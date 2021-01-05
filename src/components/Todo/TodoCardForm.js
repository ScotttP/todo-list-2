import React from "react";

const TodoCardForm = (props) => {
	return (
		<div className="todoCardContainer" style={{ display: props.display }}>
			<form className="todoCardFormDisplay" onSubmit={(e) => props.addTodo(e)}>
				<input
					onChange={(e) => props.handleFormChange(e)}
					name="todoName"
					type="text"
					placeholder="Enter your todo name..."
					value={props.todoName}
				></input>

				<input
					onChange={(e) => props.handleFormChange(e)}
					name="todoDescription"
					type="text"
					placeholder="Description..."
					value={props.todoDescription}
				></input>

				<input
					onChange={(e) => props.handleFormChange(e)}
					name="todoDueDate"
					type="date"
					value={props.todoDueDate}
				></input>

				<select name="todoPriority" onChange={(e) => props.handleFormChange(e)}>
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

export default TodoCardForm;

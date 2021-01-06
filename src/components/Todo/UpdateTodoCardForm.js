import React from "react";

const UpdateTodoCardForm = (props) => {
	console.log(props);
	return (
		<div className="todoCardContainer">
			<form
				className="todoCardFormDisplay"
				onSubmit={(e) => props.updateTodo(e)}
			>
				<input
					onChange={(e) => props.handleFormChange(e)}
					name="name"
					type="text"
					placeholder="Enter your todo name..."
					value={props.newTodo.name}
					required
				></input>

				<input
					onChange={(e) => props.handleFormChange(e)}
					name="description"
					type="text"
					placeholder="Description..."
					value={props.newTodo.description}
					required
				></input>

				<input
					onChange={(e) => props.handleFormChange(e)}
					name="dueDate"
					type="date"
					value={props.newTodo.dueDate}
					required
				></input>

				<select
					name="priority"
					onChange={(e) => props.handleFormChange(e)}
					value={props.newTodo.priority}
					required
				>
					<option>Low</option>
					<option>Medium</option>
					<option>High</option>
				</select>
				<button type="submit" onClick={props.toggleEditMode}>
					Save
				</button>
				<button onClick={props.toggleEditMode}>Cancel</button>
			</form>
		</div>
	);
};

export default UpdateTodoCardForm;

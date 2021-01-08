import React from "react";

const NewTodoCardForm = (props) => {
	const onSubmitWrapperFunction = (e) => {
		props.addTodo(e);
		props.hideForm(e);
	};

	return (
		<div className="todoCardContainer" style={{ display: props.display }}>
			<form
				className="todoCardFormDisplay"
				onSubmit={(e) => onSubmitWrapperFunction(e)}
			>
				<input
					onChange={(e) => props.handleNewTodo(e)}
					name="name"
					type="text"
					placeholder="Enter your todo name..."
					value={props.newTodo.todo.name}
					required
				></input>

				<input
					onChange={(e) => props.handleNewTodo(e)}
					name="description"
					type="text"
					placeholder="Description..."
					value={props.newTodo.todo.description}
					required
				></input>

				<input
					onChange={(e) => props.handleNewTodo(e)}
					name="dueDate"
					type="date"
					value={props.newTodo.todo.dueDate}
					required
				></input>

				<select
					name="priority"
					onChange={(e) => props.handleNewTodo(e)}
					required
				>
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

export default NewTodoCardForm;

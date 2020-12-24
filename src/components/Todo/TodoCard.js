import React from "react";

const TodoCard = () => {
	return (
		<tr className="todoCardContainer">
			<td>
				<input type="checkbox"></input>
			</td>
			<td>Task Name</td>
			<td>12/25/2020</td>
			<td>Medium</td>
			<td>
				<button>expand</button>
			</td>
			<div className="expandedTodoView">
				<textarea></textarea>
				<button>Edit</button>
				<button>Delete</button>
			</div>
		</tr>
	);
};

export default TodoCard;

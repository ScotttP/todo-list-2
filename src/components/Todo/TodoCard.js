import React from "react";

const TodoCard = (props) => {
	return (
		<tr className="todoCardContainer">
			<td>
				<input type="checkbox"></input>
			</td>
			<td>Task Name</td>
			<td>12/25/2020</td>
			<td>Medium</td>
			<td>
				<button onClick={props.toggleExpandedView}>expand</button>
			</td>
		</tr>
	);
};

export default TodoCard;

import React from "react";

const ExpandedViewTodoCard = (props) => {
	return (
		<tr className="expandedTodoView " style={{ display: props.view }}>
			<td>
				<textarea rows="5" cols="50"></textarea>
			</td>
			<td></td>
			<td></td>
			<button>Edit</button>
			<button>Delete</button>
		</tr>
	);
};

export default ExpandedViewTodoCard;

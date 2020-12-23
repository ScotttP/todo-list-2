import React from "react";
import TaskCard from "./TaskCard";
import AddTasksWindow from "./AddTasksWindow";

const Tasks = () => {
	return (
		<div id="tasksContainer">
			<TaskCard></TaskCard>
			<AddTasksWindow></AddTasksWindow>
		</div>
	);
};

export default Tasks;

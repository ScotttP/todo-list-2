import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ProjectCard = (props) => {
	console.log(props.element);
	return (
		<div id="projectCardContainer">
			<h4>{props.element}</h4>
			<FontAwesomeIcon
				id="deleteProject"
				onClick={props.deleteFromProjectList}
				icon={faTimes}
			></FontAwesomeIcon>
		</div>
	);
};

export default ProjectCard;

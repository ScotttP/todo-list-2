import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ProjectCard = () => {
	return (
		<div id="projectCardContainer">
			<h3>Project 3</h3>
			<FontAwesomeIcon id="deleteProject" icon={faTimes}></FontAwesomeIcon>
		</div>
	);
};

export default ProjectCard;

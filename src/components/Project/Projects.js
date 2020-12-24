import React from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
	return (
		<aside id="projectsContainer">
			<h2>Projects</h2>
			<ul id="projectList">
				<h4>View All</h4>
				<ProjectCard />
			</ul>
		</aside>
	);
};

export default Projects;

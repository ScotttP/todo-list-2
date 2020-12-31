import { React, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import uniqid from "uniqid";
import firebase from "firebase/app";

import "firebase/firestore";

const Projects = (props) => {
	const [projectList, setProjectList] = useState([]);

	const addToProjectList = () => {
		let projectName = document.getElementById("addProjectInput").value;
		if (
			projectList.includes(projectName) ||
			projectName === null ||
			projectName === ""
		)
			return;
		else {
			setProjectList([...projectList, projectName]);

			//saveProjectListToFireStore();
		}
		document.getElementById("addProjectInput").value = "";
	};
	const deleteFromProjectList = (index) => {
		let copyOfProjectList = [...projectList];
		copyOfProjectList.splice(index, 1);
		setProjectList(copyOfProjectList);
	};

	const saveProjectListToFireStore = () => {
		return firebase
			.firestore()
			.collection("projectList-test")
			.add({
				projectListTest: projectList,
				userEmail: props.currentUser.email,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			})
			.catch((error) => {
				console.error("Error writing new message to database", error);
			});
	};

	const loadProjectList = () => {
		// Create the query to load the last 12 messages and listen for new ones.
		let query = firebase
			.firestore()
			.collection("projectList-test")
			.orderBy("timestamp", "asc")
			.limit(10);

		// Start listening to the query.
		query.onSnapshot((snapshot) => {
			snapshot.docChanges().forEach((change) => {
				console.log(change.doc.data());
				// if (change.type === "removed") {
				// 	deleteMessage(change.doc.id);
				// } else {
				// 	message = change.doc.data();
				// 	displayMessage(
				// 		change.doc.id,
				// 		message.timestamp,
				// 		message.name,
				// 		message.text,
				// 		message.profilePicUrl,
				// 		message.imageUrl
				// 	);
				// }
			});
		});
	};

	const projectCardRendering = () => {
		return projectList.map((element, index) => (
			<ProjectCard
				key={uniqid()}
				deleteFromProjectList={() => deleteFromProjectList(index)}
				element={element}
				index={index}
			/>
		));
	};

	useEffect(() => {
		saveProjectListToFireStore();
	}, [projectList]);

	useEffect(() => {
		loadProjectList();
	}, []);

	return (
		<aside id="projectsContainer">
			<h2>Projects</h2>
			<ul id="projectList">
				<h4>View All</h4>
				{projectCardRendering()}
			</ul>
			<span onClick={() => addToProjectList()}>+</span> {""} {""}
			<input id="addProjectInput" type="text" placeholder="Add Project..." />
		</aside>
	);
};

export default Projects;

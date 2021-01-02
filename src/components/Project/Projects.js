import { React, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import uniqid from "uniqid";
import firebase from "firebase/app";

import "firebase/firestore";

const Projects = (props) => {
	const [projectList, setProjectList] = useState([]);

	const deleteFromProjectList = (index) => {
		firebase
			.firestore()
			.collection(`${props.currentUser.email}-projectList`)
			.doc(projectList[index])
			.delete()
			.catch((error) => {
				console.error("Error writing new message to database", error);
			});

		// loadProjectListFromFirestore();
		// let copyOfProjectList = [...projectList];
		// copyOfProjectList.splice(index, 1);
		// setProjectList(copyOfProjectList);
	};

	const saveProjectListToFireStore = () => {
		let projectName = document.getElementById("addProjectInput").value;

		if (
			projectList.includes(projectName) ||
			projectName === null ||
			projectName === ""
		)
			return;
		else
			return firebase
				.firestore()
				.collection(`${props.currentUser.email}-projectList`)
				.doc(`${projectName}`)
				.set({
					projectName: projectName,
					userEmail: props.currentUser.email,
					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				})

				.catch((error) => {
					console.error("Error writing new message to database", error);
				});
	};

	const loadProjectListFromFirestore = () => {
		let query = firebase
			.firestore()
			.collection(`${props.currentUser.email}-projectList`)
			.orderBy("timestamp", "asc");

		query.onSnapshot((snapshot) => {
			snapshot.docChanges().forEach((change) => {
				if (
					!projectList.includes(change.doc.data().projectName) &&
					change.type !== "modified"
				) {
					if (change.type === "added") {
						setProjectList((prevState) => {
							return [...prevState, change.doc.data().projectName];
						});
					}
				} else if (change.type === "removed") {
					console.log("this was removed");
					// setProjectList((prevState) => {
					// 	prevState.splice(
					// 		prevState.indexOf(change.doc.data().projectName, 1)
					// 	);
					// 	console.log(prevState);
					// });
				}

				// console.log(change.type);
			});
		});

		console.log("load project list from firestore");
	};

	const projectCardRendering = () => {
		console.log("renderFunctionisCalled");

		return projectList.map((element, index) => (
			<ProjectCard
				key={uniqid()}
				deleteFromProjectList={() => deleteFromProjectList(index)}
				element={element}
				index={index}
			/>
		));
	};

	const doubleFunction = () => {
		saveProjectListToFireStore();
		console.log(projectList);
		// loadProjectListFromFirestore();
		console.log(projectList);
		document.getElementById("addProjectInput").value = "";
	};

	useEffect(() => {
		loadProjectListFromFirestore();
	}, []);

	return (
		<aside id="projectsContainer">
			<h2>Projects</h2>
			<ul id="projectList">
				<h4>View All</h4>
				{projectCardRendering()}
			</ul>
			<span onClick={() => doubleFunction()}>+</span> {""} {""}
			<input id="addProjectInput" type="text" placeholder="Add Project..." />
		</aside>
	);
};

export default Projects;

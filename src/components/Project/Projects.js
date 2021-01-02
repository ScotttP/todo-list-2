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
		getProjectListFromFirestoreOnLoad();
	};

	const saveProjectListToFireStore = () => {
		let projectName = document.getElementById("addProjectInput").value;
		console.log(projectList.includes(projectName));
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

	const getProjectListFromFirestoreOnLoad = () => {
		let array = [];
		firebase
			.firestore()
			.collection(`${props.currentUser.email}-projectList`)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					array = [...array, doc.data().projectName];
				});
				setProjectList(array);
			});
		console.log(projectList);
	};

	const projectCardRendering = () => {
		console.log("renderFunctionisCalled");
		console.log(projectList);
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
		getProjectListFromFirestoreOnLoad();
		document.getElementById("addProjectInput").value = "";
	};

	useEffect(() => {
		getProjectListFromFirestoreOnLoad();
	}, []);

	useEffect(() => {
		//getProjectListFromFirestoreOnLoad();
	}, [projectList]);

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

// const loadProjectListFromFirestore = () => {
// 	// 	let query = firebase
// 	// 		.firestore()
// 	// 		.collection(`${props.currentUser.email}-projectList`)
// 	// 		.orderBy("timestamp", "asc");
// 	// 	query.onSnapshot((snapshot) => {
// 	// 		snapshot.docChanges().forEach((change) => {
// 	// 			console.log(change.type, change.doc.data().projectName);
// 	// 			if (
// 	// 				!projectList.includes(change.doc.data().projectName) &&
// 	// 				change.type !== "modified"
// 	// 			) {
// 	// 				setProjectList((prevState) => {
// 	// 					return [...prevState, change.doc.data().projectName];
// 	// 				});
// 	// 			}
// 	// 			// 	console.log("state was set");
// 	// 			// 	console.log(projectList);
// 	// 			// } else if (change.type === "removed") {
// 	// 			// 	projectList.indexOf(change.doc.data().projectName);
// 	// 			// 	// setProjectList((prevState) => {
// 	// 			// 	// 	prevState.splice(
// 	// 			// 	// 		prevState.indexOf(change.doc.data().projectName, 1)
// 	// 			// 	// 	);
// 	// 			// 	// 	console.log(prevState);
// 	// 			// 	// });
// 	// 			// }
// 	// 		});
// 	// 	});
// 	// };

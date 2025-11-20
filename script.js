import { storage, addDescriptionButton, loadDefaultTests } from "./components.js";

// Load default tests if no storage exists
loadDefaultTests();

// DOM elements
const container = document.getElementById("container");

// Load quizzes from storage
const quizzes = storage?.quizzes || [];

// Create quiz buttons
quizzes.forEach((quiz) => {
	const button = document.createElement("button");
	button.className = "quiz";
	button.innerHTML = quiz.title + "<br>Questions: " + quiz.questions.length;
	container.appendChild(button);

	// button functionality
	button.addEventListener("click", () => {
		// ensure the container is a positioning context
		if (!container.style.position) container.style.position = "relative";

		// add dark overlay
		const overlay = document.createElement("button");
		overlay.id = "overlay";
		document.body.appendChild(overlay);

		// if overlay clicked
		overlay.addEventListener("click", () => {
			overlay.remove();
			description.remove();
		});

		// add div to show description
		const description = document.createElement("div");
		description.id = "description";
		description.className = "quiz";
		description.innerHTML = quiz.title + "<br>" + quiz.description;
		document.body.appendChild(description);

		// add buttons
		const manageButton = addDescriptionButton("manage", "Manage");
		const startButton = addDescriptionButton("start", "Start Quiz");
		const deleteButton = addDescriptionButton("delete", "Delete");

		// buttons functionality
		manageButton.addEventListener("click", () => {
			window.location.href = "/manage";
		});

		startButton.addEventListener("click", () => {
			window.location.href = "/quiz";
			storage.selected = quiz;
			localStorage.setItem("storage", JSON.stringify(storage));
		});

		deleteButton.addEventListener("click", () => {
			storage.quizzes = storage.quizzes.filter((q) => q.title !== quiz.title);
			localStorage.setItem("storage", JSON.stringify(storage));
			window.location.reload();
		});
	});
});

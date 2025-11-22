import { storage, addDescriptionButton, addQuizElement, loadDefaultTests } from "./components.js";

// Initialize storage if not present
loadDefaultTests();

// DOM elements
const container = document.getElementById("container");

// Load quizzes from storage
const quizzes = storage?.quizzes || [];

// Create quiz buttons
quizzes.forEach((quiz) => {
	// constants of text
	const quizText = quiz.title + "<br>Questions: " + quiz.questions.length;
	const descriptionText = quiz.title + "<br>" + quiz.description;

	// create button
	const button = addQuizElement("button", "quiz", quizText, container);

	// button functionality
	button.addEventListener("click", () => {
		// ensure the container is a positioning context
		!container.style.position ? (container.style.position = "relative") : null;

		// create div to show description
		const description = addQuizElement("div", "quiz", descriptionText, document.body);
		description.id = "description";

		// create dark overlay
		const overlay = document.createElement("button");
		overlay.id = "overlay";
		document.body.appendChild(overlay);

		// if overlay clicked
		overlay.addEventListener("click", () => {
			overlay.remove();
			description.remove();
		});

		// create function buttons
		addDescriptionButton("manage", "Manage", "/manage", quiz);
		addDescriptionButton("start", "Start Quiz", "/quiz", quiz);
		addDescriptionButton("delete", "Delete", "/del", quiz);
	});
});

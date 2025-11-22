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
	const descText = quiz.title + "<br>" + quiz.description;

	// create button
	const button = addQuizElement("button", container, "quiz", quizText);

	// button functionality
	button.addEventListener("click", () => {
		// ensure the container is a positioning context
		!container.style.position ? (container.style.position = "relative") : null;

		// create div to show description
		const description = addQuizElement("div", document.body, "quiz description", descText);

		// create dark overlay
		const overlay = document.createElement("button");
		overlay.id = "overlay";
		document.body.appendChild(overlay);

		// if overlay clicked
		overlay.addEventListener("click", () => {
			overlay.remove();
			description.remove();
		});

		// create wrapper for buttons
		addQuizElement("div", description, "description-buttons");

		// create function buttons
		addDescriptionButton("Manage", "/manage", quiz);
		addDescriptionButton("Start Quiz", "/quiz", quiz);
		addDescriptionButton("Delete", "/del", quiz);
	});
});

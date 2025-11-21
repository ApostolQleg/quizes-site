import { storage, addDescriptionButton, loadDefaultTests, setSelectedQuiz } from "./components.js";
loadDefaultTests();
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
		addDescriptionButton("manage", "Manage", "/manage", quiz);
		addDescriptionButton("start", "Start Quiz", "/quiz", quiz);
		addDescriptionButton("delete", "Delete", "/del", quiz);

		// return selected quiz
		setSelectedQuiz(quiz);
	});
});

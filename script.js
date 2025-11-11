const container = document.getElementById("container");
const create = document.getElementById("create");

// Load and create quiz buttons from localStorage
storage = JSON.parse(localStorage.getItem("storage")) || {};
const quizzes = storage?.quizzes || [];

quizzes.forEach((quiz) => {
	const button = document.createElement("button");
	button.className = "quiz";
	button.innerHTML = quiz.title + "<br>Questions: " + quiz.questions.length;
	container.appendChild(button);

	// button functionality
	button.addEventListener("click", () => {
		// Load the selected quiz
		storage.selected = quiz;
		localStorage.setItem("storage", JSON.stringify(storage));

		// ensure the container is a positioning context
		if (!container.style.position) container.style.position = "relative";

		// add dark overlay
		const overlay = document.createElement("div");
		overlay.id = "overlay";
		document.body.appendChild(overlay);

		// remove clicked button and add button to show description
		button.remove();
		const description = addButton("description", "quiz", "", document.body);
		description.innerHTML = quiz.title + "<br>" + quiz.description + "<br>";

		// add start quiz button
		const startQuizButton = addButton(
			"start-quiz-button",
			"description-button",
			"Start Quiz",
			description
		);

		// start quiz button functionality
		startQuizButton.addEventListener("click", () => {
			window.location.href = "/quiz";
		});

		// add manage quiz button
		const manageQuizButton = addButton(
			"manage-quiz-button",
			"description-button",
			"Manage",
			description
		);

		// manage quiz button functionality
		manageQuizButton.addEventListener("click", () => {
			window.location.href = "/manage";
		});

		// add delete quiz button
		const deleteQuizButton = addButton(
			"delete-quiz-button",
			"description-button",
			"Delete",
			description
		);

		// delete quiz button functionality
		deleteQuizButton.addEventListener("click", () => {
			storage = JSON.parse(localStorage.getItem("storage"));
			storage.quizzes = storage.quizzes.filter((q) => q.title !== quiz.title);
			localStorage.setItem("storage", JSON.stringify(storage));
			window.location.reload();
		});

		// if description clicked
		description.addEventListener("click", () => {
			// remove overlay and description
			const overlay = document.getElementById("overlay");
			const description = document.getElementById("description");
			overlay.remove();
			description.remove();

			// re-add the button to the container
			container.appendChild(button);
		});
	});
});

function addButton(id, className, text, parent) {
	const button = document.createElement("button");
	button.id = id;
	button.className = className;
	button.innerText = text;
	parent.appendChild(button);
	return button;
}

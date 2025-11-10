const container = document.getElementById("container");
const create = document.getElementById("create");

// Load and create quiz buttons from localStorage
const storage = JSON.parse(localStorage.getItem("storage")) || {};
const quizzes = storage?.quizzes || [];

quizzes.forEach((quiz) => {
	const button = document.createElement("button");
	button.className = "quiz";
	button.innerHTML = quiz.title + "<br>Questions: " + quiz.questions.length;
	container.appendChild(button);

	// Start quiz on button click
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

		// add button to show description and remove clicked button
		const description = document.createElement("button");
		description.className = "quiz";
		description.id = "description";
		description.innerHTML = quiz.title + "<br>" + quiz.description + "<br>";
		document.body.appendChild(description);
		button.remove();

		// add start quiz button
		const startQuizButton = document.createElement("button");
		startQuizButton.id = "start-quiz-button";
		startQuizButton.innerText = "Start Quiz";
		description.appendChild(startQuizButton);
		startQuizButton.addEventListener("click", () => {
			window.location.href = "/quiz";
		});

		// if description clicked
		description.addEventListener("click", () => {
			// remove overlay and description
			const overlay = document.getElementById("overlay");
			overlay.remove();

			const description = document.getElementById("description");
			description.remove();

			// re-add the button to the container
			container.appendChild(button);
		});
	});
});

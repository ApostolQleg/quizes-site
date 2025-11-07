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

	let ifPressed = false;
	// Start quiz on button click
	button.addEventListener("click", () => {
		// Load the selected quiz
		storage.selected = quiz;
		localStorage.setItem("storage", JSON.stringify(storage));
		//window.location.href = "/quiz";
		if (ifPressed) {
			// ensure the container is a positioning context
			if (!container.style.position) container.style.position = "relative";

			// reset position
			button.style.position = "static";

			// animate the button back to original size
			button.style.width = "20vw";
			button.style.height = "20vw";
			button.style.border = "none";

			// remove start quiz button
			if (document.getElementById("start-quiz-button")) {
				button.removeChild(document.getElementById("start-quiz-button"));
			}
		} else {
			// ensure the container is a positioning context
			if (!container.style.position) container.style.position = "relative";

			// animate the button to fill the container
			button.style.position = "absolute";
			button.style.width = "80%";
			button.style.height = "80%";
			button.style.top = "10%";
			button.style.left = "10%";
			button.style.border = "10px solid rgba(255, 255, 255, 0.1)";
			// add button to start quiz
			const startQuizButton = document.createElement("button");
			startQuizButton.id = "start-quiz-button";
			startQuizButton.innerText = "Start Quiz";
			startQuizButton.onclick = () => {
				// Start the quiz
			};
			button.appendChild(startQuizButton);
			// Add event listener to start the quiz
			startQuizButton.addEventListener("click", () => {
				window.location.href = "/quiz";
			});
		}
		ifPressed = !ifPressed;
	});
});

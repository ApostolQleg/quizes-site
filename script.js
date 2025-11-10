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

		// create modal to start quiz
		//window.location.href = "/quiz";
		if (!ifPressed) {
			// ensure the container is a positioning context
			if (!container.style.position) container.style.position = "relative";

			// add dark overlay
			const overlay = document.createElement("div");
			overlay.id = "overlay";
			document.body.appendChild(overlay);

			// animate the button to fill the container
			button.style.position = "absolute";
			button.style.width = "80%";
			button.style.height = "80%";
			button.style.top = "10%";
			button.style.left = "10%";
			button.style.border = "10px solid rgba(104, 25, 84, 1)";
			button.style.zIndex = "10";

			// add button to start quiz
			const startQuizButton = document.createElement("button");
			startQuizButton.id = "start-quiz-button";
			startQuizButton.innerText = "Start Quiz";

			startQuizButton.onclick = () => {
				window.location.href = "/quiz";
			};
			button.appendChild(startQuizButton);
		} else {
			// ensure the container is a positioning context
			if (!container.style.position) container.style.position = "relative";

			// reset position
			button.style.position = "static";

			// remove dark overlay
			overlay = document.getElementById("overlay");
			overlay.remove();

			// animate the button back to original size
			button.style.width = "20vw";
			button.style.height = "20vw";
			button.style.border = "none";

			// remove start quiz button
			if (document.getElementById("start-quiz-button")) {
				button.removeChild(document.getElementById("start-quiz-button"));
			}
		}
		ifPressed = !ifPressed;
	});
});

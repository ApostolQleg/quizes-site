const container = document.getElementById("container");
const create = document.getElementById("create");

// Test quizzes
localStorage.setItem(
	"storage",
	JSON.stringify({
		quizzes: [
			{
				title: "Тест з англійської мови (A1)",
				description: "Перевір свої базові знання англійських слів і граматики.",
				questions: [
					{
						text: "Яке з наведених слів означає 'кіт'?",
						options: [
							{ text: "dog", id: 1, isCorrect: false },
							{ text: "cat", id: 2, isCorrect: true },
							{ text: "bird", id: 3, isCorrect: false },
						],
					},
					{
						text: "Яке з наведених слів означає 'sobaka'?",
						options: [
							{ text: "dog", id: 1, isCorrect: true },
							{ text: "cat", id: 2, isCorrect: false },
							{ text: "bird", id: 3, isCorrect: false },
						],
					},
				],
			},
			{
				title: "Тест з англійської мови (A2)",
				description: "Перевір свої базові знання англійських слів і граматики.",
				questions: [
					{
						text: "Яке з наведених слів означає 'турбулентність'?",
						options: [
							{ text: "turbulence", id: 1, isCorrect: true },
							{ text: "cow", id: 2, isCorrect: false },
							{ text: "turbocock", id: 3, isCorrect: false },
						],
					},
					{
						text: "Яке з наведених слів означає 'стать'?",
						options: [
							{ text: "gender", id: 1, isCorrect: true },
							{ text: "sex", id: 2, isCorrect: false },
							{ text: "stand up", id: 3, isCorrect: false },
						],
					},
					{
						text: "Яке з наведених слів означає 'гей'?",
						options: [
							{ text: "gay", id: 1, isCorrect: false },
							{ text: "Bohdan", id: 2, isCorrect: false },
							{ text: "both", id: 3, isCorrect: true },
						],
					},
				],
			},
		],
		results: [
			{
				timestamp: "2024-06-10T12:00:00Z",
				quizTitle: "Тест з англійської мови (A1)",
				summary: 2,
				answers: [[], []],
			},
		],
	})
);

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

			// remove start quiz button
			if (document.getElementById("start-quiz-button")) {
				button.removeChild(document.getElementById("start-quiz-button"));
			}
		} else {
			// ensure the container is a positioning context
			if (!container.style.position) container.style.position = "relative";

			// animate the button to fill the container
			button.style.position = "absolute";
			button.style.width = "100%";
			button.style.height = "100%";

			// add button to start quiz
			const startQuizButton = document.createElement("button");
			startQuizButton.id = "start-quiz-button";
			startQuizButton.innerText = "Start Quiz";
			startQuizButton.onclick = () => {
				// Start the quiz
			};
			button.appendChild(startQuizButton);
		}
		ifPressed = !ifPressed;
	});
});

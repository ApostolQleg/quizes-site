const container = document.getElementById("container");
const create = document.getElementById("create");

// Test quizzes
localStorage.setItem(
	"storage",
	JSON.stringify({
		quizzes: [
			{
				title: "Тест з англійської мови (A1)",
				author: "Dima",
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
						text: "Яке з наведених слів означає 'кіт'?",
						options: [
							{ text: "dog", id: 1, isCorrect: false },
							{ text: "cat", id: 2, isCorrect: true },
							{ text: "bird", id: 3, isCorrect: false },
						],
					},
				],
			},
			{
				title: "Тест з англійської мови (A2)",
				author: "Dima and Oleg",
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
				title: "Тест з англійської мови (A1)",
				author: "Dima",
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
						text: "Яке з наведених слів означає 'кіт'?",
						options: [
							{ text: "dog", id: 1, isCorrect: false },
							{ text: "cat", id: 2, isCorrect: true },
							{ text: "bird", id: 3, isCorrect: false },
						],
					},
				],
			},
			{
				title: "Тест з англійської мови (A2)",
				author: "Dima and Oleg",
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
	})
);

// Load quizzes from localStorage and create quiz buttons
const quizzes = JSON.parse(localStorage.getItem("storage"))?.quizzes || [];

quizzes.forEach((quiz) => {
	const button = document.createElement("button");
	button.className = "quiz";
	button.innerHTML =
		quiz.title + "<br>By: " + quiz.author + "<br>Questions: " + quiz.questions.length;
	container.appendChild(button);
	// Start quiz on button click
	button.addEventListener("click", () => {
		// Load the selected quiz
		const selectedQuiz = quiz;
		localStorage.setItem("storage", JSON.stringify({ selected: selectedQuiz }));
		window.location.href = "quiz";
	});
});

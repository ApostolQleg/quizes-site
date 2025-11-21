// localStorage.setItem(
// 	"storage",
// 	JSON.stringify({
// 		quizzes: [
// 			{
// 				title: "Тест з англійської мови (A1)",
// 				description: "Перевір свої базові знання англійських слів і граматики.",
// 				questions: [
// 					{
// 						text: "Яке з наведених слів означає 'кіт'?",
// 						options: [
// 							{ text: "dog", id: 1, isCorrect: false },
// 							{ text: "cat", id: 2, isCorrect: true },
// 							{ text: "bird", id: 3, isCorrect: false },
// 						],
// 					},
// 					{
// 						text: "Яке з наведених слів означає 'sobaka'?",
// 						options: [
// 							{ text: "dog", id: 1, isCorrect: false },
// 							{ text: "cat", id: 2, isCorrect: true },
// 							{ text: "bird", id: 3, isCorrect: false },
// 						],
// 					},
// 				],
// 			},
// 			{
// 				title: "Тест з англійської мови (A2)",
// 				description: "Перевір свої базові знання англійських слів і граматики.",
// 				questions: [
// 					{
// 						text: "Яке з наведених слів означає 'турбулентність'?",
// 						options: [
// 							{ text: "turbulence", id: 1, isCorrect: true },
// 							{ text: "cow", id: 2, isCorrect: false },
// 							{ text: "turbocock", id: 3, isCorrect: false },
// 						],
// 					},
// 					{
// 						text: "Яке з наведених слів означає 'стать'?",
// 						options: [
// 							{ text: "gender", id: 1, isCorrect: true },
// 							{ text: "sex", id: 2, isCorrect: false },
// 							{ text: "stand up", id: 3, isCorrect: false },
// 						],
// 					},
// 					{
// 						text: "Яке з наведених слів означає 'гей'?",
// 						options: [
// 							{ text: "gay", id: 1, isCorrect: false },
// 							{ text: "Bohdan", id: 2, isCorrect: false },
// 							{ text: "both", id: 3, isCorrect: true },
// 						],
// 					},
// 				],
// 			},
// 		],
// 		results: [
// 			{
// 				timestamp: "2024-06-10T12:00:00Z",
// 				quizTitle: "Тест з англійської мови (A1)",
// 				summary: 2,
// 				answers: [[], []],
// 			},
// 		],
// 	})
// );

import { storage, selected } from "/components.js";

// DOM elements
const submitBtn = document.getElementById("submit");
const container = document.getElementById("container");

// Load selected quiz from localStorage
// const selected = storage?.selected || {};

const title = document.createElement("div");
title.className = "question-block"; //створення title
title.innerHTML = selected.title;
container.appendChild(title);

selected.questions.forEach((question) => {
	const questionDiv = document.createElement("div");
	questionDiv.className = "questionDiv";
	questionDiv.innerHTML = question.text;

	container.appendChild(questionDiv);
	question.options.forEach((option) => {
		const optionDiv = document.createElement("div");
		optionDiv.className = "optionDiv";

		const optionInput = document.createElement("input");
		optionInput.type = "checkbox";
		optionInput.name = `question-${question.text}`;
		optionInput.value = option.id;

		const optionLabel = document.createElement("label");
		optionLabel.htmlFor = `option-${option.id}`;
		optionLabel.innerHTML = option.text;

		optionDiv.appendChild(optionInput);
		optionDiv.appendChild(optionLabel);

		container.appendChild(optionDiv);
	});
});

submitBtn.addEventListener("click", () => {
	const answers = [];
	selected.questions.forEach((question) => {
		const selectedOptions = [];
		question.options.forEach((option) => {
			const optionInput = document.querySelector(
				`input[name="question-${question.text}"][value="${option.id}"]`
			);
			if (optionInput.checked) {
				selectedOptions.push(option.id);
			}
		});
		answers.push(selectedOptions);
	});

	let summary = 0;
	selected.questions.forEach((question, qIndex) => {
		const correctOptionIds = question.options
			.filter((option) => option.isCorrect)
			.map((option) => option.id);
		const selectedOptionIds = answers[qIndex];

		if (
			correctOptionIds.length === selectedOptionIds.length &&
			correctOptionIds.every((id) => selectedOptionIds.includes(id))
		) {
			summary++;
		}
	});

	const result = {
		timestamp: new Date().toISOString(),
		title: selected.title,
		summary: summary,
		answers: answers,
	};

	storage.results.push(result);
	localStorage.setItem("storage", JSON.stringify(storage));

	window.location.href = "/quiz/result";
});

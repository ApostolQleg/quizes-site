import { storage, selectedQuiz, addQuizElement } from "/components.js";

// DOM elements
const container = document.getElementById("container");

// Load selected quiz
const selected = selectedQuiz.value;

// create title element
const title = addQuizElement("div", "title", selected.title, container);

const summary = addQuizElement(
	"div",
	"title",
	`Your result: ${selected.summary} / ${selected.answers.length}`,
	container
);

// document.addEventListener("DOMContentLoaded", () => {
// 	const container = document.getElementById("container");
// 	const results = storage.results || [];
// 	let latestResult = storage.selected;
// 	if (storage.selected === undefined) {
// 		latestResult = results[results.length - 1];
// 	}

// 	if (latestResult && storage.quizzes) {
// 		const quiz = storage.quizzes.find((q) => q.title === latestResult.title);
// 		const totalQuestions = quiz ? quiz.questions.length : 0;

// 		const titleElementDiv = document.createElement("div");
// 		titleElementDiv.className = "titleElementDiv";

// 		const titleElement = document.createElement("h2");
// 		titleElement.className = "resultTitle";
// 		titleElement.textContent = `${latestResult.title}`;
// 		titleElementDiv.appendChild(titleElement);

// 		container.appendChild(titleElementDiv);

// 		const summaryElementDiv = document.createElement("div");
// 		summaryElementDiv.className = "summaryElementDiv";

// 		const summaryElement = document.createElement("p");
// 		summaryElement.className = "result-summary";
// 		summaryElement.textContent = `Your result: ${latestResult.summary} / ${totalQuestions}`;
// 		container.appendChild(summaryElement);
// 		summaryElementDiv.appendChild(summaryElement);

// 		container.appendChild(summaryElementDiv);

// 		const backButton = document.createElement("button");
// 		backButton.className = "backButton";
// 		backButton.textContent = "Back to Results";
// 		backButton.addEventListener("click", () => {
// 			window.location.href = "/results";
// 		});
// 		container.appendChild(backButton);
// 	} else {
// 		const errorElement = document.createElement("p");
// 		errorElement.textContent = "Результат тесту не знайдено. Спробуйте пройти тест ще раз.";
// 		container.appendChild(errorElement);
// 	}
// });

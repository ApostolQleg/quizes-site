import { storage, selectedQuiz, addQuizElement } from "/components.js";

// DOM elements
const container = document.getElementById("container");
const submitBtn = document.getElementsByClassName("submit")[0];

// Load selected quiz
const selected = selectedQuiz.value;

// create title element
const title = addQuizElement("div", "title", selected.title, container);
title.id = "title";

selected.questions.forEach((question) => {
	// create question title element
	addQuizElement("div", "title", question.text, container);

	// create options container
	const options = addQuizElement("div", "options", "", container);

	question.options.forEach((option) => {
		const optionElement = addQuizElement("div", "option", "", options);
		addQuizElement("input", "option", "", optionElement, option, question);
		addQuizElement("label", "option-text", option.text, optionElement);
	});
});

submitBtn.addEventListener("click", () => {
	const answers = [];
	selected.questions.forEach((question) => {
		const selectedOptions = [];
		question.options.forEach((option) => {
			const optionInput = document.querySelector(
				`input[name="q-${CSS.escape(question.text)}"][value="${option.id}"]`
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

	selectedQuiz.value = result;

	storage.results.push(result);
	localStorage.setItem("storage", JSON.stringify(storage));

	window.location.href = "/quiz/result";
});

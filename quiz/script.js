import { storage, selectedQuiz, addQuizElement } from "/components.js";

// DOM elements
const container = document.getElementById("container");
const submitBtn = document.getElementsByClassName("submit")[0];

// Load selected quiz
const selected = selectedQuiz.value;

// create title element
addQuizElement("div", container, "title main", selected.title);

selected.questions.forEach((question) => {
	// create question title element
	addQuizElement("div", container, "title", question.text);

	// create options container
	const options = addQuizElement("div", container, "options");

	question.options.forEach((option) => {
		const optionElement = addQuizElement("div", options, "option");
		addQuizElement("input", optionElement, question, option);
		addQuizElement("label", optionElement, "option-text", option.text);
	});
});

submitBtn.addEventListener("click", () => {
	// gather answers
	const answers = [];
	selected.questions.forEach((question) => {
		const selectedOptions = [];
		question.options.forEach((option) => {
			const optionInput = document.querySelector(
				`input[name="q-${CSS.escape(question.text)}"][value="${CSS.escape(option.id)}"]`
			);
			if (optionInput.checked) {
				selectedOptions.push(option.id);
			}
		});
		answers.push(selectedOptions);
	});

	// calculate summary
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

	// create result object
	const result = {
		timestamp: new Date().toISOString(),
		title: selected.title,
		summary: summary,
		answers: answers,
	};

	// store result
	selectedQuiz.value = result;
	storage.results.push(result);
	localStorage.setItem("storage", JSON.stringify(storage));

	// redirect to result page
	window.location.href = "/quiz/result";
});

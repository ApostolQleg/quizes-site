import { storage, selectedQuiz, addQuizElement } from "/components.js";

// DOM elements
const container = document.getElementById("container");

// Load selected quiz
const selected = selectedQuiz.value;

// create title element
addQuizElement("div", container, "title main", selected.title);

// create question blocks
selected.questions.forEach((question, qIndex) => {
	// create question title element
	const wrapper = addQuizElement("divr", container, "wrapper");
	addQuizElement("div", wrapper, "title", question.text);

	// create options container
	const options = addQuizElement("div", wrapper, "options");

	// create option elements
	question.options.forEach((option, oIndex) => {
		const optionElement = addQuizElement("div", options, "option");
		const inputElement = addQuizElement("input", optionElement, question, option);
		const labelElement = addQuizElement("label", optionElement, "option-text", option.text);

		// for attribute to link label and input
		const forId = `${qIndex}` + `${oIndex}`;
		inputElement.id = forId;
		labelElement.htmlFor = forId;
	});
});

// create submit button
const submitBtn = addQuizElement("button", container, "button submit", "Submit");

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
		questions: selected.questions,
	};

	// store result
	selectedQuiz.value = result;
	storage.results.push(result);
	localStorage.setItem("storage", JSON.stringify(storage));

	// redirect to result page
	window.location.href = "/quiz/result";
});

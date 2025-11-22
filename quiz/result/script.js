import { selectedQuiz, addQuizElement } from "/components.js";

// DOM elements
const container = document.getElementById("container");

// Load selected quiz
const selected = selectedQuiz.value;

// result text
const resultText = `Your result: ${selected.summary} / ${selected.answers.length}`;

// create title element
addQuizElement("div", container, "title main", selected.title);

// create summary element
addQuizElement("div", container, "title", resultText);

selected.questions.forEach((question, qIndex) => {
	// create question title element
	const wrapper = addQuizElement("divr", container, "wrapper");
	addQuizElement("div", wrapper, "title", question.text);

	// create options container
	const options = addQuizElement("div", wrapper, "options");

	// create option elements
	question.options.forEach((option, oIndex) => {
		let checked = false;
		const optionElement = addQuizElement("div", options, "option");
		if (selected.answers[qIndex].includes(oIndex)) {
			checked = true;
		}
		const inputElement = addQuizElement(
			"input",
			optionElement,
			question,
			option,
			checked,
			true
		);
		const labelElement = addQuizElement("label", optionElement, "option-text", option.text);

		if (checked) {
			optionElement.classList.add("selected");
		}
		if (option.isCorrect) {
			optionElement.classList.add("correct");
		}
	});
});

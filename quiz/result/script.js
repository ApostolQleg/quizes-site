import { selectedQuiz, addQuizElement } from "/components.js";

const container = document.getElementById("container");

const selected = selectedQuiz.value;

addQuizElement("div", "title", selected.title, container);

addQuizElement(
	"div",
	"title",
	`Your result: ${selected.summary} / ${selected.answers.length}`,
	container
);

import { selectedQuiz, addQuizElement } from "/components.js";

const container = document.getElementById("container");

const selected = selectedQuiz.value;

const title = addQuizElement("div", "title", selected.title, container);
title.id = "title";

addQuizElement(
	"div",
	"title",
	`Your result: ${selected.summary} / ${selected.answers.length}`,
	container
);

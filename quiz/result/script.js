import { selectedQuiz, addQuizElement } from "/components.js";

// DOM elements
const container = document.getElementById("container");

// Load selected quiz
const selected = selectedQuiz.value;

// result text
const resultText = `Your result: ${selected.summary} / ${selected.answers.length}`;

// create title element
addQuizElement("div", "title main", selected.title, container);

// create summary element
addQuizElement("div", "title", resultText, container);

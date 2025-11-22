import { storage, addQuizElement, addInputElement, addQuestionElement } from "/components.js";

// DOM elements
const container = document.getElementById("container");

// create div to hold title input, charcount and clearing button
const titleContainer = addQuizElement("div", container, "container title-container");

// create this elements inside title container
addInputElement(titleContainer, "input", "Назва вікторини");
addQuizElement("div", titleContainer, "char-count", "0/30");
addQuizElement("button", titleContainer, "button", "Очистити");

// create input for description
addInputElement(container, "input description", "Опис вікторини");

// create button to add question element
const addQuestionBtn = addQuizElement("button", container, "button add-question", "Додати питання");

// add question button functionality
addQuestionBtn.onclick = () => {
	addQuestionElement(wrapper);
};

// create wrapper to hold questions
const wrapper = addQuizElement("div", container, "questions-wrapper");

// add first question by default
addQuestionElement(wrapper);

// create button to submit quiz
addQuizElement("button", container, "button create-quiz", "Створити вікторину");

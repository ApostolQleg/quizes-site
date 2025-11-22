import { storage, addQuizElement, addInputElement } from "/components.js";

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
addQuizElement("button", container, "button add-question", "Додати питання");

// create wrapper to hold questions
const wrapper = addQuizElement("div", container, "questions-wrapper");

// create div to hold each question
const questionContainer = addQuizElement("div", wrapper, "container question-container");

// create elements inside question container

// create wrapper for question text and delete question button
const questionTextWrapper = addQuizElement(
	"div",
	questionContainer,
	"container question-text-wrapper"
);

// create elements inside question text wrapper
addQuizElement("label", questionTextWrapper, "question-text", "Питання 1");
addQuizElement("button", questionTextWrapper, "button delete-question", "Видалити");

// create input for question text
addInputElement(questionContainer, "input question-text", "Текст питання");

// create div to hold answers and add answer button
const answersContainer = addQuizElement("div", questionContainer, "container answers-container");

// create answer elements inside answers container
addQuizElement("label", answersContainer, "answer-text", "Варіанти відповіді");

// div for first answer, with checkbox, text input and delete button
const answerContainer = addQuizElement("div", answersContainer, "container answer-container");

// create elements inside answer container
addQuizElement("input", answerContainer, "input correct-answer");
addInputElement(answerContainer, "input answer-text", "Текст відповіді");
addQuizElement("button", answerContainer, "button delete-answer", "Видалити");

// div for second answer, with checkbox, text input and delete button
const answerContainer2 = addQuizElement("div", answersContainer, "container answer-container");
// create elements inside answer container
addQuizElement("input", answerContainer2, "input correct-answer");
addInputElement(answerContainer2, "input answer-text", "Текст відповіді");
addQuizElement("button", answerContainer2, "button delete-answer", "Видалити");

// create button to add answer
addQuizElement("button", answersContainer, "button add-answer", "Додати відповідь");

// create button to create quiz
addQuizElement("button", container, "button create-quiz", "Створити вікторину");

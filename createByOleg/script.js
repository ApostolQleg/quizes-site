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

// create button to create quiz
const createQuizBtn = addQuizElement(
	"button",
	container,
	"button create-quiz",
	"Створити вікторину"
);

// create button functionality
createQuizBtn.onclick = () => {
	// gather quiz data
	const quiz = {
		title: titleContainer.querySelector(".input").value,
		description: container.querySelector(".input.description").value,
		questions: [],
	};

	// gather questions data
	const questionContainers = wrapper.querySelectorAll(".container.question-container");
	questionContainers.forEach((qContainer) => {
		const questionText = qContainer.querySelector(".input.question-text").value;
		const question = {
			text: questionText,
			options: [],
		};

		// gather options data
		const optionContainer = [...qContainer.querySelectorAll(".container.option-container")];
		optionContainer.forEach((oContainer, oIndex) => {
			const optionText = oContainer.querySelector(".input.option-text").value;
			const isCorrect = oContainer.querySelector('input[type="radio"]').checked;
			const option = {
				id: oIndex,
				text: optionText,
				isCorrect: isCorrect,
			};
			question.options.push(option);
		});
		quiz.questions.push(question);
	});

	// save quiz to local storage
	storage.quizzes.push(quiz);
	localStorage.setItem("storage", JSON.stringify(storage));

	// redirect to home page
	window.location.href = "/";
};

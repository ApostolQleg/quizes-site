import { tests } from "./lstests.js";

// variables
export const storage = JSON.parse(localStorage.getItem("storage"));

let _selected = {};

export const selectedQuiz = {
	get value() {
		const saved = sessionStorage.getItem("selectedQuiz");
		return saved ? JSON.parse(saved) : _selected;
	},
	set value(newSelected) {
		_selected = newSelected;
		sessionStorage.setItem("selectedQuiz", JSON.stringify(newSelected));
	},
};

// Initialize storage if not present
loadDefaultTests();

// functions related to adding elements
export function addQuizElement(
	element,
	parent,
	className = "",
	valueOrHTML = "",
	checked = false,
	disabled = false
) {
	const newElement = document.createElement(element);
	if (element === "input") {
		newElement.type = "radio";
		newElement.name = `q-${className.text}`;
		newElement.value = valueOrHTML.id;
		newElement.checked = checked;
		newElement.disabled = disabled;
	} else {
		newElement.className = className;
		newElement.innerHTML = valueOrHTML;
	}
	parent.appendChild(newElement);
	return newElement;
}

export function addInputElement(parent, className, placeholder = "") {
	const newElement = document.createElement("input");
	newElement.className = className;
	newElement.type = "text";
	newElement.placeholder = placeholder;
	parent.appendChild(newElement);
	return newElement;
}

export function addDescriptionButton(text, ref, quiz) {
	const wrapper = document.getElementsByClassName("description-buttons")[0];
	const button = addQuizElement("button", wrapper, "description-button", text);
	button.onclick = () => {
		if (ref === "/del") {
			storage.quizzes = storage.quizzes.filter((q) => q.title !== quiz.title);
			localStorage.setItem("storage", JSON.stringify(storage));
			window.location.reload();
		} else {
			selectedQuiz.value = quiz;
			window.location.href = ref;
		}
	};
}

function addAnswerElement(parent) {
	// div for first answer, with checkbox, text input and delete button
	const answerContainer = addQuizElement("div", parent, "container answer-container");

	// create elements inside answer container
	addQuizElement("input", answerContainer, "input correct-answer");
	addInputElement(answerContainer, "input answer-text", "Текст відповіді");
	const deleteBtn = addQuizElement("button", answerContainer, "button delete-answer", "Видалити");

	// delete answer functionality
	deleteBtn.onclick = () => {
		answerContainer.remove();
	};

	return answerContainer;
}

export function addQuestionElement(parent) {
	// create div to hold question
	const questionContainer = addQuizElement("div", parent, "container question-container");

	// create wrapper for question text and delete question button
	const questionTextWrapper = addQuizElement(
		"div",
		questionContainer,
		"container question-text-wrapper"
	);

	// create elements inside question text wrapper
	addQuizElement(
		"label",
		questionTextWrapper,
		"question-text",
		`Питання ${parent.children.length}`
	);

	// create delete question button
	const deleteQuestionBtn = addQuizElement(
		"button",
		questionTextWrapper,
		"button delete-question",
		"Видалити"
	);

	// delete question functionality
	deleteQuestionBtn.onclick = () => {
		questionContainer.remove();
	};

	// create input for question text
	addInputElement(questionContainer, "input question-text", "Текст питання");

	// create div to hold answers and add answer button
	const answersContainer = addQuizElement(
		"div",
		questionContainer,
		"container answers-container"
	);

	// create answer elements inside answers container
	addQuizElement("label", answersContainer, "answer-text", "Варіанти відповіді");

	// create two answer elements by default
	addAnswerElement(answersContainer);
	addAnswerElement(answersContainer);

	// create button to add answer
	const addAnswerButton = addQuizElement(
		"button",
		questionContainer,
		"button add-answer",
		"Додати відповідь"
	);

	// button functionality to add answer
	addAnswerButton.onclick = () => {
		addAnswerElement(answersContainer);
	};
}

// functions related to storage
export function loadDefaultTests() {
	if (!storage) {
		localStorage.setItem("storage", JSON.stringify(tests));
		window.location.reload();
	}
}

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
	classOrName = "",
	valueOrHTML = "",
	checked = false,
	disabled = false
) {
	const newElement = document.createElement(element);
	if (element === "input") {
		newElement.type = "radio";
		newElement.name = classOrName;
		newElement.value = valueOrHTML;
		newElement.checked = checked;
		newElement.disabled = disabled;
	} else {
		newElement.className = classOrName;
		newElement.innerHTML = valueOrHTML;
	}
	parent.appendChild(newElement);
	return newElement;
}

export function addInputElement(parent, className, placeholder = "", value = "") {
	const newElement = document.createElement("input");
	newElement.className = className;
	newElement.type = "text";
	newElement.placeholder = placeholder;
	newElement.value = value;
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

function addOptionElement(parent, name, value = "") {
	// div for first answer, with checkbox, text input and delete button
	const optionContainer = addQuizElement("div", parent, "container option-container");

	// create elements inside option container
	addQuizElement("input", optionContainer, name, name);
	addInputElement(optionContainer, "input option-text", "Текст відповіді", value);
	const deleteBtn = addQuizElement("button", optionContainer, "button delete-option", "Видалити");

	// delete option functionality
	deleteBtn.onclick = () => {
		optionContainer.remove();
	};

	return optionContainer;
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
	addQuizElement("label", questionTextWrapper, "question-text");

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
		updateQuestionNumbers(parent);
	};

	// create input for question text
	addInputElement(questionContainer, "input question-text", "Текст питання");

	// create div to hold options and add option button
	const optionsContainer = addQuizElement(
		"div",
		questionContainer,
		"container options-container"
	);

	// create option elements inside options container
	addQuizElement("label", optionsContainer, "options-text", "Варіанти відповіді");

	// update number of question
	updateQuestionNumbers(parent);

	// get question id for naming options (to group radio buttons)
	const questionId = questionContainer.id;

	// create two option elements by default
	addOptionElement(optionsContainer, questionId, "Так");
	addOptionElement(optionsContainer, questionId, "Ні");

	// create button to add option
	const addOptionButton = addQuizElement(
		"button",
		questionContainer,
		"button add-option",
		"Додати відповідь"
	);

	// button functionality to add option
	addOptionButton.onclick = () => {
		addOptionElement(optionsContainer, questionId);
	};
}

// something specific for updating question numbers in createByOleg
function updateQuestionNumbers(parent) {
	const questionContainers = parent.querySelectorAll(".question-container");
	questionContainers.forEach((container, index) => {
		const questionLabel = container.querySelector(".question-text");
		questionLabel.textContent = `Питання №${index + 1}`;
		container.id = index;
	});
}

// functions related to storage
export function loadDefaultTests() {
	if (!storage) {
		localStorage.setItem("storage", JSON.stringify(tests));
		window.location.reload();
	}
}

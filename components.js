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

// DOM related functions
export function addDescriptionButton(id, text, ref, quiz) {
	const button = document.createElement("button");
	button.id = id; // я додав id тимчасово, коли Бодя переробить по умному, можна буде видалить
	button.className = "description-button";
	button.innerText = text;
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
	description.appendChild(button);
}

export function addQuizElement(element, className, innerHTML, parent, value, name) {
	if (element === "div") {
		const divElement = document.createElement("div");
		divElement.className = className;
		divElement.innerHTML = innerHTML;
		parent.appendChild(divElement);
		return divElement;
	} else if (element === "input") {
		const inputElement = document.createElement("input");
		inputElement.type = "checkbox";
		inputElement.name = `q-${name.text}`;
		inputElement.value = value.id;
		parent.appendChild(inputElement);
		return inputElement;
	} else if (element === "label") {
		const labelElement = document.createElement("label");
		labelElement.className = className;
		labelElement.innerHTML = innerHTML;
		parent.appendChild(labelElement);
		return labelElement;
	}
}

// functions related to storage
export function loadDefaultTests() {
	if (!storage) {
		localStorage.setItem("storage", JSON.stringify(tests));
		window.location.reload();
	}
}

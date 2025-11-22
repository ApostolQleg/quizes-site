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

export function addQuizElement(element, className, valueOrHTML, parent) {
	const newElement = document.createElement(element);
	if (element === "div" || element === "label") {
		newElement.className = className;
		newElement.innerHTML = valueOrHTML;
	} else if (element === "input") {
		newElement.type = "checkbox";
		newElement.name = `q-${className.text}`;
		newElement.value = valueOrHTML.id;
	}
	parent.appendChild(newElement);
	return newElement;
}

// functions related to storage
export function loadDefaultTests() {
	if (!storage) {
		localStorage.setItem("storage", JSON.stringify(tests));
		window.location.reload();
	}
}

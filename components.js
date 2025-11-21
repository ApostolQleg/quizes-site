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
		localStorage.setItem("storage", JSON.stringify(storage));

		if (ref === "/del") {
			storage.quizzes = storage.quizzes.filter((q) => q.title !== quiz.title);
			localStorage.setItem("storage", JSON.stringify(storage));
			window.location.reload();
		} else {
			selectedQuiz.value = quiz;
			console.log("Selected Quiz set to: ", JSON.stringify(selectedQuiz.value));
			window.location.href = ref;
		}
	};
	description.appendChild(button);
	return button;
}

// functions related to storage
export function loadDefaultTests() {
	!storage ? localStorage.setItem("storage", JSON.stringify(tests)) : null;
}

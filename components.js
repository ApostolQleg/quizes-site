import { tests } from "./lstests.js";

// variables
export const storage = JSON.parse(localStorage.getItem("storage"));
export let selected = {};

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
			updateStorage(storage);
			window.location.reload();
		} else {
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

export function updateStorage(newStorage) {
	localStorage.setItem("storage", JSON.stringify(newStorage));
}

export function setSelectedQuiz(quiz) {
	selected = quiz;
	console.log("Selected quiz set to:", JSON.stringify(selected));
}

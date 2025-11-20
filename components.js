import { tests } from "./lstests.js";

export const storage = JSON.parse(localStorage.getItem("storage"));

export function addDescriptionButton(id, text) {
	const button = document.createElement("button");
	button.id = id; // я додав id тимчасово, коли Бодя переробить по умному, можна буде видалить
	button.className = "description-button";
	button.innerText = text;
	description.appendChild(button);
	return button;
}

export function loadDefaultTests() {
	!storage ? localStorage.setItem("storage", JSON.stringify(tests)) : null;
}

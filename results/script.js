import { storage, selectedQuiz, addQuizElement } from "/components.js";

// DOM elements
const container = document.getElementById("container");

// Load and create result buttons from localStorage
const results = storage?.results || [];

results.forEach((result) => {
	// Format date and time
	const formattedDateTime = new Date(result.timestamp).toLocaleDateString("uk-UA", {
		month: "2-digit",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});

	// constant for button text
	const buttonText = result.title + "<p>" + formattedDateTime + "</p>";

	// Create button element
	const button = addQuizElement("button", container, "quiz", buttonText);

	// button functionality
	button.addEventListener("click", () => {
		// Load the selected result
		selectedQuiz.value = result;
		window.location.href = "/quiz/result";
	});
});

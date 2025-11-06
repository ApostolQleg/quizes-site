const container = document.getElementById("container");
const create = document.getElementById("create");

// Load quizzes from localStorage and create quiz buttons
const results = JSON.parse(localStorage.getItem("storage"))?.quizzes || [];

results.forEach((result) => {
	const button = document.createElement("button");
	button.className = "quiz";
	button.innerHTML =
		result.title + "<br>By: " + result.author + "<br>Questions: " + result.questions.length;
	container.appendChild(button);
});

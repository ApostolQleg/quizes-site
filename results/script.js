const container = document.getElementById("container");
const create = document.getElementById("create");

// Load and create result buttons from localStorage
const storage = JSON.parse(localStorage.getItem("storage")) || {};
const results = storage?.results || [];

results.forEach((result) => {
	const button = document.createElement("button");
	button.className = "quiz";
	button.innerHTML = result.title;
	container.appendChild(button);
});

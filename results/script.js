const container = document.getElementById("container");
const create = document.getElementById("create");

// Load and create result buttons from localStorage
const storage = JSON.parse(localStorage.getItem("storage")) || {};
const results = storage?.results || [];

results.forEach((result) => {
	const date = new Date(result.timestamp);
    
    const formattedDateTime = date.toLocaleDateString('uk-UA', {    //date and time formatting
        month: '2-digit',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

	const button = document.createElement("button");
	button.className = "quiz";
	button.innerHTML = result.title + '<p>' + formattedDateTime;
	container.appendChild(button);

	// button functionality
	button.addEventListener("click", () => {
		// Load the selected result
		storage.selected = result;
		localStorage.setItem("storage", JSON.stringify(storage));
		window.location.href = "/quiz/result";
	});
});

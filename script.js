const container = document.getElementById("container");
const createBtn = document.getElementById("create");
const manageBtn = document.getElementById("manage");
const resultsBtn = document.getElementById("results");

// button functionality
createBtn.addEventListener("click", function () {
	// Create button functionality
	window.location.href = "create/create.html";
});

manageBtn.addEventListener("click", function () {
	// Manage button functionality
	window.location.href = "manage/manage.html";
});

resultsBtn.addEventListener("click", function () {
	// Results button functionality
	window.location.href = "results/results.html";
});

const container = document.getElementById("container");
const create = document.getElementById("create");

const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

// create quiz buttons size
quizzes.forEach((quiz) => {
	const button = document.createElement("button");
	button.className = "quiz";
	button.innerHTML = quiz.title + "<br>By: " + quiz.author + "<br>Questions: " + quiz.questions;
	container.appendChild(button);
	// Start quiz on button click
	button.addEventListener("click", () => {
		// Load the selected quiz
		const selectedQuiz = quiz;
		localStorage.setItem("currentQuiz", JSON.stringify(selectedQuiz));
		window.location.href = "/quiz";
	});
});

// Load quizzes from localStorage
// localStorage.setItem(
// 	"quizzes",
// 	JSON.stringify([
// 		{
// 			title: "Is Bogdan gay?",
// 			author: "Oleg",
// 			questions: 1,
// 		},
// 		{
// 			title: "Yes he is",
// 			author: "Oleg",
// 			questions: 2,
// 		},
// 		{
// 			title: "And I quite like it",
// 			author: "Oleg",
// 			questions: 3,
// 		},
// 		{
// 			title: "If you know what I mean",
// 			author: "Oleg",
// 			questions: 4,
// 		},
// 		{
// 			title: "You know what I mean",
// 			author: "Oleg",
// 			questions: 5,
// 		},
// 		{
// 			title: "And we all know it",
// 			author: "Oleg",
// 			questions: 6,
// 		},
// 	])
// );

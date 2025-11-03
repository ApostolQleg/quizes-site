const correctAnswer = "A";

localStorage.setItem(
	"quizzes",
	JSON.stringify([
		{
			title: "Is Bogdan gay?",
			author: "Oleg",
			questions: 1,
			index: 0,
		},
		{
			title: "Yes he is",
			author: "Oleg",
			questions: 2,
			index: 1,
		},
		{
			title: "And I quite like it",
			author: "Oleg",
			questions: 3,
			index: 2,
		},
		{
			title: "If you know what I mean",
			author: "Oleg",
			questions: 4,
			index: 3,
		},
		{
			title: "You know what I mean",
			author: "Oleg",
			questions: 5,
			index: 4,
		},
		{
			title: "And we all know it",
			author: "Oleg",
			questions: 6,
			index: 5,
		},
	])
);


const quizzes = localStorage.getItem("quizzes") || [];



localStorage.set

const submitBtn = document.getElementById("submit");
const result = document.getElementById("result");
const form = document.getElementById("quiz-form");
const total = document.getElementById("total");
const container = document.getElementById("container");
container.appendChild(total);

submitBtn.addEventListener("click", () => {
  const selected = form.answer.value; // отримаємо вибраний варіант
  let totalScore = 0;
  if (!selected) {
    result.textContent = "Вибери варіант відповіді!";
    result.style.color = "orange";
    return;
  }
  if (selected === correctAnswer) {
    result.textContent = "Правильно";
    result.style.color = "green";
    totalScore += 1;
    total.textContent = totalScore + " / 1";
  } else {
    result.textContent = "Неправильно";
    result.style.color = "red";
    total.textContent = totalScore + " / 1";
  }
});
const correctAnswer = "A";

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
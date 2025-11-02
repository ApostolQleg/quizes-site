  const correctAnswer = "A";

  const submitBtn = document.getElementById("submit");
  const result = document.getElementById("result");
  const form = document.getElementById("quiz-form");

  submitBtn.addEventListener("click", () => {
    const selected = form.answer.value; // отримаємо вибраний варіант

    if (!selected) {
      result.textContent = "Вибери варіант відповіді!";
      result.style.color = "orange";
      return;
    }

    if (selected === correctAnswer) {
      result.textContent = "Правильно";
      result.style.color = "green";
    } else {
      result.textContent = "Неправильно";
      result.style.color = "red";
    }
  });
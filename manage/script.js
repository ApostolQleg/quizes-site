const container = document.querySelector(".container");
const storage = JSON.parse(localStorage.getItem("storage"));

// перевірка який квіз натиснули для редагування
const title = storage.quizzes.selected.title;
console.log(title);


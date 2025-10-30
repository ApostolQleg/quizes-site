const addQuestion = document.getElementById("addquestion");
const container = document.getElementById("container");
const saveQuizButton = document.getElementById("saveQuizButton");

addQuestion.addEventListener("click", () => {
    alert("Додано нове питання!");
	const question = document.createElement("div");
    saveQuizButton.insertAdjacentElement("beforebegin", question);
	question.className = "quizzesContainer";
	question.innerHTML = `
		<p class="questionNum">Запитання</p>
				<input type="text" class="questionText" placeholder="Текст питання" />
				<p class="variant">Варіанти відповіді</p>
				<style>
					.material-symbols-outlined {
						font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
					}
				</style>
				<label>
					<input type="checkbox" name="option1" value="1" id=" true" /><input
						type="text"
						id="questionText"
						placeholder="Варіант відповіді"
						value="Так"
					/>
				</label>
				<label>
					<input type="checkbox" name="option1" value="1" id=" false" /><input
						type="text"
						id="questionText"
						placeholder="Варіант відповіді"
						value="Ні"
					/>
				</label>

				<!-- Тут будуть відображатися створені опитування -->
				 <button class="addvariant" id="addvariant">+</button>
	`;
	container.appendChild(question);
});


				
			

// Нагенеровано ШІ, але виглядає красиво і зрозуміло (спробуйте відредагувати і покращити)


// function addQuiz(
// 	{ id = "", title = "Untitled", description = "", author = "", questions = 0 } = {},
// 	onTake
// ) {
// 	const quiz = document.createElement("div");
// 	quiz.className = "quiz";
// 	if (id) quiz.dataset.id = id;

// 	const title = document.createElement("h3");
// 	title.textContent = title;

// 	const desc = document.createElement("p");
// 	desc.textContent = description;

// 	const meta = document.createElement("small");
// 	meta.textContent = `${questions} question${questions !== 1 ? "s" : ""}${
// 		author ? " · " + author : ""
// 	}`;

// 	const btn = document.createElement("button");
// 	btn.type = "button";
// 	btn.textContent = "Take quiz";
// 	btn.addEventListener("click", () => {
// 		if (typeof onTake === "function") {
// 			onTake(id);
// 		} else if (id) {
// 			// default action: navigate to quiz page with id
// 			window.location.href = `quiz.html?id=${encodeURIComponent(id)}`;
// 		} else {
// 			console.warn("No onTake handler and no quiz id provided.");
// 		}
// 	});

// 	quiz.appendChild(title);
// 	quiz.appendChild(desc);
// 	quiz.appendChild(meta);
// 	quiz.appendChild(btn);

// 	container.appendChild(quiz);
// 	return quiz;
// }

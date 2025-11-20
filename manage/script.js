import { storage } from "/components.js";
import { addVariant, addOption } from "../create/reusable.js";

const container = document.querySelector(".container");
const saveQuizButton = document.getElementById("saveQuizButton");
// перевірка який квіз натиснули для редагування
const title = storage.selected.title;
const currentQuiz = storage.quizzes.find((quiz) => quiz.title === title);
const quizTitle = document.querySelector(".quizTitle");
const quizDescriptionInput = document.querySelector(".quizDescriptionInput");
const optionsCount = currentQuiz.questions.length;
const charCount = document.querySelector(".charCount");

quizTitle.value = currentQuiz.title;

let quizTitleLenght = quizTitle.value.length;
charCount.textContent = `${quizTitleLenght}/30`;
quizTitle.addEventListener("input", () => {
	quizTitleLenght = quizTitle.value.length;
	charCount.textContent = `${quizTitleLenght}/30`;
});

quizDescriptionInput.value = currentQuiz.description;
let counter = 1;
for (let question of currentQuiz.questions) {
	const questionTitle = question.text;

	const create = document.createElement("div");
	create.className = "quizzesContainer";
	create.innerHTML = `<button class="material-symbols-outlined" id="deletequestion" class="deletequestion">delete</button>
		<p class="questionNum">Запитання №${counter}</p>
				<input type="text" class="questionText" placeholder="Текст питання" value = '${questionTitle}'/>
				<p class="variant">Варіанти відповіді</p>
				<style>
					.material-symbols-outlined {
						font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
					}
				</style>
				<!-- Тут будуть відображатися створені опитування -->
				 <button class="addvariant" id="addvariant">+</button>`;
	container.appendChild(create);
	saveQuizButton.before(create);
	for (let option of question.options) {
		let prev = create.querySelector(".addvariant");
		let optionVal = document.createElement("label");
		optionVal.className = "options";
		optionVal.innerHTML = `<label>
					<input type="checkbox" name="option1" value="checked" class="isCorrect" /><input
						type="text"
						class="optionText"
						placeholder="Варіант відповіді"
						value="${option.text}"
					/>
                    <button class="material-symbols-outlined" id="deletevariant">delete</button>
				</label>`;
		// якщо потрібно, щоб option був вибраний
		const checkbox = optionVal.querySelector(".isCorrect");

		if (option.isCorrect) {
			checkbox.checked = true;
		}
		prev.before(optionVal);
		console.log(prev);
	}
	counter++;
}

// додавання нового варіанту відповіді
container.addEventListener("click", (el) => {
	if (el.target.matches("#addquestion")) {
		addVariant(counter);
		counter++;
		console.log("ljhjkhkjjlkj");
	}
});

container.addEventListener("click", (el) => {
	//видалення запитання
	if (el.target.matches("#deletequestion") && counter > 2) {
		el.target.closest(".quizzesContainer").remove();
		counter--;

		let cuestionNum = document.querySelectorAll(".questionNum");
		cuestionNum.forEach((value, index) => {
			value.textContent = `Запитання №${index + 1}`;
		});
	}

	//видалення option
	let thisContainer = el.target.closest(".quizzesContainer");
    let delOption = thisContainer.querySelectorAll('#deletevariant').length;
    if (el.target.matches('#deletevariant') && delOption > 2) {

        el.target.closest('label').remove();
        
    };

    //додавання option
    if (el.target.matches('.addvariant')) {
       addOption(el);
	};
});

// console.log(optionsCount);

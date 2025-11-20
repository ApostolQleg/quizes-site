import { storage } from "/components.js";

const addQuestion = document.getElementById("addquestion");
const container = document.getElementById("container");
const quizzesContainer = document.getElementById("quizzesContainer");
let counter = 2;
const localStorageNull = {
	quizzes: [],
	results: [],
};

// Add new question on button click
addQuestion.addEventListener("click", () => {
	const question = document.createElement("div");
	saveQuizButton.before(question);
	question.className = "quizzesContainer";
	question.innerHTML = `
		<button class="material-symbols-outlined" id="deletequestion" class="deletequestion">delete</button>
		<p class="questionNum">Запитання № ${counter}</p>
				<input type="text" class="questionText" placeholder="Текст питання" />
				<p class="variant">Варіанти відповіді</p>
				<style>
					.material-symbols-outlined {
						font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
					}
				</style>
				<label>
					<input type="checkbox" name="option1" value="1" class="isCorrect" /><input
						type="text"
						class="optionText"
						placeholder="Варіант відповіді"
						value="Так"
					/>
                    <button class="material-symbols-outlined" id="deletevariant">delete</button>
				</label>
				<label>
					<input type="checkbox" name="option1" value="1" class="isCorrect" /><input
						type="text"
						class="optionText"
						placeholder="Варіант відповіді"
						value="Ні"
					/>
                    <button class="material-symbols-outlined" id="deletevariant">delete</button>
				</label>

				<!-- Тут будуть відображатися створені опитування -->
				 <button class="addvariant" id="addvariant">+</button>
	`;
	counter++;
});

// Listen for ALL clicks inside the container
container.addEventListener("click", function (el) {
	// Handle different buttons/elements
	if (el.target.matches("#addvariant")) {
		const variant = document.createElement("div");
		variant.className = "variantContainer";
		variant.innerHTML = `
		<label>
					<input type="checkbox" name="option1" value="1" class="isCorrect" /><input
						type="text"
						class="optionText"
						placeholder="Варіант відповіді"
						value=""
					/>
                    <button class="material-symbols-outlined" id="deletevariant">delete</button>
				</label>
	`;

		el.target.closest(".quizzesContainer").insertBefore(variant, el.target);
	}

	if (el.target.matches("#deletequestion") && counter > 2) {
		el.target.closest(".quizzesContainer").remove();
		counter--;

		// for (let i = 1; i < counter; i++) {
		let questionNum = document.querySelectorAll(".questionNum");

		questionNum.forEach((num, index) => {
			num.textContent = `Запитання № ${index + 1}`;
		});
		// }
	}
	if (el.target.matches("#deletevariant")) {
		const thisContainer = el.target.closest(".quizzesContainer");

		if (thisContainer.querySelectorAll(".optionText").length > 2) {
			el.target.closest("label").remove();
		}
	}
});

// приклад роботи localstorage
//Блок коду для збереження тесту в localStorage
const inputValue = document.querySelectorAll("input:not([type=checkbox])");
const saveQuizButton = document.getElementById("saveQuizButton");
const input = document.querySelector(".quizTitle");
const reset = document.querySelector(".reset");
const description = document.querySelector(".quizDescriptionInput");
const charCount = document.querySelector(".charCount");

input.addEventListener("input", () => {
	input.style.width = "auto";
	input.style.width = input.scrollWidth + 1 + "px";
	charCount.textContent = `${input.value.length}/30`;

	if (input.value.length >= 30) {
		input.disabled = true;
	}
});

// description.addEventListener('input', () => {
// 	description.style.width = "auto";
// 	description.style.width = description.scrollWidth + 1 + 'px';
// });

reset.addEventListener("click", () => {
	input.value = "";
	input.disabled = false;
	charCount.textContent = `${input.value.length}/30`;
});

let question = {
	title: "",
	description: "",
	questions: [],
};

saveQuizButton.addEventListener("click", () => {
	const inputValueClick = document.querySelectorAll("input:not([type=checkbox])");
	let i = 0;
	for (let input of inputValueClick) {
		if (input.value.trim() === "") {
			input.classList.add("input-error");
		} else {
			input.classList.remove("input-error");
		}
		i++;
		console.log(i);
	}

	if (document.querySelectorAll(".input-error").length === 0) {
		alert("Quiz saved!");
		let localStorageParse = JSON.parse(localStorage.getItem("storage"));
		const quizzesContainer = document.querySelectorAll(".quizzesContainer");
		// const isCorrect = document.querySelector(".isCorrect").checked;
		// const questionNumber = question.questions.length;

		// пуш значень для main storage
		question.title = input.value;
		question.description = description.value;
		// пуш значень для questions
		quizzesContainer.forEach((quiz, num) => {
			const questionText = quiz.querySelector(".questionText").value;
			const options = quiz.querySelectorAll(".optionText");
			const isCorrect = quiz.querySelectorAll(".isCorrect");
			question.questions[num] = { text: questionText, options: [] };

			options.forEach((val, index) => {
				question.questions[num].options.push({
					text: val.value,
					id: index,
					isCorrect: isCorrect[index].checked, // Тут поки заглушка, потім переробити
				});
			});
		});

		//додавання в локал сторедж

		if (!localStorageParse) {
			localStorageNull.quizzes.push(question);
			localStorage.setItem("storage", JSON.stringify(localStorageNull));
		} else {
			localStorageParse.quizzes.push(question);
			localStorage.setItem("storage", JSON.stringify(localStorageParse));
		}
		window.location.href = "../";
	} else {
		alert("Заповни поля");
	}
});

// });

// створив локал для сторінки мейн
// перевірка чи є такий ключ в локал сторедж, якщо нема ми його створюємо
// let storage = JSON.parse(localStorage.getItem("storage"));
// if (!storage) {
// 	storage = {
// 		quizzes: [
// 			{
// 				title: "Тест з англійської мови (A1)",
// 				description: "Перевір свої базові знання англійських слів і граматики.",
// 				questions: [
// 					{
// 						text: "Яке з наведених слів означає 'кіт'?",
// 						options: [
// 							{ text: "dog", id: 1, isCorrect: false },
// 							{ text: "cat", id: 2, isCorrect: true },
// 							{ text: "bird", id: 3, isCorrect: false },
// 						],
// 					},
// 					{
// 						text: "Яке з наведених слів означає 'кіт'?",
// 						options: [
// 							{ text: "dog", id: 1, isCorrect: false },
// 							{ text: "cat", id: 2, isCorrect: true },
// 							{ text: "bird", id: 3, isCorrect: false },
// 						],
// 					},
// 				],
// 			},
// 		],
// 		results: [
// 			{
// 				timestamp: "2024-06-10T12:00:00Z",
// 				quizTitle: "Тест з англійської мови (A1)",
// 				summary: 2,
// 				answers: [[], []],
// 			},
// 		],
// 	};
// }
// let storageExample = {
// 	quizzes: [
// 		{
// 			title: "Тест з англійської мови (A1)",
// 			description: "Перевір свої базові знання англійських слів і граматики.",
// 			questions: [
// 				{
// 					text: "Яке з наведених слів означає 'кіт'?",
// 					options: [
// 						{ text: "dog", id: 1, isCorrect: false },
// 						{ text: "cat", id: 2, isCorrect: true },
// 						{ text: "bird", id: 3, isCorrect: false },
// 					],
// 				},
// 				{
// 					text: "Яке з наведених слів означає 'кіт'?",
// 					options: [
// 						{ text: "dog", id: 1, isCorrect: false },
// 						{ text: "cat", id: 2, isCorrect: true },
// 						{ text: "bird", id: 3, isCorrect: false },
// 					],
// 				},
// 			],
// 		},
// 	],
// 	results: [
// 		{
// 			timestamp: "2024-06-10T12:00:00Z",
// 			quizTitle: "Тест з англійської мови (A1)",
// 			summary: 2,
// 			answers: [[], []],
// 		},
// 	],
// };




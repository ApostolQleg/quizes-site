const addQuestion = document.getElementById("addquestion");
const container = document.getElementById("container");
//const saveQuizButton = document.getElementById("saveQuizButton");
const quizzesContainer = document.getElementById("quizzesContainer");
// const deleteQuestion = document.querySelectorAll(".deletequestion");
// const questionNum = quiz.querySelector('.questionNum');

let counter = 2;

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
					<input type="checkbox" name="option1" value="1" id=" true" /><input
						type="text"
						id="questionText"
						placeholder="Варіант відповіді"
						value=""
					/>
				</label>
	`;

		el.target.closest(".quizzesContainer").insertBefore(variant, el.target);
	}

	if (el.target.matches("#deletequestion") && counter > 2) {
		el.target.closest(".quizzesContainer").remove();
		counter--;

		for (let i = 1; i < counter; i++) {
			let questionNum = document.querySelectorAll(".questionNum");

			questionNum.forEach((num, index) => {
				num.textContent = `Запитання № ${index + 1}`;
			});
		}
	}
});

// приклад роботи localstorage
//Блок коду для збереження тесту в localStorage
const saveQuizButton = document.getElementById("saveQuizButton");
const input = document.querySelector(".quizTitle");
const questionName = document.querySelector(".questionText");
// перевірка чи є такий ключ в локал сторедж, якщо нема ми його створюємо

// створив локал для сторінки мейн
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

let question = {
	title: "Тест з англійської мови (A1)",
	description: "Перевір свої базові знання англійських слів і граматики.",
	questions: [
		{
			text: "Яке з наведених слів означає 'кіт'?",
			options: [
				{ text: "dog", id: 1, isCorrect: false },
				{ text: "cat", id: 2, isCorrect: true },
				{ text: "bird", id: 3, isCorrect: false },
			],
		},
		{
			text: "Яке з наведених слів означає 'кіт'?",
			options: [
				{ text: "ckok", id: 1, isCorrect: false },
				{ text: "lok", id: 2, isCorrect: true },
				{ text: "dick", id: 3, isCorrect: false },
			],
		},
	],
};

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

// alert(JSON.stringify(question.questions[1].options.push({ text: "new", id: 4, isCorrect: false })))
// alert(JSON.stringify(question.questions[1].options))
// alert(question.questions[1].options.length)

saveQuizButton.addEventListener("click", () => {
	const isCorrect = document.querySelector(".isCorrect").checked;
	const questionNumber = question.questions.length;

	// alert(isCorrect);

	// пуш значень для main storage
	// quiz.title
	question.title = input.value;
	question.description = input.value;
	// пуш значень для questions
	const questionText = document.querySelectorAll(".questionText");
	questionText.forEach((val1, index1) => {
		question.questions[index1] = { text: val1.value, options: [] };

		// options: [];
		let quest = document.querySelectorAll("#questionText");
		quest.forEach((val, index) => {
			question.questions[index1].options.push({
				text: val.value,
				id: index + 1,
				isCorrect: isCorrect,
			});
		});
	});
	alert(JSON.stringify(question));
	// 	// question.questions = {
	// 	// 	text: questionName.value,
	// 	// };
	// 	question.questions = {
	// 		options: [
	// 			{
	// 				text: val.value,
	// 				id: index + 1,
	// 				isCorrect: isCorrect,
	// 			},
	// 		],
	// 	};
	// });

	console.log(JSON.stringify(question));

	// let quest = document.querySelectorAll("#questionText");
	// quest.forEach((val, index) => {
	// 	// question.questions = {
	// 	// 	text: questionName.value,
	// 	// };
	// 	let newval = {
	// 		text: val.value,
	// 		id: index + 1,
	// 		isCorrect: isCorrect,
	// 	};
	// 	question.questions.options = [].push(newval);
	// });
	// console.log(JSON.stringify(question));

	// console.log(quest.questions);

	// quest.forEach((q, index) => {
	// 	question.questions[index] = { text: q.value, options: [] };
	// });

	// for (let i = 1; i < counter; i++) {
	// 		let questionNum = document.querySelectorAll(".questionNum");

	// 		questionNum.forEach((num, index) => {
	// 			num.textContent = `Запитання № ${index + 1}`;
	// 		});
	// 	}
	// }
	// question.questions[0].text.push(description.value);

	// console.log(question);

	// //додаю в локалсторедж
	// localStorage.setItem("storage", JSON.stringify(storage));
	// const output = JSON.parse(localStorage.getItem("storage"));

	// console.log(output);

	// пуш значеня в quiz storage
});

// Creating modules
// document.getElementById('create-module').addEventListener('click', function() {
//   const module = document.createElement('div');
//   module.className = 'module';
//   module.innerHTML = `
//     <button class="module-button">Action</button>
//     <button class="close-button">Close</button>
//   `;
//   container.appendChild(module);
// });

// container.addEventListener("click", (event) => {
//   if (event.target.classList.contains("deletequestion")) {
//     const question = event.target.closest(".quizzesContainer");
//     question.remove(); // видаляємо той самий блок
//   }
// });

// const addVariant = document.querySelectorAll("#addvariant");
// addVariant.forEach(button => {
// 	button.addEventListener("click", () => {
// 		const variant = document.createElement("div");
// 		variant.className = "variantContainer";
// 		variant.innerHTML = `
// 		<label>
// 		<input type="checkbox" name="option1" value="1" id=" false" /><input
// 			type="text"
// 			id="questionText"
// 			placeholder="Варіант відповіді"
// 			value=""
// 		/>
// 	</label>
// 	`;
// 	container.appendChild(variant);
// });
// });

// const questionEl = document.getElementsByClassName("quizzesContainer");
//  // або .deletequestion якщо заміниш id на class
// questionEl.addEventListener("click", () => {
//   questionEl.remove(); // видаляє саме той блок, де натиснули кнопку
// });

// const delBtn = question.querySelector("deletequestion"); // або .deletequestion якщо заміниш id на class
// delBtn.addEventListener("click", () => {
//   question.remove(); // видаляє саме той блок, де натиснули кнопку
// });

// deleteQuestion.forEach(deleteQuestion => {
// 	deleteQuestion.addEventListener("click", () => {
// 		alert("Delete last question");
// 		// const questions = document.getElementsByClassName("quizzesContainer");
// 		// if (questions.length > 1) {
// 		// 	const lastQuestion = questions[questions.length - 1];
// 	// 	lastQuestion.remove();
// 	// 	counter--;
// 	// }
// 	});
// });

// {
//   "testTitle": "Тест з англійської мови (A1)",
//   "description": "Перевір свої базові знання англійських слів і граматики.",
//   "author": "Vladyslav Ivannykov",
//   "questions": [
//     {
//       "id": 1,
//       "questionText": "Яке з наведених слів означає 'кіт'?",
//       "answers": [
//         { "id": 1, "text": "dog", "isCorrect": false },
//         { "id": 2, "text": "cat", "isCorrect": true },
//         { "id": 3, "text": "bird", "isCorrect": false }
//       ],
//       "explanation": "Слово 'cat' перекладається як 'кіт'."
//     },
//     {
//       "id": 2,
//       "questionText": "Оберіть усі правильні речення у Present Simple:",
//       "answers": [
//         { "id": 1, "text": "He go to school every day.", "isCorrect": false },
//         { "id": 2, "text": "He goes to school every day.", "isCorrect": true },
//         { "id": 3, "text": "They play football on Sundays.", "isCorrect": true }
//       ],
//       "explanation": "У Present Simple дієслово з -s додається лише для he/she/it."
//     }
//   ],
//   "settings": {
//     "shuffleQuestions": true,
//     "shuffleAnswers": true,
//     "timeLimit": 300
//   }
// }

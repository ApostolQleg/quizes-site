const addQuestion = document.getElementById("addquestion");
const container = document.getElementById("container");
//const saveQuizButton = document.getElementById("saveQuizButton");

const quizzesContainer = document.getElementById("quizzesContainer");
// const deleteQuestion = document.querySelectorAll(".deletequestion"); 
// 
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
	// container.appendChild(question);
});






















// Listen for ALL clicks inside the container
container.addEventListener('click', function(el) {
  
  // Handle different buttons/elements
  if (el.target.matches('#addvariant')) {
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

	el.target.closest('.quizzesContainer').insertBefore(variant, el.target);
  }

  if (el.target.matches('#deletequestion') && counter > 2) {
    el.target.closest('.quizzesContainer').remove();
	counter--;

	for (let i = 1; i < counter; i++) {
		//  if (el.target.matches('.questionNum')) {
		// alert(i);
		let questionNum = document.querySelectorAll('.questionNum');

		questionNum.forEach((num, index) => {
			// alert(index);
			num.textContent = `Запитання № ${index + 1}`;
		});

	// }
  }
} 
});


// приклад роботи localstorage


//Блок коду для збереження тесту в localStorage

const saveQuizButton = document.getElementById("saveQuizButton");
const input = document.querySelector('.quizTitle');
const questionName = document.querySelector('.questionText');
// перевірка чи є такий ключ в локал сторедж, якщо нема ми його створюємо
// створив локал для сторінки мейн
let manageQuiz = JSON.parse(localStorage.getItem('manageQuizes'));
if (!manageQuiz){
	manageQuiz = {
	title: ["англ тест"],
	author: ["Vlad"],
	questions: [10,],
	index: [0],
	};
};

// // створення локал для сторінкии з питаннями 
// поки не готовий код
const questionsData = {
	"mixed": true,
  "questions": [
    {
      "id": 0,
      "questionText": "",
      "variants": [],
      "rightAnswers": [],
      "questionType": "",
    },
  ]
}



// "mixed": true,
//   "questions": [
//     {
//       "id": 0,
//       "questionText": "Яка столиця Франції?",
//       "variants": ["Париж", "Лондон", "Берлін", "Рим"],
//       "rightAnswers": [0],
//       "questionType": "Ticker"
//     },
//     {
//       "id": 1,
//       "questionText": "Скільки буде 2+2?",
//       "variants": ["3", "4", "5"],
//       "rightAnswers": [1],
//       "questionType": "Ticker"
//     }
//   ]


const indexCounters = manageQuiz.index; 
let indexCounter = indexCounters[indexCounters.length - 1];

saveQuizButton.addEventListener('click', () => {
	indexCounter++;
	// //створення об'єкту для збереження даних
	// // 	два об'єкти: 1. для збереження інформації про опитування(home) 2. для перетворення в JSON

	// const storedData = {};
	// storedData.title = input.value;
	

	// //перетягування в localStorage
	// localStorage.setItem('quizTitle', JSON.stringify(storedData));
	// const output = JSON.parse(localStorage.getItem('quizTitle'));
	
	
	// alert(output.title);

	// пуш значень для main storage

	manageQuiz.title.push(input.value);
	manageQuiz.author.push('треба додати цю фічу');
	manageQuiz.questions.push(counter - 1);
	manageQuiz.index.push(indexCounter);


	//додаю в локалсторедж
	localStorage.setItem('manageQuizes', JSON.stringify(manageQuiz));
	const output = JSON.parse(localStorage.getItem('manageQuizes'));

	console.log(output);

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
//   "createdBy": "Vladyslav Ivannykov",
//   "questions": [
//     {
//       "id": 1,
//       "questionText": "Яке з наведених слів означає 'кіт'?",
//       "questionType": "single", 
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
//       "questionType": "multiple",
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

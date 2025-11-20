export { test, addVariant, addOption };
function test() {
	console.log("This is a reusable function.");
}

function addVariant(counter) {
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
	// counter++;
};


const addOption = (el) => {
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
};

const Savequiz = () => {
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
};











//це гімно теж тут зроблю, щоб менше було кода
// 	if (document.querySelectorAll(".input-error").length === 0) {
// 		alert("Quiz saved!");
// 		let localStorageParse = JSON.parse(localStorage.getItem("storage"));
// 		const quizzesContainer = document.querySelectorAll(".quizzesContainer");
		
// 		// пуш значень для main storage
// 		question.title = input.value;
// 		question.description = description.value;
// 		// пуш значень для questions
// 		quizzesContainer.forEach((quiz, num) => {
// 			const questionText = quiz.querySelector(".questionText").value;
// 			const options = quiz.querySelectorAll(".optionText");
// 			const isCorrect = quiz.querySelectorAll(".isCorrect");
// 			question.questions[num] = { text: questionText, options: [] };

// 			options.forEach((val, index) => {
// 				question.questions[num].options.push({
// 					text: val.value,
// 					id: index,
// 					isCorrect: isCorrect[index].checked, // Тут поки заглушка, потім переробити
// 				});
// 			});
// 		});

// 		//додавання в локал сторедж
		
// 		if (!localStorageParse) {
// 			localStorageNull.quizzes.push(question);
// 			localStorage.setItem("storage", JSON.stringify(localStorageNull));
// 		} else {
// 			localStorageParse.quizzes.push(question);
// 			localStorage.setItem("storage", JSON.stringify(localStorageParse));
// 		};
// 		window.location.href = '../';
// 	} else {
// 		alert("Заповни поля");
// 	}
// }
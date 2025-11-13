export { test, addVariant };
function test() {
    console.log("This is a reusable function.");
};

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
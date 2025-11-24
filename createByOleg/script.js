import { storage, addQuizElement, addInputElement, addQuestionElement } from "/components.js";

// DOM elements
const container = document.getElementById("container");

// create div to hold title input, charcount and clearing button
const titleContainer = addQuizElement("div", container, "container title-container");

// create this elements inside title container
const titleInput = addInputElement(titleContainer, "input", "Назва вікторини");
const charCount = addQuizElement("div", titleContainer, "char-count", "0/30");
const clearButton = addQuizElement("button", titleContainer, "button", "Очистити");

// character count functionality
titleInput.oninput = () => {
	const currentLength = titleInput.value.length;
	charCount.textContent = `${currentLength}/30`;
	if (currentLength >= 30) {
		titleInput.disabled = true;
	} else {
		titleInput.disabled = false;
	}
};

// clear button functionality
clearButton.onclick = () => {
	titleInput.value = "";
	titleInput.disabled = false;
	charCount.textContent = "0/30";
};

// create input for description
addInputElement(container, "input description", "Опис вікторини");

// create button to add question element
const addQuestionBtn = addQuizElement("button", container, "button add-question", "Додати питання");

// add question button functionality
addQuestionBtn.onclick = () => {
	addQuestionElement(wrapper);
};

// create wrapper to hold questions
const wrapper = addQuizElement("div", container, "questions-wrapper");

// add first question by default
addQuestionElement(wrapper);

// create button to save quiz
const saveQuizBtn = addQuizElement("button", container, "button save-quiz", "Зберегти вікторину");

// create button functionality
saveQuizBtn.onclick = () => {
	// gather quiz data
	const quiz = {
		title: titleContainer.querySelector(".input").value,
		description: container.querySelector(".input.description").value,
		questions: [],
	};

	// gather questions data
	const questionContainers = wrapper.querySelectorAll(".container.question-container");
	questionContainers.forEach((qContainer) => {
		const questionText = qContainer.querySelector(".input.question-text").value;
		const question = {
			text: questionText,
			options: [],
		};

		// gather options data
		const optionContainer = [...qContainer.querySelectorAll(".container.option-container")];
		optionContainer.forEach((oContainer, oIndex) => {
			const optionText = oContainer.querySelector(".input.option-text").value;
			const isCorrect = oContainer.querySelector('input[type="radio"]').checked;
			const option = {
				id: oIndex,
				text: optionText,
				isCorrect: isCorrect,
			};
			question.options.push(option);
		});
		quiz.questions.push(question);
	});

	// validation
	const inputs = container.querySelectorAll("input:not([type=radio])");
	inputs.forEach((input) => {
		if (input.value.trim() === "") {
			input.classList.add("input-error");
		} else {
			input.classList.remove("input-error");
		}
	});

	if (container.querySelectorAll(".input-error").length === 0) {
		// save quiz to local storage
		storage.quizzes.push(quiz);
		localStorage.setItem("storage", JSON.stringify(storage));

		// redirect to home page
		window.location.href = "/";
	}
};

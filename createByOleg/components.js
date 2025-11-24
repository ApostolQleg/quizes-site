import { storage, addQuizElement, loadDefaultTests } from "/components.js";

// Initialize storage if not present
loadDefaultTests();

// function to add input element
function addInputElement(parent, className, placeholder = "", value = "") {
	const newElement = document.createElement("input");
	newElement.className = className;
	newElement.type = "text";
	newElement.placeholder = placeholder;
	newElement.value = value;
	parent.appendChild(newElement);
	return newElement;
}

// function to add option element
function addOptionElement(parent, name, value = "") {
	// div for first answer, with checkbox, text input and delete button
	const optionContainer = addQuizElement("div", parent, "container option-container");

	// create elements inside option container
	addQuizElement("input", optionContainer, name, name);
	addInputElement(optionContainer, "input option-text", "Текст відповіді", value);
	const deleteBtn = addQuizElement("button", optionContainer, "button delete-option", "Видалити");

	// delete option functionality
	deleteBtn.onclick = () => {
		optionContainer.remove();
	};

	return optionContainer;
}

// function to add question element
function addQuestionElement(parent, selectedQuiz = null) {
	// create div to hold question
	const questionContainer = addQuizElement("div", parent, "container question-container");

	// create wrapper for question text and delete question button
	const questionTextWrapper = addQuizElement(
		"div",
		questionContainer,
		"container question-text-wrapper"
	);

	// create elements inside question text wrapper
	addQuizElement("label", questionTextWrapper, "question-text");

	// create delete question button
	const deleteQuestionBtn = addQuizElement(
		"button",
		questionTextWrapper,
		"button delete-question",
		"Видалити"
	);

	// delete question functionality
	deleteQuestionBtn.onclick = () => {
		questionContainer.remove();
		updateQuestionNumbers(parent);
	};

	// create input for question text
	addInputElement(
		questionContainer,
		"input question-text",
		"Текст питання",
		selectedQuiz ? selectedQuiz.text : ""
	);

	// create div to hold options and add option button
	const optionsContainer = addQuizElement(
		"div",
		questionContainer,
		"container options-container"
	);

	// create option elements inside options container
	addQuizElement("label", optionsContainer, "options-text", "Варіанти відповіді");

	// update number of question
	updateQuestionNumbers(parent);

	// get question id for naming options (to group radio buttons)
	const questionId = questionContainer.id;

	// create two option elements by default
	addOptionElement(optionsContainer, questionId, "Так");
	addOptionElement(optionsContainer, questionId, "Ні");

	// create button to add option
	const addOptionButton = addQuizElement(
		"button",
		questionContainer,
		"button add-option",
		"Додати відповідь"
	);

	// button functionality to add option
	addOptionButton.onclick = () => {
		addOptionElement(optionsContainer, questionId);
	};
}

// something specific for updating question numbers in createByOleg
function updateQuestionNumbers(parent) {
	const questionContainers = parent.querySelectorAll(".question-container");
	questionContainers.forEach((container, index) => {
		const questionLabel = container.querySelector(".question-text");
		questionLabel.textContent = `Питання №${index + 1}`;
		container.id = index;
	});
}

// Initialize quiz creation (for both createByOleg and manageByOleg)
export function initializeQuizCreation(container, selectedQuiz = null) {
	// create div to hold title input, charcount and clearing button
	const titleContainer = addQuizElement("div", container, "container title-container");

	// create this elements inside title container
	const titleInput = addInputElement(
		titleContainer,
		"input title",
		"Назва вікторини",
		selectedQuiz ? selectedQuiz.title : ""
	);
	const charCount = addQuizElement(
		"div",
		titleContainer,
		"char-count",
		selectedQuiz ? `${selectedQuiz.title.length}/30` : "0/30"
	);
	const clearButton = addQuizElement("button", titleContainer, "button", "Очистити");

	// character count functionality
	titleInput.oninput = () => {
		const currentLength = titleInput.value.length;
		charCount.textContent = `${currentLength}/30`;
	};

	// prevent typing more than 30 characters
	titleInput.onkeydown = (e) => {
		if (titleInput.value.length >= 30 && e.key.length === 1) {
			e.preventDefault();
		}
	};

	// clear button functionality
	clearButton.onclick = () => {
		titleInput.value = "";
		titleInput.disabled = false;
		charCount.textContent = "0/30";
	};

	// create input for description
	addInputElement(
		container,
		"input description",
		"Опис вікторини",
		selectedQuiz ? selectedQuiz.description : ""
	);

	// create button to add question element
	const addQuestionBtn = addQuizElement(
		"button",
		container,
		"button add-question",
		"Додати питання"
	);

	// add question button functionality
	addQuestionBtn.onclick = () => {
		addQuestionElement(wrapper);
	};

	// create wrapper to hold questions
	const wrapper = addQuizElement("div", container, "questions-wrapper");

	// add first question by default for creation or do nothing if editing
	selectedQuiz ? null : addQuestionElement(wrapper);

	// if editing existing quiz, load its questions and options
	if (selectedQuiz) {
		for (let i = 0; i < selectedQuiz.questions.length; i++) {
			const questionData = selectedQuiz.questions[i];
			addQuestionElement(wrapper, questionData);

			// load options for this question
			const questionContainers = wrapper.querySelectorAll(".question-container");
			const currentQuestionContainer = questionContainers[i];
			const optionsContainer = currentQuestionContainer.querySelector(".options-container");

			// remove default options
			optionsContainer.innerHTML = "";

			// add options for this question
			questionData.options.forEach((option) => {
				addOptionElement(
					optionsContainer,
					currentQuestionContainer.id,
					option.text,
					option.isCorrect
				);
			});
			updateQuestionNumbers(wrapper);
		}
	}

	// create button to save quiz
	const saveQuizBtn = addQuizElement(
		"button",
		container,
		"button save-quiz",
		"Зберегти вікторину"
	);

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
}

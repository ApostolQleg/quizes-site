const quizContainer = document.getElementById("quiz-container");

fetch("quizes.json")
	.then((response) => response.json())
	.then((data) => {
		data.quizes.forEach((quiz) => {
			const quizElement = document.createElement("div");
			quizElement.classList.add("quiz");
			quizElement.innerHTML = `
                <h2>${quiz.title}</h2>
                <p>${quiz.description}</p>
            `;
			quizContainer.appendChild(quizElement);
		});
	})
	.catch((error) => console.error("Error fetching quiz data:", error));

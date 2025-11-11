document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");
    const storage = JSON.parse(localStorage.getItem("storage")) || {};

    const results = storage.results || [];
    const latestResult = results[results.length - 1];

    if (latestResult && storage.quizzes) {
        const quiz = storage.quizzes.find(q => q.title === latestResult.quizTitle);
        const totalQuestions = quiz ? quiz.questions.length : 0;
        
        const titleElementDiv = document.createElement("div");
        titleElementDiv.className = "titleElementDiv";

        const titleElement = document.createElement("h2");
        titleElement.className = "resultTitle";
        titleElement.textContent = `${latestResult.quizTitle}`;
        titleElementDiv.appendChild(titleElement);

        container.appendChild(titleElementDiv);
        

        const summaryElementDiv = document.createElement("div");
        summaryElementDiv.className = "summaryElementDiv";
        
        const summaryElement = document.createElement("p");
        summaryElement.className = "result-summary";
        summaryElement.textContent = `Your result: ${latestResult.summary} / ${totalQuestions}`;
        container.appendChild(summaryElement);
        summaryElementDiv.appendChild(summaryElement);
        
        container.appendChild(summaryElementDiv);

        const backButton = document.createElement("button");
        backButton.className = "backButton";
        backButton.textContent = "Back to Quizzes";
        backButton.addEventListener("click", () => {
            window.location.href = "../../";
        });
        container.appendChild(backButton);

    } else {
        const errorElement = document.createElement("p");
        errorElement.textContent = "Результат тесту не знайдено. Спробуйте пройти тест ще раз.";
        container.appendChild(errorElement);
    }
});
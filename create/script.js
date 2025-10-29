// Нагенеровано ШІ, але виглядає красиво і зрозуміло (спробуйте відредагувати і покращити)

function addQuiz(
	{ id = "", title = "Untitled", description = "", author = "", questions = 0 } = {},
	onTake
) {
	const quiz = document.createElement("div");
	quiz.className = "quiz";
	if (id) quiz.dataset.id = id;

	const title = document.createElement("h3");
	title.textContent = title;

	const desc = document.createElement("p");
	desc.textContent = description;

	const meta = document.createElement("small");
	meta.textContent = `${questions} question${questions !== 1 ? "s" : ""}${
		author ? " · " + author : ""
	}`;

	const btn = document.createElement("button");
	btn.type = "button";
	btn.textContent = "Take quiz";
	btn.addEventListener("click", () => {
		if (typeof onTake === "function") {
			onTake(id);
		} else if (id) {
			// default action: navigate to quiz page with id
			window.location.href = `quiz.html?id=${encodeURIComponent(id)}`;
		} else {
			console.warn("No onTake handler and no quiz id provided.");
		}
	});

	quiz.appendChild(title);
	quiz.appendChild(desc);
	quiz.appendChild(meta);
	quiz.appendChild(btn);

	container.appendChild(quiz);
	return quiz;
}

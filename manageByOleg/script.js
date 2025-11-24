import { selectedQuiz } from "/components.js";
import { initializeQuizCreation } from "/createByOleg/components.js";

// DOM elements
const container = document.getElementById("container");

// Initialize quiz creation
initializeQuizCreation(container, selectedQuiz.value);

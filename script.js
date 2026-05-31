const questionsElement = document.getElementById('questions');
const submitButton = document.getElementById('submit');
const scoreElement = document.getElementById('score');

const userAnswers =
  JSON.parse(sessionStorage.getItem('quizAnswers')) || [];

questionsElement.addEventListener('change', (event) => {
    if (event.target.type === 'radio') {

        const questionIndex =
            parseInt(event.target.name.split('-')[1], 10);

        userAnswers[questionIndex] = event.target.value;

        sessionStorage.setItem(
            'quizAnswers',
            JSON.stringify(userAnswers)
        );
    }
});

if (submitButton) {
    submitButton.addEventListener('click', () => {

        let score = 0;

        for (let i = 0; i < questions.length; i++) {
            if (userAnswers[i] === questions[i].answer) {
                score++;
            }
        }

        scoreElement.textContent =
            `Your score is ${score} out of ${questions.length}.`;

        localStorage.setItem('score', score);
    });
}

const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris",
    },
    {
        question: "What is the highest mountain in the world?",
        choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
        answer: "Everest",
    },
    {
        question: "What is the largest country by area?",
        choices: ["Russia", "China", "Canada", "United States"],
        answer: "Russia",
    },
    {
        question: "Which is the largest planet in our solar system?",
        choices: ["Earth", "Jupiter", "Mars"],
        answer: "Jupiter",
    },
    {
        question: "What is the capital of Canada?",
        choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
        answer: "Ottawa",
    },
];

function renderQuestions() {

    questionsElement.innerHTML = '';

    for (let i = 0; i < questions.length; i++) {

        const question = questions[i];

        const questionElement = document.createElement('div');

        questionElement.appendChild(
            document.createTextNode(question.question)
        );

        for (let j = 0; j < question.choices.length; j++) {

            const choice = question.choices[j];

            const choiceElement =
                document.createElement('input');

            choiceElement.type = 'radio';
            choiceElement.name = `question-${i}`;
            choiceElement.value = choice;

            if (userAnswers[i] === choice) {
                choiceElement.checked = true;
                choiceElement.setAttribute('checked', 'true');
            }

            questionElement.appendChild(choiceElement);
            questionElement.appendChild(
                document.createTextNode(choice)
            );
        }

        questionsElement.appendChild(questionElement);
    }
}

renderQuestions();
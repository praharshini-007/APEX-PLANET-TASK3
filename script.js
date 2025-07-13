// ===== QUIZ DATA =====
const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Trainer Marking Language", "HyperText Markup Language", "HyperText Marketing Language", "HyperText Machine Language"],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["Python Script", "JQuery", "Django", "NodeJS"],
    answer: "Django"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => {
      if (option === q.answer) {
        score++;
      }
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        questionEl.textContent = "";
        optionsEl.innerHTML = "";
        nextBtn.style.display = "none";
        scoreEl.textContent = `Your score: ${score}/${questions.length}`;
      }
    };
    optionsEl.appendChild(btn);
  });
}
showQuestion();

// ===== WEATHER API =====
document.getElementById('getWeather').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value;
  const apiKey = 'bd5e378503939ddaee76f12ad7a97608';

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const weatherOutput = document.getElementById('weatherOutput');
      if (data.cod === 200) {
        weatherOutput.innerHTML = `🌤️ ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
      } else {
        weatherOutput.innerHTML = `❌ City not found. Try again!`;
      }
    })
    .catch(() => {
      document.getElementById('weatherOutput').innerText = "⚠️ Error fetching weather data.";
    });
});

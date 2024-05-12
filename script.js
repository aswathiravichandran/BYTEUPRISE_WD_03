let timer;
let isRunning = false;
let startTime;
let lapStartTime;

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');
const lapBtn = document.querySelector('.lap');
const lapsList = document.querySelector('.laps');

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateTime() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;
  display.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = new Date().getTime();
    timer = setInterval(updateTime, 10);
  }
}

function pauseTimer() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timer);
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  display.textContent = '00:00:00';
  lapsList.innerHTML = '';
}

function lapTimer() {
  if (isRunning) {
    const lapTime = new Date().getTime() - startTime;
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(lapTime);
    lapsList.prepend(lapItem);
  }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);

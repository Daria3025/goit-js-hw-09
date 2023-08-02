const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

stopBtn.setAttribute('disabled', true);
let timerID = null;

function onStart() {
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled');
    timerID = setInterval(() => {
        const bgColor = getRandomHexColor();
        body.style.backgroundColor = bgColor;
    }, 1000);
}

function onStop() {
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', true);
    clearInterval(timerID);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
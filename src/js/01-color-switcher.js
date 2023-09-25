const bodyRef = document.querySelector('body');
const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');

let id = null;

startBtnRef.addEventListener('click', onStartClick);
stopBtnRef.addEventListener('click', onStopClick);

function onStartClick() {
  id = setInterval(() => {
    disableButton(stopBtnRef, false);
    disableButton(startBtnRef, !false);
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopClick() {
  clearInterval(id);
  disableButton(startBtnRef, false);
  disableButton(stopBtnRef, !false);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function disableButton(el, value) {
  el.disabled = value;
}

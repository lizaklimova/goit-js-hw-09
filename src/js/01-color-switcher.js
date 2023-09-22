const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

let id = null;

refs.start.addEventListener('click', onStartClick);
refs.stop.addEventListener('click', onStopClick);
function onStartClick() {
  id = setInterval(() => {
    refs.stop.disabled = false;
    refs.start.disabled = true;
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopClick() {
  clearInterval(id);
  refs.start.disabled = false;
  refs.stop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

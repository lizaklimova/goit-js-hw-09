import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
require('flatpickr/dist/themes/material_blue.css');
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  btnRef: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.btnRef.disabled = true;
refs.btnRef.addEventListener('click', onStartClick);

//к-ть мс, які обирає юзер
let selectedMs = 0;
//різниця між обраним часом користувача і теперешнім(мс)
let userDate = 0;
//айді інтервала
let startId;
//переформатований обʼєкт {days: 09...}
let padStartedTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose({ 0: ms }) {
    selectedMs = ms.getTime();

    if (Date.now() > selectedMs) {
      disableButton(!false);
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 3000,
      });
    } else {
      disableButton(false);
    }
  },
};

const fpr = flatpickr('#datetime-picker', options);

function onStartClick() {
  startId = setInterval(() => {
    userDate = selectedMs - Date.now();

    padStartedTime = addLeadingZero(userDate);

    checkTimeLeft();
    if (userDate < 1000) {
      Notiflix.Notify.info('Time is over!!!', { timeout: 3000 });
      clearInterval(startId);
    }

    changeTextContent();
  }, 1000);
}

function changeTextContent() {
  refs.days.textContent = padStartedTime.days;
  refs.hours.textContent = padStartedTime.hours;
  refs.minutes.textContent = padStartedTime.minutes;
  refs.seconds.textContent = padStartedTime.seconds;
}

// перевірка чи залишилось 10 сек
function checkTimeLeft() {
  const isTenSecondsLeft = Number(padStartedTime.seconds) <= 10;

  if (isTenSecondsLeft) {
    Object.values(refs).forEach(el => {
      if (el.tagName.toUpperCase() !== 'BUTTON') {
        el.style.color = 'red';
      }
    });
  }
}

function addLeadingZero(value) {
  //скільки днів, год, с, мс в заг. к-ті мс юзера
  const convertedMs = convertMs(value);

  //перебираємо ключі обʼєкта, щоб до значень з 1 символом додати 0
  Object.keys(convertedMs).forEach(key => {
    convertedMs[key] = convertedMs[key].toString().padStart(2, '0');
  });

  return convertedMs;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function disableButton(value) {
  refs.btnRef.disabled = value;
}

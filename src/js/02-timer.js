import flatpickr from 'flatpickr';
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

let selectedMs = 0;
let userDate = 0;
let startId;
let padStartedTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedMs = new Date(selectedDates[0]).getTime();
    if (new Date() > selectedMs) {
      alert('Please choose a date in the future');
    } else {
      refs.btnRef.disabled = false;
    }
  },
};

const fpr = flatpickr('#datetime-picker', options);

function onStartClick() {
  startId = setInterval(() => {
    userDate = selectedMs - new Date();

    padStartedTime = addLeadingZero(userDate);
    refs.days.textContent = padStartedTime.days;
    refs.hours.textContent = padStartedTime.hours;
    refs.minutes.textContent = padStartedTime.minutes;
    refs.seconds.textContent = padStartedTime.seconds;
    if (userDate <= 0) {
      clearInterval(startId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  const convertedMs = convertMs(value);
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

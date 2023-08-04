import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const datatimePicker = document.querySelector('input[type="text"]');
const startBtn = document.querySelector('button');
const hour = document.querySelector('span[data-hours');
const day = document.querySelector('span[data-days');
const minute = document.querySelector('span[data-minutes');
const second = document.querySelector('span[data-seconds');
startBtn.disabled = true;
let timerID = null;

const data = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //   console.log(selectedDates[0]);
      if (selectedDates[0].getTime() <= new Date().getTime()) {
          Notify.failure('Please choose a date in the future');
      }
  startBtn.disabled = false;
  },
});

startBtn.addEventListener('click', startCountdown);

function startCountdown() {
    datatimePicker.disabled = true;
    startBtn.disabled = true;
    timerID = setInterval(() => {
    const targetDate = new Date(datatimePicker.value);
    const remainder = targetDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(remainder);
    day.textContent = addLeadingZero(days);
    hour.textContent = addLeadingZero(hours);
    minute.textContent = addLeadingZero(minutes);
    second.textContent = addLeadingZero(seconds);
    if (remainder < 1000) {
      Notify.success('The timer has expired');
      clearInterval(timerID);
      datatimePicker.disabled = false;
    }
  }, 1000)
}


function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

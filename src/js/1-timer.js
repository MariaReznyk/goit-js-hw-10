import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btnStart = document.querySelector('button');
const dateInput = document.querySelector('#datetime-picker');
let userSelectedDate;
let currentDate;
let timeDelta;
let intervalID;

const daysLeft = document.querySelector('[data-days]');
const hoursLeft = document.querySelector('[data-hours]');
const minutesLeft = document.querySelector('[data-minutes]');
const secondsLeft = document.querySelector('[data-seconds]');

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDate = new Date();
    userSelectedDate = selectedDates[0];
    if (currentDate - userSelectedDate > 0) {
      iziToast.show({
        message: 'Please choose a date in the future',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
      });
    }
    btnStart.disabled = currentDate - userSelectedDate > 0;
  },
};

new flatpickr(dateInput, options);

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

btnStart.addEventListener('click', event => {
  btnStart.disabled = true;
  dateInput.disabled = true;
  intervalID = setInterval(timerRender, 1000);
});

function timerRender() {
  currentDate = new Date();
  timeDelta = userSelectedDate - currentDate;
  const timeDeltaObj = convertMs(timeDelta);
  daysLeft.textContent = String(timeDeltaObj.days).padStart(2, '0');
  hoursLeft.textContent = String(timeDeltaObj.hours).padStart(2, '0');
  minutesLeft.textContent = String(timeDeltaObj.minutes).padStart(2, '0');
  secondsLeft.textContent = String(timeDeltaObj.seconds).padStart(2, '0');
  if (Math.floor((userSelectedDate - Date.now()) / 1000) === 0) {
    clearInterval(intervalID);
    btnStart.disabled = false;
    dateInput.disabled = false;
  }
}

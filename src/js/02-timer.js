import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datatimePicker = document.querySelector('input[type="text"]');

const data = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //   console.log(selectedDates[0]);
      if (selectedDates.getTime() < Date.now.getTime()) {
          alert('Please choose a date in the future');
      }
  },
});
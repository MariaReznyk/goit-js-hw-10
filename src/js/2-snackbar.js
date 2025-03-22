import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delayByUser = event.target.elements['delay'].value;
  const stateByUser = event.target.elements['state'].value;
  createPromiseCollection(delayByUser, stateByUser)
    .then(delay => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        backgroundColor: '#59A10D',
        messageColor: '#B5EA7C',
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        backgroundColor: '#f06363',
        messageColor: '#FFBEBE',
      });
    });
  event.target.reset();
});

function createPromiseCollection(delayByUser, stateByUser) {
  return new Promise((resolve, reject) => {
    if (stateByUser === 'fulfilled') {
      setTimeout(() => {
        resolve(delayByUser);
      }, Number(delayByUser));
    } else {
      setTimeout(() => {
        reject(delayByUser);
      }, Number(delayByUser));
    }
  });
}

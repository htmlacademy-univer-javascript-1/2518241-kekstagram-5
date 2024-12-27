import {showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch('https://29.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch(() => {
      showAlert('Не удалось получить данные. Перезагрузите страницу');
    });
};

const setData = (onSuccess, onFail, body) => {
  fetch(
    'https://29.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body
    },
  )
    .then((responce) => {
      if (responce.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, setData};

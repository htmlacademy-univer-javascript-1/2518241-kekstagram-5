export const getRandomInteger = (a,b) => {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomArrayElement = (items) =>
  items[getRandomInteger(0, items.length - 1)];

export const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};

export const getRandomNoRepeatElement = (array) => {
  for (let i = 0 ; (i < array.length); i++) {
    const r = Math.floor(Math.random() * (array.length - i)) + i;
    const element = array[r];
    array[r] = array[i];
    array[i] = element;
  }

  return array;
};

export const getDecreasedArray = (pictureA, pictureB) => {
  const lengthA = pictureA.comments.length;
  const lengthB = pictureB.comments.length;

  return lengthB - lengthA;
};

export const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

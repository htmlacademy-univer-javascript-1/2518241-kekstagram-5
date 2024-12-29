import {showBigPicture} from './big-picture.js';
import {getRandomNoRepeatElement, getDecreasedArray} from './util.js';

const defaultButton = document.getElementById('filter-default');
const randomButton = document.getElementById('filter-random');
const decreasedButton = document.getElementById('filter-discussed');

const renderDefaultPictures = (pictures) => {
  const list = document.querySelector('.pictures');
  list.querySelectorAll('a').forEach((a) => {
    list.removeChild(a);
  });

  const picTemplate = document.querySelector('#picture').content.querySelector('a');
  const fragment = document.createDocumentFragment();

  pictures
    .slice()
    .forEach((picture) => {
      const element = picTemplate.cloneNode(true);

      element.children[0].src = picture.url;
      element.children[0].alt = picture.descriptions;
      element.querySelector('.picture__comments').textContent = picture.comments.length;
      element.querySelector('.picture__likes').textContent = picture.likes;

      element.addEventListener('click', () => {
        showBigPicture(picture);
      });

      fragment.appendChild(element);
    });

  list.appendChild(fragment);
};

const renderRandomPictures = (pictures) => {
  const list = document.querySelector('.pictures');
  list.querySelectorAll('a').forEach((a) => {
    list.removeChild(a);
  });

  const picTemplate = document.querySelector('#picture').content.querySelector('a');
  const fragment = document.createDocumentFragment();

  getRandomNoRepeatElement(pictures.slice())
    .slice(0,10)
    .forEach((picture) => {
      const element = picTemplate.cloneNode(true);

      element.children[0].src = picture.url;
      element.children[0].alt = picture.descriptions;
      element.querySelector('.picture__comments').textContent = picture.comments.length;
      element.querySelector('.picture__likes').textContent = picture.likes;

      element.addEventListener('click', () => {
        showBigPicture(picture);
      });

      fragment.appendChild(element);
    });

  list.appendChild(fragment);
};

const renderDecreasedPictures = (pictures) => {
  const list = document.querySelector('.pictures');
  list.querySelectorAll('a').forEach((a) => {
    list.removeChild(a);
  });

  const picTemplate = document.querySelector('#picture').content.querySelector('a');
  const fragment = document.createDocumentFragment();

  pictures
    .slice()
    .sort(getDecreasedArray)
    .forEach((picture) => {
      const element = picTemplate.cloneNode(true);

      element.children[0].src = picture.url;
      element.children[0].alt = picture.descriptions;
      element.querySelector('.picture__comments').textContent = picture.comments.length;
      element.querySelector('.picture__likes').textContent = picture.likes;

      element.addEventListener('click', () => {
        showBigPicture(picture);
      });

      fragment.appendChild(element);
    });

  list.appendChild(fragment);
};

const setDefaultButton = (callback) => {
  defaultButton.addEventListener('click', () => {
    defaultButton.classList.add('img-filters__button--active');
    randomButton.classList.remove('img-filters__button--active');
    decreasedButton.classList.remove('img-filters__button--active');
    callback();
  });
};

const setRandomButton = (callback) => {
  randomButton.addEventListener('click', () => {
    defaultButton.classList.remove('img-filters__button--active');
    randomButton.classList.add('img-filters__button--active');
    decreasedButton.classList.remove('img-filters__button--active');
    callback();
  });
};

const setDecreasedButton = (callback) => {
  decreasedButton.addEventListener('click', () => {
    defaultButton.classList.remove('img-filters__button--active');
    randomButton.classList.remove('img-filters__button--active');
    decreasedButton.classList.add('img-filters__button--active');
    callback();
  });
};


export {renderDefaultPictures, renderRandomPictures,
  renderDecreasedPictures, setDefaultButton,
  setRandomButton, setDecreasedButton};

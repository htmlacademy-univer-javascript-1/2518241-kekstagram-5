import { getPictures } from './data.js';

const list = document.querySelector('.pictures');

const picTemplate = document.querySelector('#picture').content.querySelector('a');
const pictures = getPictures();
const fragment = document.createDocumentFragment();

pictures.forEach((picture) => {
  const element = picTemplate.cloneNode(true);

  element.children[0].src = picture.url;
  element.children[0].alt = picture.descriptions;
  element.querySelector('.picture__comments').textContent = picture.comments.length;
  element.querySelector('.picture__likes').textContent = picture.likes;
  fragment.appendChild(element);
});

list.appendChild(fragment);

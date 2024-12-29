import { renderDefaultPictures, renderRandomPictures,
  renderDecreasedPictures, setDefaultButton,
  setRandomButton, setDecreasedButton } from './picture.js';
import { getData } from './api.js';
import { setUserPicterFrom, closeUploadPicture } from './upload.js';
import { debounce } from './util.js';

const DELAY = 500;

getData((pictures) => {
  document.querySelector('.img-filters ').classList.remove('img-filters--inactive');
  renderDefaultPictures(pictures);
  setDefaultButton(debounce(
    () => renderDefaultPictures(pictures),
    DELAY
  ));
  setRandomButton(debounce(
    () => renderRandomPictures(pictures),
    DELAY
  ));
  setDecreasedButton(debounce(
    () => renderDecreasedPictures(pictures),
    DELAY
  ));
});

setUserPicterFrom(closeUploadPicture);

import { renderPictures } from './picture.js';
import { getData } from './api.js';
import { setUserPicterFrom } from './upload.js';
import { closeUploadPicture } from './upload.js';

getData((pictures) => {
  renderPictures(pictures);
});

setUserPicterFrom(closeUploadPicture);

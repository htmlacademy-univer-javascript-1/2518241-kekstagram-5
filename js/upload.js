/* eslint-disable */
import {init, reset} from './effects.js';
import { setData } from './api.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadPicture = document.querySelector('.img-upload__overlay');
const uploadButton = document.querySelector('.img-upload__input');
const closeUploadButton = document.querySelector('.img-upload__cancel');
const body = document.body;
const descriptionField = document.querySelector('.text__description');
const hashtagsField = document.querySelector('.text__hashtags');
const HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const minusScaleButton = document.querySelector('.scale__control--smaller');
const plusScaleButton = document.querySelector('.scale__control--bigger');
const imageScaleValue = document.querySelector('.scale__control--value');
const imageScaleField = document.querySelector('.img-upload__preview');
const pictureForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const splitHashtags = (hashtags) => hashtags.trim().split(/\s+/);

function validateComment(value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

pristine.addValidator(
  descriptionField,
  validateComment,
  'Длина комментария не может составлять больше 140 символов'
);

function validateHashtagItems(value) {
  const hashtags = splitHashtags(value);
  const isValidCount = hashtags.length <= MAX_HASHTAG_COUNT;
  const isValidText = hashtags.every((hashtag) => HASHTAG.test(hashtag));
  const isUnique = hashtags.length === new Set(hashtags.map((hashtag) => hashtag.toLowerCase())).size;

  return {isValidCount, isValidText, isUnique};
}

function validateHashtag(value) {
  const {isValidCount, isValidText, isUnique} = validateHashtagItems(value);
  return isValidCount && isValidText && isUnique;
}

const getHashtagErrorMessage = (value) => {
  const {isValidCount, isValidText, isUnique} = validateHashtagItems(value);

  if (!isValidCount) {
    return 'Нельзя указать больше пяти хэш-тегов';
  }
  if (!isValidText) {
    return 'Строка после решётки должна состоять из букв и чисел и иметь длину не более 20 символов';
  }
  if (!isUnique) {
    return 'Один и тот же хэш-тег не может быть использован дважды';
  }
  return true;
};

pristine.addValidator(
  hashtagsField,
  validateHashtag,
  getHashtagErrorMessage
);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


const upscaleImageField = () => {
  let imageScaleValueInt = Number(imageScaleValue.value.replace('%',''));
  if (imageScaleValueInt < 100) {
    imageScaleValueInt += 25;
    imageScaleValue.value = `${imageScaleValueInt}%`;
    imageScaleField.style.cssText = `transform: scale(${imageScaleValueInt / 100});`;
  }
};

const downscaleImageField = () => {
  let imageScaleValueInt = Number(imageScaleValue.value.replace('%',''));
  if (imageScaleValueInt > 25) {
    imageScaleValueInt -= 25;
    imageScaleValue.value = `${imageScaleValueInt}%`;
    imageScaleField.style.cssText = `transform: scale(${imageScaleValueInt / 100});`;
  }
};


const closeUploadPicture = () => {
  uploadPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeOnKey);
  uploadButton.value = '';
  descriptionField.value = '';
  hashtagsField.value = '';
  imageScaleField.style.cssText = 'transform: scale(1);';
  reset();
};

const openUploadPicture = () => {
  uploadPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', closeOnKey);
};

function closeOnKey(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    uploadPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeOnKey);
    uploadButton.value = '';
    descriptionField.value = '';
    hashtagsField.value = '';
    imageScaleField.style.cssText = 'transform: scale(1);';
    reset();
  }
}

uploadButton.addEventListener('change', openUploadPicture);
closeUploadButton.addEventListener('click', closeUploadPicture);
plusScaleButton.addEventListener('click', upscaleImageField);
minusScaleButton.addEventListener('click', downscaleImageField);

hashtagsField.addEventListener('focus', () => {
  document.removeEventListener('keydown', closeOnKey);
});
hashtagsField.addEventListener('blur', () => {
  document.addEventListener('keydown', closeOnKey);
});

descriptionField.addEventListener('focus', () => {
  document.removeEventListener('keydown', closeOnKey);
});
descriptionField.addEventListener('blur', () => {
  document.addEventListener('keydown', closeOnKey);
});


const blockSubmit = () => {
  submitButton.disable = true;
  submitButton.textContent = 'Опубликовываю...';
};

const unblockSubmit = () => {
  submitButton.disable = false;
  submitButton.textContent = 'Опубликовать';
};

const showSuccessSection = () => {
  const successMessageContent = document.getElementById('success').content.querySelector('.success');
  const successMessage = successMessageContent.cloneNode(true);

  const removeSuccessSection = (evt) => {
    if (evt.key === 'Escape') {
      body.removeChild(successMessage);
      document.removeEventListener('keydown', removeSuccessSection)
    }
  }

  successMessage.addEventListener('click', (evt) => {
    if (evt.target === successMessage) {
      body.removeChild(successMessage);
      document.removeEventListener('keydown', removeSuccessSection)
    }
  });

  document.addEventListener('keydown', removeSuccessSection);

  body.appendChild(successMessage);
};

const showFailSection = () => {
  const errorMessageContent = document.getElementById('error').content.querySelector('.error');
  const errorMessage = errorMessageContent.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  document.removeEventListener('keydown', closeOnKey);

  errorButton.addEventListener('click', () => {
    body.removeChild(errorMessage);
    document.removeEventListener('keydown', removeErrorSection);
    document.addEventListener('keydown', closeOnKey);
    descriptionField.value = '';
    hashtagsField.value = '';
    imageScaleField.style.cssText = 'transform: scale(1);';
    reset();
  });

  const removeErrorSection = (evt) => {
    if (evt.key === 'Escape') {
      body.removeChild(errorMessage);
      document.removeEventListener('keydown', removeErrorSection);
      document.addEventListener('keydown', closeOnKey);
      descriptionField.value = '';
      hashtagsField.value = '';
      imageScaleField.style.cssText = 'transform: scale(1);';
      reset();
    }
  }

  errorMessage.addEventListener('click', (evt) => {
    if (evt.target === errorMessage) {
      body.removeChild(errorMessage);
      document.removeEventListener('keydown', removeErrorSection);
      document.addEventListener('keydown', closeOnKey);
      descriptionField.value = '';
      hashtagsField.value = '';
      imageScaleField.style.cssText = 'transform: scale(1);';
      reset();
    }
  });

  document.addEventListener('keydown', removeErrorSection);

  body.appendChild(errorMessage);
};

const setUserPicterFrom = (onSuccess) => {
  pictureForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmit();
      setData(
        () => {
          unblockSubmit();
          onSuccess();
          showSuccessSection();
        },
        () => {
          unblockSubmit();
          showFailSection();
        },
        new FormData(evt.target),
      );
    }
  });
};


init();

export {pristine, closeUploadPicture, setUserPicterFrom};

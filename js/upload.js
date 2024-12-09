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


const closeUploadPicture = () => {
  uploadPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeOnKey);
  uploadButton.value = '';
  descriptionField.value = '';
  hashtagsField.value = '';
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
  }
}

uploadButton.addEventListener('change', openUploadPicture);
closeUploadButton.addEventListener('click', closeUploadPicture);

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

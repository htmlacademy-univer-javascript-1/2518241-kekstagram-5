const bigPicture = document.querySelector('.big-picture');
const cancelBigPicture = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;
const commentElement = document.querySelector('.social__comment');
const commentList = document.querySelector('.social__comments');
const commentLoader = document.querySelector('.comments-loader');
const commentCount = document.querySelector('.social__comment-count');


const pictureRender = (picture) => {
  bigPicture.querySelector('img').src = picture.url;
  bigPicture.querySelector('img').alt = picture.descriptions;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.descriptions;
};

const commentCreator = (picture) => {
  const commentForm = commentElement.cloneNode(true);

  commentForm.querySelector('.social__picture').src = picture.avatar;
  commentForm.querySelector('.social__picture').alt = picture.name;
  commentForm.querySelector('.social__text').textContent = picture.message;

  return commentForm;
};

const commentRender = (comments) => {
  commentList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = commentCreator(item);
    fragment.append(comment);
  });

  commentList.append(fragment);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentLoader.classList.remove('hidden');
  commentCount.classList.remove('hidden');
  document.removeEventListener('keydown', closeOnKey);
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentLoader.classList.add('hidden');
  commentCount.classList.add('hidden');
  document.addEventListener('keydown', closeOnKey);
};

function closeOnKey(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
}

const showBigPicture = (picture) => {
  openBigPicture();

  pictureRender(picture);
  commentRender(picture.comments);
};

cancelBigPicture.addEventListener('click', closeBigPicture);


export {showBigPicture};

const bigPicture = document.querySelector('.big-picture');
const cancelBigPicture = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;
const commentElement = document.querySelector('.social__comment');
const commentList = document.querySelector('.social__comments');
const commentLoader = document.querySelector('.comments-loader');
const commentCount = document.querySelector('.comments-count');
const commentShownCountElement = bigPicture.querySelector('.comments-shown-count');
let commentsShown = 0;
const COMMENTS_NUMBER = 5;
const commentArray = [];


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
  if (comments) {
    comments.forEach((item) => {
      commentArray.push(item);
    });
  }

  commentsShown += COMMENTS_NUMBER;

  if (commentsShown >= commentArray.length) {
    commentLoader.classList.add('hidden');
    commentsShown = commentArray.length;
  } else {
    commentLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = commentCreator(commentArray[i]);
    fragment.append(comment);
  }

  commentList.innerHTML = '';
  commentList.append(fragment);
  commentShownCountElement.textContent = commentsShown;
  commentCount.textContent = commentArray.length;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeOnKey);
  commentsShown = 0;
  commentArray.length = 0;
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', closeOnKey);
};

function closeOnKey(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsShown = 0;
    commentArray.length = 0;
  }
}

const showBigPicture = (picture) => {
  openBigPicture();

  pictureRender(picture);
  commentRender(picture.comments);
};

cancelBigPicture.addEventListener('click', closeBigPicture);
commentLoader.addEventListener('click', () => {
  commentRender();
});


export {showBigPicture};

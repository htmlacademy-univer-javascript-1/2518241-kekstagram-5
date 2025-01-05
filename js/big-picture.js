const bigPicture = document.querySelector('.big-picture');
const cancelBigPicture = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;
const commentElement = document.querySelector('.social__comment');
const commentList = document.querySelector('.social__comments');
const commentLoader = document.querySelector('.comments-loader');
const commentCount = document.querySelector('.comments-count');
const commentShownCountElement = bigPicture.querySelector('.comments-shown-count');
const COMMENTS_NUMBER = 5;
const comments = [];
let commentsShown = 0;

const renderPicture = (picture) => {
  bigPicture.querySelector('img').src = picture.url;
  bigPicture.querySelector('img').alt = picture.descriptions;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.descriptions;
};

const createComment = (picture) => {
  const commentForm = commentElement.cloneNode(true);

  commentForm.querySelector('.social__picture').src = picture.avatar;
  commentForm.querySelector('.social__picture').alt = picture.name;
  commentForm.querySelector('.social__text').textContent = picture.message;

  return commentForm;
};

const renderComment = (commentItem) => {
  if (commentItem) {
    commentItem.forEach((item) => {
      comments.push(item);
    });
  }

  commentsShown += COMMENTS_NUMBER;

  if (commentsShown >= comments.length) {
    commentLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentList.innerHTML = '';
  commentList.append(fragment);
  commentShownCountElement.textContent = commentsShown;
  commentCount.textContent = comments.length;
};

const hadlerClosingBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', handlerClosingOnKey);
  commentsShown = 0;
  comments.length = 0;
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', handlerClosingOnKey);
};

function handlerClosingOnKey(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsShown = 0;
    comments.length = 0;
  }
}

const showBigPicture = (picture) => {
  openBigPicture();

  renderPicture(picture);
  renderComment(picture.comments);
};

cancelBigPicture.addEventListener('click', hadlerClosingBigPicture);
commentLoader.addEventListener('click', () => {
  renderComment();
});


export {showBigPicture};

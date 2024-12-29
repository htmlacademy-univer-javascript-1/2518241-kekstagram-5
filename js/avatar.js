const FILE_TYPES = ['png', 'jpg', 'jpeg'];

const fileLoader = document.querySelector('input[type=file]');
const avatar = document.querySelector('.img-upload__preview').querySelector('img');

fileLoader.addEventListener('change', () => {
  const file = fileLoader.files[0];
  const fileName = file.name.toLowerCase();

  const matchesType = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matchesType) {
    avatar.src = URL.createObjectURL(file);
  }
});

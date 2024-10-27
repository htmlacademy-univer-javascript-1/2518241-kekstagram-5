const PICTURE_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const COMMENT_COUNT = 30;
const AVATAR_COUNT = 6;
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = ['Анабель', 'Петр', 'Борис', 'Кирилл', 'Антон', 'Александр', 'Валерий', 'Константин'];
const DESCRIPTIONS = [
  'Морской закат наполняет сердце спокойствием и вдохновением. #море #закат',
  'Цветение сакуры - чудесное зрелище, напоминающее о красоте жизни. #весна #сакура',
  'Роскошные горы в облаках олицетворяют величие и непоколебимость природы. #горы #облака',
  'Поле подсолнухов, рябина в цвету - символы лета и жизненной силы. #поля #лето',
  'Лепестки роз, переливающиеся капельками росы, словно картина из снов. #цветы #роса',
  'Городские огни создают удивительную атмосферу загадки и романтики. #город #ночь',
  'Лесная тропинка, утопающая в зелени, приглашает на прогулку в мир магии. #лес #природа',
  'Пейзаж с горным озером обладает волшебством и покоем. #озеро #пейзаж'
];

const getRandomInteger = (a,b) => {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (items) =>
  items[getRandomInteger(0, items.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateCommentId = createIdGenerator();

const createMessage = () => Array.from (
  { length: getRandomInteger(1,2) },
  () => getRandomArrayElement(COMMENTS),
).join('');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  descriptions: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: Array.from(
    { length: getRandomInteger(0, COMMENT_COUNT) },
    createComment,
  ),
});

const getPictures = () => Array.from(
  { length: PICTURE_COUNT },
  (_, index) => createPicture(index + 1),
);

getPictures();

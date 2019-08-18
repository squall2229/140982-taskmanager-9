import {getDueDate} from '../utils/date';
import {getRandomArray, getRandomIndex, getRandomBoolean, getRandomAmountByLength} from '../utils/random';

const TAGS = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];

const MAX_TAGS_TASK = 3;

const getTags = () => {
  const tags = new Set();

  getRandomArray(MAX_TAGS_TASK).forEach(() => tags.add(TAGS[getRandomIndex(TAGS.length)]));

  return tags;
};

const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][getRandomAmountByLength(3)],
  dueDate: getDueDate(),
  tags: getTags(),
  repeatingDays: {
    'mo': false,
    'tu': getRandomBoolean(),
    'we': getRandomBoolean(),
    'th': getRandomBoolean(),
    'fr': false,
    'sa': false,
    'su': false
  },
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][getRandomAmountByLength(5)],
  isFavorite: getRandomBoolean(),
  isArchive: getRandomBoolean()
});

export default getTask;

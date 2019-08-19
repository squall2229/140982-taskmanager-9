import {getDueDate} from '../utils/date';
import {getRandomArray, getRandomIndex, getRandomBoolean, getRandomAmountByLength} from '../utils/random';

const OPTIONS = {
  maxOptions: 3,
  tags: [
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`
  ]
};

const getTags = () => {
  const tags = new Set();

  getRandomArray(OPTIONS.maxOptions).forEach(() => tags.add(OPTIONS.tags[getRandomIndex(OPTIONS.tags.length)]));

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
    'Mo': false,
    'Tu': getRandomBoolean(),
    'We': getRandomBoolean(),
    'Th': getRandomBoolean(),
    'Fr': false,
    'Sa': false,
    'Su': false
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

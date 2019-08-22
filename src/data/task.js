import {
  getRandomArray,
  getRandomIndex,
  getRandomBoolean,
  getRandomAmountByLength,
  getRandomInteger} from '../utils/random';

const tagsParams = {
  MAX_OPTIONS: 3,
  OPTIONS: [
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`
  ]
};

const WEEK = 7 * 24 * 60 * 60 * 1000;

const getDueDate = () => new Date(Date.now() + getRandomInteger(-WEEK, WEEK));

const getTags = () => {
  const tags = new Set();

  getRandomArray(tagsParams.MAX_OPTIONS).forEach(() => tags.add(tagsParams.OPTIONS[getRandomIndex(tagsParams.OPTIONS.length)]));

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

export const getRandomAmountByLength = (length) => Math.floor(Math.random() * length);
export const getRandomBoolean = () => Boolean(Math.round(Math.random()));
export const getRandomIndex = (max) => Math.floor(Math.random() * max);
export const getRandomArray = (max) => new Array(getRandomIndex(max)).fill(``);

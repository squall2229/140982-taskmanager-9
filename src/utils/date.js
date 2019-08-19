const weekTime = Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000;

const getRandomInteger = (min, max) => Math.round(Math.random() * (max - min) + min);

export const getDueDate = () => new Date(Date.now() + getRandomInteger(-weekTime, weekTime));

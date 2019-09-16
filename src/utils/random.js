export const getRandomAmountByLength = (length) => Math.floor(Math.random() * length);
export const getRandomBoolean = () => Boolean(Math.round(Math.random()));
export const getRandomIndex = (max) => Math.floor(Math.random() * max);
export const getRandomArray = (max) => new Array(getRandomIndex(max)).fill(``);
export const getRandomInteger = (min, max) => Math.round(Math.random() * (max - min) + min);

export const getRandomColor = () => {
  const letters = `0123456789ABCDEF`;
  let color = `#`;

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

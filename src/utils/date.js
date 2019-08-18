const getRandomBoolean = () => Math.round(Math.random());
const getWeekTime = () => Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000;

export const getDueDate = () => {
  const weekTime = getWeekTime();
  const randomBoolean = getRandomBoolean();
  const timeStamp = parseFloat(randomBoolean ? Date.now() + weekTime : Date.now() - weekTime);
  return new Date(timeStamp);
};

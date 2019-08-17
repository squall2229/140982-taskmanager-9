import getTask from './task';

const COUNT_CARDS = 64;

const getTaskList = () => {
  return new Array(COUNT_CARDS).fill(``).map(getTask);
};
export default getTaskList;

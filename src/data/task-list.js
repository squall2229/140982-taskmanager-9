import getTask from './task';

const COUNT_CARDS = 24;

const getTaskList = () => {
  return new Array(COUNT_CARDS).fill(``).map(getTask);
};
export default getTaskList;

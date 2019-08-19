import getTask from './task';

const COUNT_CARDS = Math.ceil(Math.random() * 32);

const getTaskList = () => {
  return new Array(COUNT_CARDS).fill(``).map(getTask);
};
export default getTaskList;

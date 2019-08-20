import isRepeat from './isRepeat';

export const getAllTasks = (taskList) => taskList.filter((task) => !task.isArchive);

export const getAmountAllTasks = (taskList) => getAllTasks(taskList).length;

export const getAmountOverDueTasks = (taskList) => {
  return taskList.filter((task) => Date.now() - task.dueDate.getTime() > 0).length;
};

export const getAmountTodayTasks = (taskList) => {
  return taskList.filter((task) => new Date().getDate() === task.dueDate.getDate()).length;
};

export const getAmountFavoritesTasks = (taskList) => {
  return taskList.filter((task) => task.isFavorite).length;
};

export const getAmountRepeatingTasks = (taskList) => {
  return taskList.filter((task) => isRepeat(task.repeatingDays)).length;
};

export const getAmountTagTasks = (taskList) => {
  return taskList.reduce((summ, current) => summ + current.tags.size, 0);
};

export const getAmountArchiveTasks = (taskList) => {
  return taskList.filter((task) => task.isArchive).length;
};

import isRepeat from './isRepeat';
import {getAllTasks} from './tasks';

export const getAmountAllTasks = (tasks) => getAllTasks(tasks).length;

export const getAmountOverDueTasks = (tasks) => {
  return tasks.filter((task) => Date.now() - task.dueDate.getTime() > 0).length;
};

export const getAmountTodayTasks = (tasks) => {
  return tasks.filter((task) => new Date().getDate() === task.dueDate.getDate()).length;
};

export const getAmountFavoritesTasks = (tasks) => {
  return tasks.filter((task) => task.isFavorite).length;
};

export const getAmountRepeatingTasks = (tasks) => {
  return tasks.filter((task) => isRepeat(task.repeatingDays)).length;
};

export const getAmountTagTasks = (tasks) => {
  return tasks.reduce((summ, current) => summ + current.tags.size, 0);
};

export const getAmountArchiveTasks = (tasks) => {
  return tasks.filter((task) => task.isArchive).length;
};

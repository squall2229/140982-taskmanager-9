import isRepeat from './isRepeat';
import {getAllTasks} from './tasks';

export const getAmountAllTasks = (tasks) => getAllTasks(tasks);

export const getAmountOverDueTasks = (tasks) => {
  return tasks.filter((task) => Date.now() - task.dueDate.getTime() > 0);
};

export const getAmountTodayTasks = (tasks) => {
  return tasks.filter((task) => new Date().getDate() === task.dueDate.getDate());
};

export const getAmountFavoritesTasks = (tasks) => {
  return tasks.filter((task) => task.isFavorite);
};

export const getAmountRepeatingTasks = (tasks) => {
  return tasks.filter((task) => isRepeat(task.repeatingDays));
};

export const getAmountTagTasks = (tasks) => {
  return tasks.reduce((summ, current) => summ + current.tags.size, 0);
};

export const getAmountArchiveTasks = (tasks) => {
  return tasks.filter((task) => task.isArchive);
};

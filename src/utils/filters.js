import isRepeat from './isRepeat';

export const getCountAllTasks = (taskList) => taskList.length;

export const getCountOverDueTasks = (taskList) => {
  return taskList.filter((task) => Date.now() - task.dueDate > 0).length;
};

export const getCountTodayTasks = (taskList) => {
  return taskList.filter((task) => new Date().getDate() === new Date(task.dueDate).getDate()).length;
};

export const getCountFavoritesTasks = (taskList) => {
  return taskList.filter((task) => task.isFavorite).length;
};

export const getCountRepeatingTasks = (taskList) => {
  return taskList.filter((task) => isRepeat(task.repeatingDays)).length;
};

export const getCountTagTasks = (taskList) => {
  return taskList.filter((task) => task.tags.length).length;
};

export const getCountArchiveTasks = (taskList) => {
  return taskList.filter((task) => task.isArchive).length;
};

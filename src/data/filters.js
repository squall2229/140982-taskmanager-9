import {
  getCountAllTasks,
  getCountOverDueTasks,
  getCountTodayTasks,
  getCountFavoritesTasks,
  getCountRepeatingTasks,
  getCountTagTasks,
  getCountArchiveTasks
} from '../utils/filters';

const FILTERS_TITLES = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];

const getCountTaskByFilter = (filterTitle, taskList) => {
  const countAllTasks = getCountAllTasks(taskList);

  switch (filterTitle) {
    case `all`: return countAllTasks;
    case `overdue`: return getCountOverDueTasks(taskList);
    case `today`: return getCountTodayTasks(taskList);
    case `favorites`: return getCountFavoritesTasks(taskList);
    case `repeating`: return getCountRepeatingTasks(taskList);
    case `tags`: return getCountTagTasks(taskList);
    case `archive`: return getCountArchiveTasks(taskList);
    default: return countAllTasks;
  }
};

const getFilters = (taskList) => {
  return FILTERS_TITLES.map((title) => {
    return ({
      title,
      count: getCountTaskByFilter(title, taskList)
    });
  });
};

export default getFilters;

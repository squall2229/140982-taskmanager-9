import {
  getAmountAllTasks,
  getAmountOverDueTasks,
  getAmountTodayTasks,
  getAmountFavoritesTasks,
  getAmountRepeatingTasks,
  getAmountTagTasks,
  getAmountArchiveTasks
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

const addCountForFilters = (title, taskList) => ({
  title,
  count: getCountTaskByFilter(title, taskList)
});

const getCountTaskByFilter = (filterTitle, taskList) => {
  const filtersCount = {
    all: getAmountAllTasks(taskList),
    overdue: getAmountOverDueTasks(taskList),
    today: getAmountTodayTasks(taskList),
    favorites: getAmountFavoritesTasks(taskList),
    repeating: getAmountRepeatingTasks(taskList),
    tags: getAmountTagTasks(taskList),
    archive: getAmountArchiveTasks(taskList)
  };

  return filtersCount[filterTitle];
};

const getFilters = (taskList) => FILTERS_TITLES.map((title) => addCountForFilters(title, taskList));

export default getFilters;

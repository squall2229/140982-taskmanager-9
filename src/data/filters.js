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

const filtersCount = {
  all: getAmountAllTasks,
  overdue: getAmountOverDueTasks,
  today: getAmountTodayTasks,
  favorites: getAmountFavoritesTasks,
  repeating: getAmountRepeatingTasks,
  tags: getAmountTagTasks,
  archive: getAmountArchiveTasks
};

const addCountForFilters = (title, tasks) => ({
  title,
  count: getCountTaskByFilter(title, tasks)
});

const getCountTaskByFilter = (filterTitle, tasks) => {
  return filtersCount[filterTitle](tasks);
};

const getFilters = (tasks) => FILTERS_TITLES.map((title) => addCountForFilters(title, tasks));

export default getFilters;

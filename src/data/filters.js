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

const filtersCount = {};

const addCountForFilters = (title, taskList) => ({
  title,
  count: getCountTaskByFilter(title, taskList)
});

const getCountTaskByFilter = (filterTitle, taskList) => {
  filtersCount.all = getAmountAllTasks(taskList);
  filtersCount.overdue = getAmountOverDueTasks(taskList);
  filtersCount.today = getAmountTodayTasks(taskList);
  filtersCount.favorites = getAmountFavoritesTasks(taskList);
  filtersCount.repeating = getAmountRepeatingTasks(taskList);
  filtersCount.tags = getAmountTagTasks(taskList);
  filtersCount.archive = getAmountArchiveTasks(taskList);

  return filtersCount[filterTitle];
};

const getFilters = (taskList) => FILTERS_TITLES.map((title) => addCountForFilters(title, taskList));

export default getFilters;

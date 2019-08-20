import getTaskList from './data/task-list';
import getFilters from './data/filters';

import {getAllTasks} from './utils/filters';

import {getMenuTemplate} from './components/menu';
import {getSearchTemplate} from './components/search';
import {getFilterListTemplate} from './components/filter-list';
import {getBoardTemplate} from './components/board';
import {getSortTemplate} from './components/sort';
import {getTaskEditTemplate} from './components/task-edit';
import {getTaskTemplate} from './components/task';
import {getLoadMoreButtonTemplate} from './components/load-button';

const COUNT_TASKS_LOAD = 8;
let page = 0;
let currentCountTasks = COUNT_TASKS_LOAD;

const main = document.querySelector(`.main`);
const mainControl = document.querySelector(`.main__control`);

const taskList = getTaskList();
const taskEdit = getAllTasks(taskList)[0];
const filterList = getFilters(taskList);

const renderComponent = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const checkHiddenButton = () => {
  if (currentCountTasks >= taskList.length) {
    buttonLoadMore.remove();
  }
};

const renderTasks = () => {
  checkHiddenButton();

  taskList
    .slice(page * COUNT_TASKS_LOAD, currentCountTasks)
    .forEach((task) => renderComponent(boardTasks, getTaskTemplate(task), `beforeend`));
};

renderComponent(mainControl, getMenuTemplate(), `beforeend`);
renderComponent(main, getSearchTemplate(), `beforeend`);
renderComponent(main, getFilterListTemplate(filterList), `beforeend`);
renderComponent(main, getBoardTemplate(), `beforeend`);

const board = document.querySelector(`.board`);
const boardTasks = document.querySelector(`.board__tasks`);

renderComponent(board, getSortTemplate(), `afterbegin`);
renderComponent(boardTasks, getTaskEditTemplate(taskEdit), `beforeend`);
renderComponent(board, getLoadMoreButtonTemplate(), `beforeend`);

const buttonLoadMore = document.querySelector(`.load-more`);

renderTasks();

buttonLoadMore.addEventListener(`click`, (event) => {
  event.preventDefault();

  page += 1;
  currentCountTasks += COUNT_TASKS_LOAD;
  renderTasks();
});


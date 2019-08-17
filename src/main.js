import getTaskList from './data/task-list';
import getFilters from './data/filters';

import {getMenuTemplate} from './components/menu';
import {getSearchTemplate} from './components/search';
import {getFilterListTemplate} from './components/filter-list';
import {getBoardTemplate} from './components/board';
import {getSortTemplate} from './components/sort';
import {getTaskEditTemplate} from './components/task-edit';
import {getTaskTemplate} from './components/task';
import {getLoadMoreButtonTemplate} from './components/load-button';

const COUNT_TASK_VIEW = 8;

const main = document.querySelector(`.main`);
const mainControl = document.querySelector(`.main__control`);

const taskList = getTaskList();
const filterList = getFilters(taskList);

const renderComponent = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const loadMoreTasks = () => {

};

renderComponent(mainControl, getMenuTemplate(), `beforeend`);
renderComponent(main, getSearchTemplate(), `beforeend`);
renderComponent(main, getFilterListTemplate(filterList), `beforeend`);
renderComponent(main, getBoardTemplate(), `beforeend`);

const board = document.querySelector(`.board`);
const boardTasks = document.querySelector(`.board__tasks`);

renderComponent(board, getSortTemplate(), `afterbegin`);

const taskEdit = taskList[0];
const tasks = taskList.filter((el, index) => index > 0 && index <= COUNT_TASK_VIEW - 1);

renderComponent(boardTasks, getTaskEditTemplate(taskEdit), `beforeend`);

for (let task of tasks) {
  renderComponent(boardTasks, getTaskTemplate(task), `beforeend`);
}

renderComponent(board, getLoadMoreButtonTemplate(), `beforeend`);

const buttonLoadMore = document.querySelector(`.load-more`);

buttonLoadMore.addEventListener(`click`, (event) => {
  event.preventDefault();
  loadMoreTasks();
});

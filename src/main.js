import getTasks from './data/tasks';
import getFilters from './data/filters';

import {render, removeElement, Position} from './utils/render';

import Menu from './components/menu';
import Search from './components/search';
import Filters from './components/filters';
import Board from './components/board';
import Sort from './components/sort';
// import TaskEdit from './components/task-edit';
import Task from './components/task';
import LoadButton from './components/load-button';

const COUNT_TASKS_LOAD = 8;
let page = 0;
let currentCountTasks = COUNT_TASKS_LOAD;

const tasksData = getTasks();
const filtersData = getFilters(tasksData);

const menuElement = new Menu().getElement();
const searchElement = new Search().getElement();
const boardElement = new Board().getElement();
const filtersElement = new Filters(filtersData).getElement();
const sortElement = new Sort().getElement();
const loadButton = new LoadButton();

const main = document.querySelector(`.main`);
const mainControl = document.querySelector(`.main__control`);

const renderTask = (taskMock) => {
  const task = new Task(taskMock).getElement();
  const boardTasks = boardElement.querySelector(`.board__tasks`);
  render(boardTasks, task, Position.BEFOREEND);
};

const renderTasks = () => {
  if (currentCountTasks >= tasksData.length) {
    removeElement(loadButton.getElement());
    loadButton.removeElement();
  }

  tasksData
    .slice(page * COUNT_TASKS_LOAD, currentCountTasks)
    .forEach(renderTask);
};

loadButton.getElement().addEventListener(`click`, (event) => {
  event.preventDefault();

  page += 1;
  currentCountTasks += COUNT_TASKS_LOAD;
  renderTasks();
});

render(mainControl, menuElement, `beforeend`);
render(main, searchElement, `beforeend`);
render(main, filtersElement, `beforeend`);
render(main, boardElement, `beforeend`);
render(boardElement, sortElement, `afterbegin`);
render(boardElement, loadButton.getElement(), `beforeend`);

renderTasks();


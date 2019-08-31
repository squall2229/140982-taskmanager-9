import getTasks from './data/tasks';
import getFilters from './data/filters';

import {render, removeElement, Position} from './utils/render';

import Menu from './components/menu';
import Search from './components/search';
import Filters from './components/filters';
import Board from './components/board';
import BoardTasks from './components/board-tasks';
import Sort from './components/sort';
import TaskEdit from './components/task-edit';
import Task from './components/task';
import LoadButton from './components/load-button';
import NoTasks from './components/no-tasks';

const COUNT_TASKS_LOAD = 8;
let page = 0;
let currentCountTasks = COUNT_TASKS_LOAD;

const tasksData = getTasks();
const filtersData = getFilters(tasksData);

const menuElement = new Menu().getElement();
const searchElement = new Search().getElement();
const boardElement = new Board().getElement();
const boardTasksElement = new BoardTasks().getElement();
const filtersElement = new Filters(filtersData).getElement();
const sortElement = new Sort().getElement();
const loadButton = new LoadButton();
const noTasks = new NoTasks();

const main = document.querySelector(`.main`);
const mainControl = document.querySelector(`.main__control`);
let activeTask = null;
let defaultTask = null;

const renderTask = (taskMock) => {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);
  const tasksContainer = boardElement.querySelector(`.board__tasks`);

  const onEscKeyDown = (evt) => {
    activeTask = null;
    defaultTask = null;

    if (evt.key === `Escape` || evt.key === `Esc`) {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {

      if (activeTask && defaultTask) {
        tasksContainer.replaceChild(defaultTask, activeTask);
      }

      tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
      activeTask = taskEdit.getElement();
      defaultTask = task.getElement();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement()
    .querySelector(`.card__form`)
    .addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      activeTask = null;
      defaultTask = null;
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(tasksContainer, task.getElement(), Position.BEFOREEND);
};

const renderTasks = () => {
  if (currentCountTasks >= tasksData.length) {
    removeElement(loadButton.getElement());
    loadButton.removeElement();
  }

  render(boardElement, boardTasksElement, Position.BEFOREEND);

  tasksData
    .slice(page * COUNT_TASKS_LOAD, currentCountTasks)
    .forEach(renderTask);
};

const isShowTasks = () => {
  return tasksData.length && tasksData.filter((task) => !task.isArchive).length;
};

loadButton.getElement().addEventListener(`click`, (event) => {
  event.preventDefault();

  page += 1;
  currentCountTasks += COUNT_TASKS_LOAD;
  renderTasks();
});

render(mainControl, menuElement, Position.BEFOREEND);
render(main, searchElement, Position.BEFOREEND);
render(main, filtersElement, Position.BEFOREEND);
render(main, boardElement, Position.BEFOREEND);

if (isShowTasks()) {
  renderTasks();
  render(boardElement, sortElement, Position.AFTERBEGIN);
  render(boardElement, loadButton.getElement(), Position.BEFOREEND);
} else {
  render(boardElement, noTasks.getElement(), Position.BEFOREEND);
}


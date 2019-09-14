import getTasks from './data/tasks';
import getFilters from './data/filters';

import {render, Position} from './utils/render';

import Menu from './components/menu';
import Search from './components/search';
import Filters from './components/filters';
import Board from './components/board';
import Statistic from './components/statistic';

import BoardController from './controllers/board';

const tasksData = getTasks();
const filtersData = getFilters(tasksData);

const menuElement = new Menu().getElement();
const searchElement = new Search().getElement();
const boardElement = new Board().getElement();
const statistic = new Statistic();
const filtersElement = new Filters(filtersData).getElement();

const main = document.querySelector(`.main`);
const mainControl = document.querySelector(`.main__control`);

statistic.getElement().classList.add(`visually-hidden`);

render(mainControl, menuElement, Position.BEFOREEND);
render(main, searchElement, Position.BEFOREEND);
render(main, filtersElement, Position.BEFOREEND);
render(main, boardElement, Position.BEFOREEND);
render(main, statistic.getElement(), Position.BEFOREEND);

const boardController = new BoardController(boardElement);
boardController.show(tasksData);

menuElement.addEventListener(`change`, (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== `INPUT`) {
    return;
  }

  const showStatistic = () => {
    statistic.getElement().classList.add(`visually-hidden`);
    boardController.show(tasksData);
  };

  const hideStatistic = () => {
    boardController.hide();
    statistic.getElement().classList.remove(`visually-hidden`);
  };

  const createTask = () => {
    boardController.createTask();
    menuElement.querySelector(`#control__task`).checked = true;
  };

  const actionById = {
    'control__task': showStatistic,
    'control__statistic': hideStatistic,
    'control__new-task': createTask
  };

  actionById[evt.target.id]();
});



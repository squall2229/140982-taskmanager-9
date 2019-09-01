import getTasks from './data/tasks';
import getFilters from './data/filters';

import {render, Position} from './utils/render';

import Menu from './components/menu';
import Search from './components/search';
import Filters from './components/filters';
import Board from './components/board';

import BoardController from './controllers/board';

const tasksData = getTasks();
const filtersData = getFilters(tasksData);

const menuElement = new Menu().getElement();
const searchElement = new Search().getElement();
const boardElement = new Board().getElement();
const filtersElement = new Filters(filtersData).getElement();

const main = document.querySelector(`.main`);
const mainControl = document.querySelector(`.main__control`);

render(mainControl, menuElement, Position.BEFOREEND);
render(main, searchElement, Position.BEFOREEND);
render(main, filtersElement, Position.BEFOREEND);
render(main, boardElement, Position.BEFOREEND);

const boardController = new BoardController(boardElement, tasksData);
boardController.init();



import {getMenuTemplate} from './components/menu';
import {getSearchTemplate} from './components/search';
import {getFilterTemplate} from './components/filter';
import {getBoardTemplate} from './components/board';
import {getSortTemplate} from './components/sort';
import {getCardEditTemplate} from './components/card-edit';
import {getCardTemplate} from './components/card';
import {getLoadMoreButtonTemplate} from './components/load-button';

const COUNT_CARDS = 3;

const main = document.querySelector(`.main`);
const mainControl = document.querySelector(`.main__control`);

const renderComponent = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

renderComponent(mainControl, getMenuTemplate(), `beforeend`);
renderComponent(main, getSearchTemplate(), `beforeend`);
renderComponent(main, getFilterTemplate(), `beforeend`);
renderComponent(main, getBoardTemplate(), `beforeend`);

const board = document.querySelector(`.board`);
const boardTasks = document.querySelector(`.board__tasks`);

renderComponent(board, getSortTemplate(), `afterbegin`);
renderComponent(boardTasks, getCardEditTemplate(), `beforeend`);

for (let i = 0; i < COUNT_CARDS; i++) {
  renderComponent(boardTasks, getCardTemplate(), `beforeend`);
}

renderComponent(board, getLoadMoreButtonTemplate(), `beforeend`);

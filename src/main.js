import MainController from './controllers/main';

const container = document.querySelector(`.main`);
const mainController = new MainController(container);

mainController.init();

// import getTasks from './data/tasks';
// import getFilters from './data/filters';

// import {render, Position} from './utils/render';

// import Menu from './components/menu';
// import Search from './components/search';
// import Filters from './components/filters';
// import Board from './components/board';
// import Statistic from './components/statistic';

// import BoardController from './controllers/board';
// import SearchController from './controllers/search';
// import StatisticController from './controllers/statistic';

// const tasksData = getTasks();
// const filtersData = getFilters(tasksData);

// const menu = new Menu();
// const search = new Search();
// const board = new Board();
// const statistic = new Statistic();
// const filters = new Filters(filtersData);

// const main = document.querySelector(`.main`);
// const mainControl = document.querySelector(`.main__control`);
// const boardController = new BoardController(board.getElement());

// const onSearchBackButtonClick = () => {
//   statistic.getElement().classList.add(`visually-hidden`);
//   searchController.hide();
//   boardController.show(tasksData);
// };

// const showStatistic = () => {
//   statisticController.hide();
//   boardController.show(tasksData);
// };

// const hideStatistic = () => {
//   boardController.hide();
//   statisticController.show();
// };

// const createTask = () => {
//   boardController.createTask();
//   menu.getElement().querySelector(`#control__task`).checked = true;
// };

// const actionById = {
//   'control__task': showStatistic,
//   'control__statistic': hideStatistic,
//   'control__new-task': createTask
// };

// const searchController = new SearchController(main, search, onSearchBackButtonClick);
// const statisticController = new StatisticController(main, tasksData);

// render(mainControl, menu.getElement(), Position.BEFOREEND);
// render(main, search.getElement(), Position.BEFOREEND);
// render(main, filters.getElement(), Position.BEFOREEND);
// render(main, board.getElement(), Position.BEFOREEND);
// statisticController.init();
// boardController.show(tasksData);

// menu.getElement().addEventListener(`change`, (evt) => {
//   evt.preventDefault();

//   if (evt.target.tagName !== `INPUT`) {
//     return;
//   }

//   actionById[evt.target.id]();
// });

// search.getElement().addEventListener(`click`, () => {
//   statisticController.hide();
//   boardController.hide();
//   searchController.show(tasksData);
// });



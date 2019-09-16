import getTasks from '../data/tasks';

import {render, Position} from '../utils/render';

import Menu from '../components/menu';
import Search from '../components/search';
import Board from '../components/board';
import Statistic from '../components/statistic';

import BoardController from '../controllers/board';
import SearchController from '../controllers/search';
import StatisticController from '../controllers/statistic';
import FiltersController from '../controllers/filters';

class MainController {
  constructor(container) {
    this._container = container;

    this._tasksData = getTasks();

    this._menu = new Menu();
    this._search = new Search();
    this._board = new Board();
    this._statistic = new Statistic();

    this._onSearchBackButtonClick = this._onSearchBackButtonClick.bind(this);
    this._showStatistic = this._showStatistic.bind(this);
    this._hideStatistic = this._hideStatistic.bind(this);
    this._createTask = this._createTask.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._boardController = new BoardController(this._board.getElement(), this._onDataChange);
    this._searchController = new SearchController(this._container, this._search, this._onSearchBackButtonClick);
    this._filtersController = new FiltersController(this._container, this._tasksData);
    this._statisticController = new StatisticController(this._container, this._tasksData);
  }

  init() {
    const actionById = {
      'control__task': this._showStatistic,
      'control__statistic': this._hideStatistic,
      'control__new-task': this._createTask
    };

    render(this._container.querySelector(`.main__control`), this._menu.getElement(), Position.BEFOREEND);
    render(this._container, this._search.getElement(), Position.BEFOREEND);
    this._filtersController.init();
    render(this._container, this._board.getElement(), Position.BEFOREEND);

    this._statisticController.init();
    this._boardController.show(this._tasksData);

    this._menu.getElement().addEventListener(`change`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      actionById[evt.target.id]();
    });

    this._search.getElement().addEventListener(`click`, () => {
      this._statisticController.hide();
      this._boardController.hide();
      this._searchController.show(this._tasksData);
    });
  }

  _onDataChange(data) {
    this._taskData = data;
    this._statisticController.update(this._taskData);
  }

  _onSearchBackButtonClick() {
    this._statistic.getElement().classList.add(`visually-hidden`);
    this._searchController.hide();
    this._boardController.show(this._tasksData);
  }

  _showStatistic() {
    this._statisticController.hide();
    this._boardController.show(this._tasksData);
  }

  _hideStatistic() {
    this._boardController.hide();
    this._statisticController.show();
  }

  _createTask() {
    this._boardController.createTask();
    this._menu.getElement().querySelector(`#control__task`).checked = true;
  }

}

export default MainController;

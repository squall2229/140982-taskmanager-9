import {
  getAmountAllTasks,
  getAmountOverDueTasks,
  getAmountTodayTasks,
  getAmountFavoritesTasks,
  getAmountRepeatingTasks,
  getAmountTagTasks,
  getAmountArchiveTasks
} from '../utils/filters';
import {render, Position, removeElement} from '../utils/render';

import Board from '../components/board';
import Search from '../components/search';
import Filters from '../components/filters';

const filtersCount = {
  all: getAmountAllTasks,
  overdue: getAmountOverDueTasks,
  today: getAmountTodayTasks,
  favorites: getAmountFavoritesTasks,
  repeating: getAmountRepeatingTasks,
  tags: getAmountTagTasks,
  archive: getAmountArchiveTasks
};

class FiltersController {
  constructor(container, boardController, statisticController, data, onDataChangeMain, hideStatistic) {
    this._container = container;
    this._data = data;
    this._board = new Board();
    this._search = new Search();
    this._onDataChangeMain = onDataChangeMain;
    this._hideStatistic = hideStatistic;

    this._statisticController = statisticController;
    this._boardController = boardController;
    this._filters = new Filters(this._updateCountFilters());
  }

  init() {
    this._renderView();
  }

  update(data) {
    this._data = data;

    this._removeView();
    this._filters = new Filters(this._updateCountFilters());
    this._renderView();
  }

  _updateCountFilters() {
    let newData = {};

    for (let key in filtersCount) {
      if (filtersCount[key]) {
        newData[key] = filtersCount[key](this._data).length;
      }
    }

    return newData;
  }

  _removeView() {
    removeElement(this._filters.getElement());
    this._filters.removeElement();
  }

  _renderView() {
    this._container.append(this._filters.getElement());

    this._filters.getElement()
      .addEventListener(`change`, (evt) => {
        evt.preventDefault();

        if (evt.target.tagName !== `INPUT`) {
          return;
        }

        const id = evt.target.id.split(`__`)[1].toLowerCase();
        const data = filtersCount[id](this._data);

        this._hideStatistic();

        this._board.getElement().innerHTML = ``;
        this._boardController.show(data);
      });
  }
}

export default FiltersController;

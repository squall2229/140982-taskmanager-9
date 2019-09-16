import Filters from '../components/filters';
import {FILTERS_TITLES} from '../data/filters';
import {render, Position} from '../utils/render';

class FiltersController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._filters = new Filters(FILTERS_TITLES);
  }

  init() {
    render(this._container, this._filters.getElement(), Position.BEFOREEND);

    this._filters.getElement()
      .addEventListener(`change`, (evt) => {
        evt.preventDefault();

        if (evt.target.tagName !== `INPUT`) {
          return;
        }

        const id = evt.target.id.split(`__`)[1].toLowerCase();

        console.log(id);
      });
  }
}

export default FiltersController;

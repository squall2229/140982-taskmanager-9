import {createElement} from '../utils/render';

class Filters {
  constructor(filterList) {
    this._filterList = filterList;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }

  getFilterTemplate({title, count}) {
    return `
    <input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      checked
    />
    <label for="filter__${title}" class="filter__label">
      ${title} <span class="filter__${title}-count">${count}</span>
    </label>
  `.trim();
  }

  getTemplate() {
    return `
      <section class="main__filter filter container">
        ${this._filterList.map((filter) => this.getFilterTemplate(filter)).join(``)}
      </section>
    `.trim();
  }
}

export default Filters;

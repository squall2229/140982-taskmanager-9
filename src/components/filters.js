import AbstractComponent from './abstract';

class Filters extends AbstractComponent {
  constructor(filterList) {
    super();
    this._filterList = filterList;
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

import AbstractComponent from './abstract';

class Filters extends AbstractComponent {
  constructor(data) {
    super();

    this._data = data;
  }

  getFilterTemplate({title, count = 0}, index) {
    return `
    <input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      ${index === 0 ? `checked` : ``}
      ${count === 0 ? `disabled` : ``}
    />
    <label for="filter__${title}" class="filter__label">
      ${title} <span class="filter__${title}-count">${count ? count : 0}</span>
    </label>
  `.trim();
  }

  getTemplate() {
    return `
      <section class="main__filter filter container">
        ${Object.keys(this._data).map((title, index) => this.getFilterTemplate({title, count: this._data[title]}, index)).join(``)}
      </section>
    `.trim();
  }
}

export default Filters;

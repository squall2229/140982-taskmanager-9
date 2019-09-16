import AbstractComponent from './abstract';

class Filters extends AbstractComponent {
  constructor(filterList) {
    super();
    this._filterList = filterList;
  }

  getFilterTemplate(title, count, index) {
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
        ${this._filterList.map((filter, index) => this.getFilterTemplate(filter, null, index)).join(``)}
      </section>
    `.trim();
  }
}

export default Filters;

import AbstractComponent from './abstract';

class SearchResultGroup extends AbstractComponent {
  getTemplate() {
    return `
      <section class="result__group">
        <div class="result__cards"></div>
      </section>`.trim();
  }
}

export default SearchResultGroup;

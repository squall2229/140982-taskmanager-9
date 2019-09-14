import AbstractComponent from './abstract';

class SearchResult extends AbstractComponent {
  getTemplate() {
    return `
    <section class="result container">
        <button class="result__back">back</button>
      </section>
  `.trim();
  }
}

export default SearchResult;

import AbstractComponent from './abstract';

class Sort extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <div class="board__filter-list">
        <a href="#" class="board__filter">SORT BY DEFAULT</a>
        <a href="#" class="board__filter">SORT BY DATE up</a>
        <a href="#" class="board__filter">SORT BY DATE down</a>
      </div
    `.trim();
  }
}

export default Sort;


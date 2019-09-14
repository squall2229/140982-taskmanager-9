import AbstractComponent from './abstract';

class Sort extends AbstractComponent {
  getTemplate() {
    return `
      <div class="board__filter-list">
        <a href="#" data-sort-type="default" class="board__filter">SORT BY DEFAULT</a>
        <a href="#" data-sort-type="up" class="board__filter">SORT BY DATE up</a>
        <a href="#" data-sort-type="down" class="board__filter">SORT BY DATE down</a>
      </div
    `.trim();
  }
}

export default Sort;


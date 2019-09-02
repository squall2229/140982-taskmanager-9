import AbstractComponent from './abstract';

class Board extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <section class="board container">
      </section>`.trim();
  }
}

export default Board;

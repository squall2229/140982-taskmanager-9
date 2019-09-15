import AbstractComponent from './abstract';

class Board extends AbstractComponent {
  getTemplate() {
    return `
      <section class="board container">
      </section>`.trim();
  }
}

export default Board;

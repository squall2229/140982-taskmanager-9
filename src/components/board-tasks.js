import AbstractComponent from './abstract';

class BoardTasks extends AbstractComponent {
  getTemplate() {
    return `
      <div class="board__tasks">
      </div>`.trim();
  }
}

export default BoardTasks;

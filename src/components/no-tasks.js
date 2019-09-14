import AbstractComponent from './abstract';

class NoTasks extends AbstractComponent {
  getTemplate() {
    return `
      <p class="board__no-tasks">
        Congratulations, all tasks were completed! To create a new click on
        «add new task» button.
      </p>`.trim();
  }
}

export default NoTasks;

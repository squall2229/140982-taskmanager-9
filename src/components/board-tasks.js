import {createElement} from '../utils/render';

class BoardTasks {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }

  getTemplate() {
    return `
      <div class="board__tasks">
      </div>`.trim();
  }
}

export default BoardTasks;

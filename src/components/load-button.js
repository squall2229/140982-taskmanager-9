import AbstractComponent from './abstract';

class LoadButton extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`.trim();
  }
}

export default LoadButton;

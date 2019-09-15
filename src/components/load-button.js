import AbstractComponent from './abstract';

class LoadButton extends AbstractComponent {
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`.trim();
  }
}

export default LoadButton;

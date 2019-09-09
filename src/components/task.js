import AbstractComponent from './abstract';
import isRepeat from '../utils/isRepeat';

class Task extends AbstractComponent {
  constructor({description, dueDate, tags, color, repeatingDays, isFavorite, isArchive}) {
    super();
    this._description = description;
    this._dueDate = dueDate;
    this._tags = tags;
    this._color = color;
    this._isFavorite = isFavorite;
    this._isArchive = isArchive;
    this._repeatingDays = repeatingDays;
  }

  getTagsList() {
    return Array.from(this._tags).map((tag) => this.getTagTemplate(tag)).join(``);
  }

  getTagTemplate(title) {
    return `
      <span class="card__hashtag-inner">
        <span class="card__hashtag-name">
          #${title}
        </span>
      </span>`.trim();
  }

  getTemplate() {
    return `
    <article class="card card--${this._color} ${isRepeat(this._repeatingDays) ? `card--repeat` : ``}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive ${this._isArchive ? `card__btn--disabled` : ``}">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${this._isFavorite ? `card__btn--disabled` : ``}"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${this._description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              ${this._dueDate ? `<div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${this._dueDate.toDateString()}</span>
                  </p>
                </div>
              </div>` : ``}

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${this.getTagsList(this._tags)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  `.trim();
  }
}

export default Task;

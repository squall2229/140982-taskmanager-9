import isRepeat from '../utils/isRepeat';

const getTagsList = (tags) => {
  return Array.from(tags).map((tag) => getTagTemplate(tag)).join(``);
};

const getTagTemplate = (title) => {
  return (`<span class="card__hashtag-inner">
    <span class="card__hashtag-name">
      #${title}
    </span>
  </span>`.trim());
};

export const getTaskTemplate = ({
  description,
  dueDate,
  repeatingDays,
  tags,
  color,
  isFavorite,
  isArchive
}) => {
  return `
    <article class="card card--${color} ${isRepeat(repeatingDays) ? `card--repeat` : ``}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn ${isArchive ? `card__btn--archive` : ``}">
              archive
            </button>
            <button
              type="button"
              class="card__btn ${isFavorite ? `card__btn--favorites` : ``} card__btn--disabled"
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
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${dueDate.toDateString()}</span>
                  </p>
                </div>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${getTagsList(tags)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  `.trim();
};

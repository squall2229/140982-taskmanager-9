import {render, Position, removeElement, createElement} from '../utils/render';
import getFormData from '../utils/getFormData';
import Task from '../components/task';
import TaskEdit from '../components/task-edit';

class TaskController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._taskView = new Task(data);
    this._taskEdit = new TaskEdit(data);

    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;

    this.init();
  }

  init() {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onDeleteHastTag = (evt) => {
      evt.target.removeEventListener(`click`, onDeleteHastTag);
      removeElement(evt.target.parentNode);
    };

    const onEnterDown = (evt) => {
      if (evt.key === `Enter`) {
        evt.preventDefault();

        const hashTagList = this._taskEdit.getElement().querySelector(`.card__hashtag-list`);
        const hashTagField = this._taskEdit.getElement().querySelector(`.card__hashtag-input`);
        const newHastTagElement = createElement(this._taskEdit.getTagTemplate(hashTagField.value));

        render(hashTagList, newHastTagElement, Position.BEFOREEND);

        hashTagField.value = ``;
        newHastTagElement.addEventListener(`click`, onDeleteHastTag.bind(this));

        document.removeEventListener(`keydown`, onEnterDown);
      }
    };

    const addListenersCheckboxesColor = () => {
      const checkboxesColor = this._taskEdit.getElement()
      .querySelectorAll(`.card__color-input`);

      const COLORS = [
        `black`,
        `yellow`,
        `blue`,
        `green`,
        `pink`,
      ];

      Array.from(checkboxesColor).forEach((checkbox) => {
        checkbox.addEventListener(`change`, (evt) => {
          COLORS.forEach((color) => this._taskEdit.getElement().classList.remove(`card--${color}`));
          this._taskEdit.getElement().classList.add(`card--${evt.target.value}`);
        });
      });
    };

    const addListenersHashTags = () => {
      const hashTagsDelete = this._taskEdit.getElement().querySelectorAll(`.card__hashtag-delete`);

      if (hashTagsDelete.length) {
        Array.from(hashTagsDelete).forEach((hashTagElement) => {
          hashTagElement.addEventListener(`click`, onDeleteHastTag);
        });
      }
    };

    this._taskEdit.getElement()
      .querySelector(`.card__hashtag-input`)
      .addEventListener(`focus`, () => {
        document.addEventListener(`keydown`, onEnterDown.bind(this));
      });

    this._taskEdit.getElement()
      .querySelector(`.card__hashtag-input`)
      .addEventListener(`blur`, () => {
        document.removeEventListener(`keydown`, onEnterDown);
      });

    this._taskView.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        this._onChangeView();
        this._container.getElement().replaceChild(this._taskEdit.getElement(), this._taskView.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEdit.getElement()
      .querySelector(`.card__form`)
      .addEventListener(`submit`, (evt) => {
        evt.preventDefault();

        const entry = getFormData(this._taskEdit.getElement());
        this._onDataChange(entry, this._data);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEdit.getElement()
      .querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const element = this._taskEdit.getElement().querySelector(`.card__date-status`);
        const fieldContainer = this._taskEdit.getElement().querySelector(`.card__date-deadline`);
        const field = this._taskEdit.getElement().querySelector(`.card__date`);

        element.classList.toggle(`card__date-status--active`);
        fieldContainer.classList.toggle(`visually-hidden`);

        if (element.classList.contains(`card__date-status--active`)) {
          element.textContent = `no`;
          field.value = ``;
        } else {
          element.textContent = `yes`;
        }

      });

    this._taskEdit.getElement()
      .querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const element = this._taskEdit.getElement().querySelector(`.card__repeat-status`);
        const fieldsContainer = this._taskEdit.getElement().querySelector(`.card__repeat-days`);
        const fields = this._taskEdit.getElement().querySelectorAll(`.card__repeat-day-input`);

        element.classList.toggle(`card__repeat-status--active`);
        fieldsContainer.classList.toggle(`visually-hidden`);
        this._taskEdit.getElement().classList.toggle(`card--repeat`);

        if (element.classList.contains(`card__repeat-status--active`)) {
          element.textContent = `no`;
          Array.from(fields).forEach((field) => {
            field.checked = false;
          });
        } else {
          element.textContent = `yes`;
        }
      });

    this._taskView.getElement()
      .querySelector(`.card__btn--archive`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const entry = Object.assign({}, this._data, {isArchive: true});

        this._onDataChange(entry, this._data);
      });

    addListenersCheckboxesColor();
    addListenersHashTags();

    render(this._container.getElement(), this._taskView.getElement(), Position.AFTERBEGIN);
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._taskEdit.getElement())) {
      this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    }
  }
}

export default TaskController;

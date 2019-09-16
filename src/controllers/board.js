import BoardTasks from '../components/board-tasks';
import Sort from '../components/sort';
import NoTasks from '../components/no-tasks';
import LoadButton from '../components/load-button';
import {render, removeElement, Position} from '../utils/render';

import TaskListController from './task-list';

const COUNT_TASKS_LOAD = 8;
let currentCountTasks = COUNT_TASKS_LOAD;

class BoardController {
  constructor(container) {
    this._container = container;
    this._tasks = [];
    this._board = new BoardTasks();
    this._noTasks = new NoTasks();
    this._sort = new Sort();
    this._loadButton = new LoadButton();

    this._taskListController = new TaskListController(this._board.getElement(), this._onDataChange.bind(this));
  }

  createTask() {
    this._taskListController.createTask();
  }

  hide() {
    this._board.getElement().classList.add(`visually-hidden`);
    this._loadButton.getElement().classList.add(`visually-hidden`);
    this._sort.getElement().classList.add(`visually-hidden`);
  }

  show(tasksData) {
    if (tasksData !== this._tasks) {
      this._setTasks(tasksData);
    }

    this._board.getElement().classList.remove(`visually-hidden`);
    this._loadButton.getElement().classList.remove(`visually-hidden`);
    this._sort.getElement().classList.remove(`visually-hidden`);
  }

  _setTasks(tasksData) {
    this._tasks = tasksData;

    if (this._tasks.length) {
      this._renderTasks();
    } else {
      render(this._container, this._noTasks.getElement(), Position.BEFOREEND);
    }
  }

  _renderTasks() {
    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._container, this._loadButton.getElement(), Position.BEFOREEND);

    this._loadButton.getElement().addEventListener(`click`, (event) => {
      event.preventDefault();

      currentCountTasks += COUNT_TASKS_LOAD;
      this._renderTasks();
    });

    this._sort.getElement().addEventListener(`click`, this._onSortLinkClick.bind(this));

    if (currentCountTasks >= this._tasks.length || this._tasks.length <= COUNT_TASKS_LOAD) {
      removeElement(this._loadButton.getElement());
      this._loadButton.removeElement();
    }

    this._taskListController.setTasks(this._tasks.slice(0, currentCountTasks));
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    const sortByDateUp = () => {
      const sortedByDateUpTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
      this._taskListController.setTasks(sortedByDateUpTasks);
    };

    const sortByDateDown = () => {
      const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
      this._taskListController.setTasks(sortedByDateDownTasks);
    };

    const sortByDefault = () => {
      this._taskListController.setTasks(this._tasks);
    };

    const sortByType = {
      up: sortByDateUp,
      down: sortByDateDown,
      default: sortByDefault
    };

    if (evt.target.tagName !== `A`) {
      return;
    }

    sortByType[evt.target.dataset.sortType]();
  }

  _onDataChange(tasks) {
    this._tasks = [...tasks, ...this._tasks.slice(currentCountTasks)];
    this._renderTasks();
  }
}

export default BoardController;

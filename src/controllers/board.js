import BoardTasks from '../components/board-tasks';
import Sort from '../components/sort';
import NoTasks from '../components/no-tasks';
import LoadButton from '../components/load-button';
import {render, removeElement, Position} from '../utils/render';

import TaskController, {Mode} from './task';

const COUNT_TASKS_LOAD = 8;
let currentCountTasks = COUNT_TASKS_LOAD;
const TaskControllerMode = Mode;

class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new BoardTasks();
    this._noTasks = new NoTasks();
    this._sort = new Sort();
    this._loadButton = new LoadButton();

    this._subscriptions = [];
  }

  init() {
    if (this. _isShowTasks()) {
      render(this._container, this._sort.getElement(), Position.BEFOREEND);

      this._renderTasks(this._tasks);

      this._loadButton.getElement().addEventListener(`click`, (event) => {
        event.preventDefault();

        currentCountTasks += COUNT_TASKS_LOAD;
        this._renderTasks(this._tasks);
      });

    } else {
      render(this._container, this._noTasks.getElement(), Position.BEFOREEND);
    }
  }

  hide() {
    this._board.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this._board.getElement().classList.remove(`visually-hidden`);
  }

  createTask() {
    const defaultTask = {
      description: ``,
      dueDate: new Date(),
      tags: new Set(),
      color: [],
      repeatingDays: {},
      isFavorite: false,
      isArchive: false,
    };

    const taskController = new TaskController(this._board, defaultTask, TaskControllerMode.ADDING, this._onDataChange.bind(this), this._onChangeView.bind(this));
  }

  _renderTasks(tasksData) {
    removeElement(this._board.getElement());
    this._board.removeElement();

    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._container, this._loadButton.getElement(), Position.BEFOREEND);

    if (currentCountTasks >= tasksData.length || tasksData.length <= COUNT_TASKS_LOAD) {
      removeElement(this._loadButton.getElement());
      this._loadButton.removeElement();
    }

    tasksData
      .slice(0, currentCountTasks)
      .forEach(this._renderTask.bind(this));

    this._sort.getElement().addEventListener(`click`, this._onSortLinkClick.bind(this));
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    const sortByDateUp = () => {
      const sortedByDateUpTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
      sortedByDateUpTasks.forEach((taskMock) => this._renderTask(taskMock));
    };

    const sortByDateDown = () => {
      const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
      sortedByDateDownTasks.forEach((taskMock) => this._renderTask(taskMock));
    };

    const sortByDefault = () => {
      this._tasks.forEach((taskMock) => this._renderTask(taskMock));
    };

    const sortByType = {
      up: sortByDateUp,
      down: sortByDateDown,
      default: sortByDefault
    };

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._board.getElement().innerHTML = ``;
    sortByType[evt.target.dataset.sortType]();
  }

  _renderTask(taskMock) {
    const taskController = new TaskController(this._board, taskMock, TaskControllerMode.DEFAULT, this._onDataChange.bind(this), this._onChangeView.bind(this));
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {

    const index = this._tasks.findIndex((it) => it === oldData);

    if (newData === null) {
      this._tasks = [...this._tasks.slice(0, index), ...this._tasks.slice(index + 1)];
    } else if (oldData === null) {
      this._tasks = [newData, ...this._tasks];
    } else {
      this._tasks[index] = newData;
    }

    this._renderTasks(this._tasks);
  }

  _isShowTasks() {
    return this._tasks.length && this._tasks.filter((task) => !task.isArchive).length;
  }
}

export default BoardController;

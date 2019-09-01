import BoardTasks from '../components/board-tasks';
import Sort from '../components/sort';
import Task from '../components/task';
import TaskEdit from '../components/task-edit';
import NoTasks from '../components/no-tasks';
import LoadButton from '../components/load-button';
import {render, removeElement, Position} from '../utils/render';

const COUNT_TASKS_LOAD = 8;
let page = 0;
let currentCountTasks = COUNT_TASKS_LOAD;
let activeTask = null;
let defaultTask = null;

class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new BoardTasks();
    this._noTasks = new NoTasks();
    this._sort = new Sort();
    this._loadButton = new LoadButton();
  }

  init() {
    if (this. _isShowTasks()) {
      this._renderTasks();
      render(this._container, this._loadButton.getElement(), Position.BEFOREEND);

      this._loadButton.getElement().addEventListener(`click`, (event) => {
        event.preventDefault();

        page += 1;
        currentCountTasks += COUNT_TASKS_LOAD;
        this._renderTasks();
      });

    } else {
      render(this._container, this._noTasks.getElement(), Position.BEFOREEND);
    }
  }

  _renderTasks() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._container, this._sort.getElement(), Position.AFTERBEGIN);

    if (currentCountTasks >= this._tasks.length) {
      removeElement(this._loadButton.getElement());
      this._loadButton.removeElement();
    }

    render(this._container, this._board.getElement(), Position.BEFOREEND);

    this._tasks
        .slice(page * COUNT_TASKS_LOAD, currentCountTasks)
        .forEach(this._renderTask.bind(this));
  }

  _renderTask(taskMock) {
    const task = new Task(taskMock);
    const taskEdit = new TaskEdit(taskMock);
    const tasksContainer = this._container.querySelector(`.board__tasks`);

    const onEscKeyDown = (evt) => {
      activeTask = null;
      defaultTask = null;

      if (evt.key === `Escape` || evt.key === `Esc`) {
        tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    task.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {

        if (activeTask && defaultTask) {
          tasksContainer.replaceChild(defaultTask, activeTask);
        }

        tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
        activeTask = taskEdit.getElement();
        defaultTask = task.getElement();
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement()
      .querySelector(`.card__form`)
      .addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        activeTask = null;
        defaultTask = null;
        tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._board.getElement(), task.getElement(), Position.BEFOREEND);
  }

  _isShowTasks() {
    return this._tasks.length && this._tasks.filter((task) => !task.isArchive).length;
  }
}

export default BoardController;

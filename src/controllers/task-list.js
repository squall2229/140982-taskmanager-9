import TaskController, {Mode} from './task';

const TaskControllerMode = Mode;

class TaskListController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChangeMain = onDataChange;

    this._creatingTask = null;
    this._subscriptions = [];
    this._tasks = [];

    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  setTasks(tasksData) {
    this._tasks = tasksData;
    this._subscriptions = [];

    this._container.innerHTML = ``;
    this._tasks.forEach((task) => this._renderTask(task));
  }

  createTask() {
    if (this._creatingTask) {
      return;
    }

    const defaultTask = {
      description: ``,
      dueDate: new Date(),
      tags: new Set(),
      color: [],
      repeatingDays: {},
      isFavorite: false,
      isArchive: false,
    };

    const onDataChange = (...args) => {
      this._creatingTask = null;
      this._onDataChange(...args);
    };

    this._creatingTask = new TaskController(this._container, defaultTask, TaskControllerMode.ADDING, onDataChange, this._onChangeView);
  }

  _renderTask(taskMock) {
    const taskController = new TaskController(this._container, taskMock, TaskControllerMode.DEFAULT, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _onDataChange(newData, oldData) {
    const index = this._tasks.findIndex((task) => task === oldData);

    if (newData === null) {
      this._tasks = [...this._tasks.slice(0, index), ...this._tasks.slice(index + 1)];
    } else if (oldData === null) {
      this._tasks = [newData, ...this._tasks];
    } else {
      this._tasks[index] = newData;
    }

    this.setTasks(this._tasks);
    this._onDataChangeMain(this._tasks);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }
}

export default TaskListController;

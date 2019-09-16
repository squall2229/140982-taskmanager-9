import flatpickr from 'flatpickr';
import moment from 'moment';
import {render, Position} from '../utils/render';

import Statistic from '../components/statistic';
import drawDaysChart from '../components/days-chart';
import drawTagsChart from '../components/tags-chart';
import drawColorsChart from '../components/colors-chart';

const WEEK_DAYS = 7;

class StatisticController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._statisticView = new Statistic(this._data);
  }

  init() {
    this.hide();

    render(this._container, this._statisticView.getElement(), Position.BEFOREEND);

    const completeTasks = this._data.filter((task) => task.isArchive);
    const daysCtx = this._container.querySelector(`.statistic__days`);
    const tagsCtx = this._container.querySelector(`.statistic__tags`);
    const colorsCtx = this._container.querySelector(`.statistic__colors`);
    const inputDate = this._container.querySelector(`.statistic__period-input`);
    const defaultDate = this._getDefaultDate();

    flatpickr(inputDate, {
      altInput: true,
      altFormat: `d M`,
      mode: `range`,
      dateFormat: `d F h:i K`,
      defaultDate,
      onChange: (value) => {
        drawDaysChart(daysCtx, value[0], value[1], completeTasks);
      }
    });

    drawDaysChart(daysCtx, defaultDate[0], defaultDate[1], completeTasks);
    drawTagsChart(tagsCtx, this._data);
    drawColorsChart(colorsCtx, this._data);
  }

  show() {
    this._statisticView.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this._statisticView.getElement().classList.add(`visually-hidden`);
  }

  _getDefaultDate() {
    const currentCountDayOfWeek = parseFloat(moment(new Date()).format(`d`));
    const startDefaultDate = new Date(moment(new Date()).subtract(currentCountDayOfWeek - 1, `days`));
    const endDefaultDate = new Date(moment(new Date()).add(WEEK_DAYS - currentCountDayOfWeek, `days`));

    return [startDefaultDate, endDefaultDate];
  }
}

export default StatisticController;

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

const getCountTasks = (data, index, labels) => {
  return data.filter((task) => moment(task.dueDate).format(`DD MMM`) === labels[index]).length;
};

const isEqualDateToEndDate = (date, endDate) => {
  return date.format(`DD MMM`) !== moment(endDate).format(`DD MMM`);
};

const getDataAndLabels = (startDate, endDate, tasksData) => {
  let index = 0;
  const date = moment(startDate);
  const labels = [date.format(`DD MMM`)];
  const data = [getCountTasks(tasksData, index, labels)];

  while (isEqualDateToEndDate(date, endDate)) {
    index++;
    date.add(1, `d`);
    labels.push(date.format(`DD MMM`));
    data.push(getCountTasks(tasksData, index, labels));
  }

  return {data, labels};
};

const drawDaysChart = (container, startDate, endDate, tasksData) => {
  const {data, labels} = getDataAndLabels(startDate, endDate, tasksData);

  return new Chart(container, {
    plugins: [ChartDataLabels],
    type: `line`,
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: `transparent`,
        borderColor: `#000000`,
        borderWidth: 1,
        lineTension: 0,
        pointRadius: 8,
        pointHoverRadius: 8,
        pointBackgroundColor: `#000000`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 8
          },
          color: `#ffffff`
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            display: false
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            fontStyle: `bold`,
            fontColor: `#000000`
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }]
      },
      legend: {
        display: false
      },
      layout: {
        padding: {
          top: 10
        }
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

export default drawDaysChart;

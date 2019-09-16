import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {flatten, resultReduce} from '../utils/tasks';
import {getRandomColor} from '../utils/random';

const drawTagsChart = (container, taskData) => {
  let labelsTitle = [];
  let labelsCount = [];
  const labelsAll = flatten(taskData.map((task) => Array.from(task.tags)));
  const {result} = resultReduce(labelsAll);

  result.forEach((item) => {
    const key = Object.keys(item)[0];
    labelsTitle.push(key);
    labelsCount.push(item[key]);
  });

  return new Chart(container, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: labelsTitle,
      datasets: [{
        data: labelsCount,
        backgroundColor: labelsTitle.map(() => getRandomColor())
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: TAGS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });
};

export default drawTagsChart;

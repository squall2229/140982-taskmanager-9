import moment from 'moment';

export const getAllTasks = (taskList) => taskList.filter((task) => !task.isArchive);

export const isHasDescription = (task, value) => task.description.includes(value);

export const isHasTag = (task, value) => {
  const tagValue = value.replace(`#`, ``);
  return Array.from(task.tags).find((tag) => tag.includes(tagValue));
};

export const isHasDate = (task, value) => {
  const taskDate = moment(task.dueDate);
  const values = value.toLowerCase().replace(`d`, ``).split(`.`);
  let inputDate = ``;

  const isFullValues = () => values.filter((el) => el).length === 3;

  if (isFullValues()) {
    inputDate = moment(`${values[1]}, ${values[0]}, ${values[2]}`);
    return taskDate.format(`DD-MM-YYYY`) === inputDate.format(`DD-MM-YYYY`);
  }

  return false;
};

export const groupBy = (arr, prop) => {
  return arr.reduce((groups, item) => {
    let val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});
};

export const flatten = (arr) => arr.reduce((flat, toFlatten) => {
  return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
}, []);

export const resultReduce = (arr) => arr.reduce(function (acc, cur) {
  if (!acc.hash[cur]) {
    acc.hash[cur] = {[cur]: 1};
    acc.result.push(acc.hash[cur]);
  } else {
    acc.hash[cur][cur] += 1;
  }
  return acc;
}, {
  hash: {},
  result: []
});

export const getAllTasks = (taskList) => taskList.filter((task) => !task.isArchive);

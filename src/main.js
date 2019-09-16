import MainController from './controllers/main';

const container = document.querySelector(`.main`);
const mainController = new MainController(container);

mainController.init();



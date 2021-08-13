import {Model} from './Model';
import {NavController} from './NavController';
import {NavView} from './NavView';
import {AppController} from './AppController';
import {AppView} from './AppView';
import './scss/style.scss';

const model = new Model();

const navEl = document.getElementById('nav');
const navView = new NavView(navEl);
new NavController(model, navView);

const appEl = document.getElementById('app');
const appView = new AppView(appEl);
new AppController(model, appView);

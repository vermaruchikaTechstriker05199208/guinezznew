import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { icons } from './assets/icons'
// import logo from  "../src/images";
import Logoimage from "../src/assets/icons/logoimage";
import { Provider } from 'react-redux'
// import store from './store'
import { configureStore } from "./redux/store";
React.icons = icons

ReactDOM.render(
  <Provider store={configureStore()}>

    <App/>
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

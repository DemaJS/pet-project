import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./State/Store";
import {App} from "./App";

ReactDOM.render(
  <React.StrictMode>
      <HashRouter basename='/'>
          <Provider store={store}>
              <App />
          </Provider>
      </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);



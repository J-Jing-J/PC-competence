import './wdyr'
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.less'  //自定义antd的主题
// creat react app configuration override

import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProviders } from './context';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

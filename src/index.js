import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {BrowserRouter , Route} from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.css';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')

// );
ReactDOM.render((
  <BrowserRouter>
    <Route component={App} />
  </BrowserRouter>
), document.getElementById('root'))
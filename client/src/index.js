import React from 'react';
import ReactDOM from 'react-dom';
import {ContextProvider} from './SocketContext'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <ContextProvider>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </ContextProvider>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

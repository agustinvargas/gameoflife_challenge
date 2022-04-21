import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BoardCtx from './contexts/BoardCtx';
import ModalCtx from './contexts/ModalCtx';
import './styles/normalize.css'; // Firts normalize the styles
import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root')); // React 18
root.render(
  <React.StrictMode>
    <BoardCtx>
      <ModalCtx>
        <App />
      </ModalCtx>
    </BoardCtx>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

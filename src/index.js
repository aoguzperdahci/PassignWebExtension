import React from 'react';
import "./index.css";
import ReactDOM from 'react-dom';
import App from './components/App';
import configureStore from "./redux/configureStore"
import { Provider } from "react-redux"

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div style={{minWidth:450, minHeight:600, maxWidth:450, maxHeight:600}}>
        <App />
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById('popup-div')
);

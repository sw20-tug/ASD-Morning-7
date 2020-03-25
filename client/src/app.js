import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, compose, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import axios from 'axios';

import reducers from "./reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import App from './modules/app/App';

axios.defaults.baseURL = (process.env.NODE_ENV === 'development') ? 'http://localhost:8080/api' : '/api';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
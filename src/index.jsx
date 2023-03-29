import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import combineReducers from './reducers/index.js';
import { createStore,applyMiddleware,compose } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import "mapbox-gl/dist/mapbox-gl.css";
import { composeWithDevTools } from "redux-devtools-extension";
const root=ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(combineReducers,composeWithDevTools(applyMiddleware(thunk)));

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

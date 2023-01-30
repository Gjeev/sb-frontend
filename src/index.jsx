import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import reducers from './reducers';
import { createStore,applyMiddleware,compose } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import "mapbox-gl/dist/mapbox-gl.css";

const root=ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(reducers,compose(applyMiddleware(thunk)));

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

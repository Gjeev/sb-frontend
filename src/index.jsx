import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import combineReducers from "./reducers/index.js";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "mapbox-gl/dist/mapbox-gl.css";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { TourProvider } from "@reactour/tour";
import { steps } from "./data/tutorial.js";

const cartTransform = createTransform(
  (persistedState, _key) => {
    return {
      items: persistedState, //.items?
    };
  },
  (state, _key) => {
    return state.items;
  },
  {
    whitelist: ["items"],
  }
);

const authTransform = createTransform(
  (persistedState, _key) => {
    return {
      isAuthenticated: persistedState.isAuthenticated,
      user: persistedState.user,
      token: persistedState.token,
    };
  },
  (state, _key) => {
    return {
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      token: state.token,
    };
  },
  {
    whitelist: ["auth"],
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
const persistConfig = {
  key: "root",
  storage,
  transforms: [cartTransform, authTransform],
};
const persistedReducer = persistReducer(persistConfig, combineReducers);
let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
let persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <TourProvider steps={steps}>
        <App />
      </TourProvider>
    </PersistGate>
  </Provider>
);

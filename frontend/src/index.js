import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./components/App/App";
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import store from "./store/store";
import { Provider } from 'react-redux';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBGl9eh-q0bBuu5CdrmvalbNvig23Gm99c",
  authDomain: "gisty-7c6ec.firebaseapp.com",
  databaseURL: "https://gisty-7c6ec-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gisty-7c6ec",
  storageBucket: "gisty-7c6ec.appspot.com",
  messagingSenderId: "122486214875",
  appId: "1:122486214875:web:039b77419e8398abc3bcfe",
  measurementId: "G-2TZKLB0N7X"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase();
export const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

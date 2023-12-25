import React from "react";
import { createRoot } from "react-dom/client";
import './index.css'
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App"
import { BrowserRouter } from "react-router-dom";

const el = document.getElementById('root');
const root = createRoot(el);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
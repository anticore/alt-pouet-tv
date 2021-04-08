import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./client/App";
import { Provider } from "./client/context";

ReactDOM.render(
    <React.StrictMode>
        <Provider>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

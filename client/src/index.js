import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ImageProvider } from "./context/ImageContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            {/* contextapi 사용할 수 있게 감쌓준다. */}
            <ImageProvider>
                <App />
            </ImageProvider>
        </BrowserRouter>
    </React.StrictMode>
);

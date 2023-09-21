import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { ImageProvider } from "./context/ImageContext";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                {/* contextapi 사용할 수 있게 감쌓준다. */}
                <ImageProvider>
                    <App />
                </ImageProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);

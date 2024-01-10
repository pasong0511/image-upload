import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ImagePage from "./pages/ImagePage";

import Toolbar from "./components/Toolbar";

const App = () => {
  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <ToastContainer />
      <Toolbar />
      <Routes>
        <Route path="/images/:imageId" exact element={<ImagePage />} />
        <Route path="/auth/login" exact element={<LoginPage />} />
        <Route path="/auth/register" exact element={<RegisterPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
};

export default App;

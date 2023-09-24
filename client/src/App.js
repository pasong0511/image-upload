import "./App.css";
import UploadForm from "./components/UploadForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Routes, Route } from "react-router-dom";
import Toolbar from "./components/Toolbar";

const App = () => {
    const notify = () => toast("Wow so easy!");

    return (
        <div style={{ maxWidth: 600, margin: "auto" }}>
            <ToastContainer />
            <Toolbar />
            <Routes>
                <Route path="/auth/login" exact element={<LoginPage />} />
                <Route path="/auth/register" exact element={<RegisterPage />} />
                <Route path="/" element={<MainPage />} />
            </Routes>
        </div>
    );
};

export default App;

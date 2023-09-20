import "./App.css";
import UploadForm from "./components/UploadForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Routes, Route } from "react-router-dom";

const App = () => {
    const notify = () => toast("Wow so easy!");

    return (
        <div style={{ maxWidth: 600, margin: "auto" }}>
            <ToastContainer />

            <Routes>
                <Route path="/auth/register" exact element={<LoginPage />} />
                <Route path="/auth/login" exact element={<RegisterPage />} />
                <Route path="/" element={<MainPage />} />
            </Routes>
        </div>
    );
};

export default App;

import "./App.css";
import UploadForm from "./components/UploadForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    const notify = () => toast("Wow so easy!");

    return (
        <div style={{ maxWidth: 600, margin: "auto" }}>
            <h2>사진첩</h2>
            <UploadForm />
            <ToastContainer />
        </div>
    );
};

export default App;

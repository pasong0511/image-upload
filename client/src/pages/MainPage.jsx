import React, { useContext } from "react";
import UploadForm from "../components/UploadForm";
import { AuthContext } from "../context/AuthContext";

const MainPage = () => {
    const [me] = useContext(AuthContext);
    return (
        <>
            <h2>사진첩</h2>
            {/* me 로그인 했을때만 업로드 폼 보여줌 */}
            {me && <UploadForm />}
        </>
    );
};

export default MainPage;

import React, { useState } from "react";
import axios from "axios";
import "./UploadForm.css";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("이미지 파일을 업로드 해주세요");

    const handleImageSelect = (e) => {
        const imageFile = e.target.files[0];
        console.log({ imageFile });
        setFile(imageFile);
        setFileName(imageFile.name);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("제출");
        const formData = new FormData();
        formData.append("image", file); //서버의 upload.single("image") 이 부분이랑 key 맞춰줘야함

        const res = await axios.post("/upload", formData, {
            headers: { "Content-type": "multipart/form-data" },
        });
        console.log({ res });
        alert("성공");

        try {
        } catch (err) {
            alert("실페");
            console.log(err);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="file-dropper">
                {fileName}
                <input id="image" type="file" onChange={handleImageSelect} />
            </div>
            <button type="submit" className="file-submit-button">
                제출
            </button>
        </form>
    );
};

export default UploadForm;

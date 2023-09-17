import React, { useState } from "react";
import axios from "axios";
import "./UploadForm.css";
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";

const UploadForm = () => {
    const defaultFilaName = "이미지 파일을 업로드 해주세요";
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(defaultFilaName);
    const [percent, setPercent] = useState(0);

    const handleImageSelect = (e) => {
        const imageFile = e.target.files[0];
        setFile(imageFile);
        setFileName(imageFile.name);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", file); //서버의 upload.single("image") 이 부분이랑 key 맞춰줘야함

        const res = await axios.post("/upload", formData, {
            headers: { "Content-type": "multipart/form-data" },
            onUploadProgress: (ProgrssEvent) => {
                //console.log(ProgrssEvent);
                setPercent(
                    Math.round((100 * ProgrssEvent.loaded) / ProgrssEvent.total)
                );
            },
        });
        toast.success("이미지 업로드 성공");
        setTimeout(() => {
            setFileName(defaultFilaName);
            setPercent(0);
        }, 2000);
        try {
        } catch (err) {
            setPercent(0);
            setFileName(defaultFilaName);
            toast.error("이미지 업로드 실패");
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <ProgressBar percent={percent} />
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

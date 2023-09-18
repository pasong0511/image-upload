import React, { useState } from "react";
import axios from "axios";
import "./UploadForm.css";
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";
import ImageList from "./ImageList";

const UploadForm = () => {
    const defaultFilaName = "이미지 파일을 업로드 해주세요";
    const [file, setFile] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [fileName, setFileName] = useState(defaultFilaName);
    const [percent, setPercent] = useState(0);

    const handleImageSelect = (e) => {
        const imageFile = e.target.files[0];
        setFile(imageFile);
        setFileName(imageFile.name);
        const fileReader = new FileReader();

        fileReader.readAsDataURL(imageFile); //바이너리 파일을 Base64 Encode 문자열로 반환
        fileReader.onload = (e) => setImgSrc(e.target.result); //읽기 동작이 성공적으로 완료되었을 때 발생
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", file); //서버의 upload.single("image") 이 부분이랑 key 맞춰줘야함

        const res = await axios.post("/images", formData, {
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
            setPercent(0);
            setFileName(defaultFilaName);
            setImgSrc(null);
        }, 2000);
        try {
        } catch (err) {
            setPercent(0);
            setFileName(defaultFilaName);
            toast.error("이미지 업로드 실패");
            setImgSrc(null);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <img
                src={imgSrc}
                className={`image-preview ${imgSrc && "image-preview-show"}`}
            />

            <ProgressBar percent={percent} />
            <div className="file-dropper">
                {fileName}
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                />
            </div>
            <button type="submit" className="file-submit-button">
                제출
            </button>
            <ImageList />
        </form>
    );
};

export default UploadForm;

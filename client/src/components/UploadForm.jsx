import React, { useState, useContext } from "react";
import axios from "axios";
import "../css/UploadForm.css";
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";
import ImageList from "./ImageList";
import { ImageContext } from "../context/ImageContext";

const UploadForm = () => {
    const { images, setImages, myImages, setMyImages } =
        useContext(ImageContext);

    const defaultFilaName = "이미지 파일을 업로드 해주세요";
    const [file, setFile] = useState(null);
    const { imgSrc, setImgSrc } = useState(null);
    const [fileName, setFileName] = useState(defaultFilaName);
    const [percent, setPercent] = useState(0);
    const [isPublic, setIsPublic] = useState(false); //true 이면 공개, false이면 나만 보기

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
        if (!file) {
            return;
        }

        const formData = new FormData();
        //form 데이터에 추가할때는 append를 사용해서 key, value로 붙인다.
        formData.append("image", file); //서버의 upload.single("image") 이 부분이랑 key 맞춰줘야함
        formData.append("public", isPublic);

        const res = await axios.post("/images", formData, {
            headers: { "Content-type": "multipart/form-data" },
            onUploadProgress: (ProgrssEvent) => {
                //console.log(ProgrssEvent);
                setPercent(
                    Math.round((100 * ProgrssEvent.loaded) / ProgrssEvent.total)
                );
            },
        });

        //파일 올리고 나서 이미지 파일 보여주기(api 요청 안하고도 이미지 파일 보여줌)
        if (isPublic) {
            setImages((prevData) => [...res.data, ...prevData]);
        }
        setMyImages((prevData) => [...res.data, ...prevData]);

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
            toast.error(err.response.data.message);
            setImgSrc(null);
        }
    };

    console.log({ isPublic });

    return (
        <form onSubmit={onSubmit}>
            <img
                alt=""
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
            <input
                type="checkbox"
                id="public-check"
                value={!isPublic}
                onChange={() => setIsPublic(!isPublic)}
            />
            <label htmlFor="public-check">비공개</label>
            <button type="submit" className="file-submit-button">
                제출
            </button>
            <ImageList />
        </form>
    );
};

export default UploadForm;

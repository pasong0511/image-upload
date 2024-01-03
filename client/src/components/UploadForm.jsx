import React, { useState, useContext } from "react";
import axios from "axios";
import "../css/UploadForm.css";
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";
import ImageList from "./ImageList";
import { ImageContext } from "../context/ImageContext";

const UploadForm = () => {
  const { myImages, images, setImages, setMyImages } = useContext(ImageContext);

  const defaultFilaName = "이미지 파일을 업로드 해주세요";

  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null); //이미지 url을 저장하는 state
  const [fileName, setFileName] = useState(defaultFilaName);
  const [percent, setPercent] = useState(0);
  const [isPublic, setIsPublic] = useState(false); //true 이면 공개, false이면 나만 보기

  const handleImageSelect = (e) => {
    const imageFile = e.target.files[0]; //파일의 name, type, size 등등 들어가있음
    setFile(imageFile);
    setFileName(imageFile.name);

    //FileReader 객체는 웹 애플리케이션이 비동기적으로 데이터를 읽기 위하여 읽을 파일을 가리킴
    //FileReader.onload를 이용하면 읽기 동작이 성공적으로 완료 되었을때를 알 수 있다.
    const fileReader = new FileReader();

    fileReader.readAsDataURL(imageFile); //바이너리 파일을 Base64 Encode 문자열로 반환
    fileReader.onload = (e) => {
      setImgSrc(e.target.result);
    }; //읽기 동작이 성공적으로 완료되었을 때 발생
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    //FormData는 폼을 쉽게 보내도록 도와주는 객체
    const formData = new FormData();
    //form 데이터에 추가할때는 append를 사용해서 key, value로 붙인다.
    formData.append("image", file); //서버의 upload.single("image") 이 부분이랑 key 맞춰줘야함
    formData.append("public", isPublic);

    const res = await axios.post("/images", formData, {
      headers: { "Content-type": "multipart/form-data" },
      //업로드 했을 때 프로그래스 정보를 알 수 있는 콜백함수
      onUploadProgress: (ProgrssEvent) => {
        setPercent(
          Math.round((100 * ProgrssEvent.loaded) / ProgrssEvent.total)
        );
      },
    });

    //파일 올리고 나서 이미지 파일 보여주기(api 요청 안하고도 이미지 파일 보여줌)
    if (isPublic) setImages([...images, res.data]);
    setMyImages([...myImages, res.data]);

    toast.success("이미지 업로드 성공");
    setTimeout(() => {
      setPercent(0);
      setFileName(defaultFilaName);
      setImgSrc(null);
      setFile(null);
    }, 2000);
    try {
    } catch (err) {
      setPercent(0);
      setFileName(defaultFilaName);
      toast.error(err.response.data.message);
      setImgSrc(null);
      setFile(null);
    }
  };

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

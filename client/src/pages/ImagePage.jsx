import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ImageContext } from "../context/ImageContext";

const ImagePage = () => {
  let { imageId } = useParams();

  const { images, myImages } = useContext(ImageContext);
  const image =
    images.find((image) => image._id === imageId) ||
    myImages.find((image) => image._id === imageId);

  if (!image) {
    return <h2>로딩중</h2>;
  }

  return (
    <div>
      <h3>이미지 페이지</h3>
      <div>{imageId}</div>
      <img
        style={{ width: "100%" }}
        alt={imageId}
        src={`http://localhost:5000/uploads/${image.key}`}
      ></img>
    </div>
  );
};

export default ImagePage;

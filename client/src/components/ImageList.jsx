import React, { useContext } from "react";
import { ImageContext } from "../context/ImageContext";

const ImageList = () => {
    const { images } = useContext(ImageContext);

    const imageList = images.map((image) => (
        <img
            alt=""
            key={image.key}
            style={{ width: "100%" }}
            src={`http://localhost:5000/uploads/${image.key}`}
        />
    ));

    return (
        <div>
            <h3>이미지 리스트</h3>
            {imageList}
        </div>
    );
};

export default ImageList;

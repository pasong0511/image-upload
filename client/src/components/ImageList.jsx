import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ImageContext } from "../context/ImageContext";

const ImageList = () => {
    const { me } = useContext(AuthContext);
    const { images, myImages, isPublic, setIsPublic } =
        useContext(ImageContext);

    const imageList = (isPublic ? images : myImages).map((image) => (
        <img
            alt=""
            key={image.key}
            style={{ width: "100%" }}
            src={`http://localhost:5000/uploads/${image.key}`}
        />
    ));

    return (
        <div>
            <div>
                <h3 style={{ display: "inline", marginRight: 10 }}>
                    {`이미지 리스트(${!isPublic ? "개인" : "공개"} 사진)`}
                </h3>
                {me && (
                    <button onClick={() => setIsPublic(!isPublic)}>
                        {isPublic ? "개인" : "공개"}사진보기
                    </button>
                )}
            </div>
            {imageList}
        </div>
    );
};

export default ImageList;

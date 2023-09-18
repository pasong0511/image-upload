import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageList = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios
            .get("/images")
            .then((result) => setImages(result.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        console.log(images);
    }, [images]);

    const imageList = images.map((image) => (
        <img
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

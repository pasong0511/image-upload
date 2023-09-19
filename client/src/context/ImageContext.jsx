import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//context store 생성
export const ImageContext = createContext();

//prop로 <App> 컴포넌트가 넘어온다
export const ImageProvider = (prop) => {
    const [images, setImages] = useState([]);

    //useContext() 함수를 통해서 Stote에 있는 값을 뽑아온다.
    //console.log("ImageContext>>", useContext(ImageContext));

    useEffect(() => {
        axios
            .get("/images")
            .then((result) => setImages(result.data))
            .catch((err) => console.log(err));
    }, []);

    console.log(images);

    return (
        <ImageContext.Provider value={{ images, setImages }}>
            {prop.children}
        </ImageContext.Provider>
    );
};

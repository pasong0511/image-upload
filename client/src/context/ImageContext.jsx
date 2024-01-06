import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

//context store 생성
export const ImageContext = createContext();

//prop로 <App> 컴포넌트가 넘어온다
export const ImageProvider = (prop) => {
  const [images, setImages] = useState([]); //공개 사진
  const [myImages, setMyImages] = useState([]); //개인 사진
  const [me] = useContext(AuthContext);
  const [isPublic, setIsPublic] = useState(false);

  //useContext() 함수를 통해서 Stote에 있는 값을 뽑아온다.
  //console.log("ImageContext>>", useContext(ImageContext));

  //처음 로딩할때
  useEffect(() => {
    axios
      .get("/images")
      .then((result) => setImages(result.data))
      .catch((err) => console.log(err));
  }, []);

  //로그인해서 me가 변경되었을 때
  useEffect(() => {
    if (me) {
      setTimeout(
        () =>
          axios
            .get("/users/me/images")
            .then((result) => setMyImages(result.data))
            .catch((err) => console.log(err)),
        0
      );
    } else {
      //로그아웃 했을 때
      setMyImages([]);
      setIsPublic(true);
    }
  }, [me]);

  return (
    <ImageContext.Provider
      //여기에 있는 value가 하위에 있는 자식들이 접근할 수 있는 데이터
      value={{
        images,
        setImages,
        myImages,
        setMyImages,
        isPublic,
        setIsPublic,
      }}
    >
      {prop.children}
    </ImageContext.Provider>
  );
};

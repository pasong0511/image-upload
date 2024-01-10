import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ImageContext } from "../context/ImageContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const ImagePage = () => {
  let { imageId } = useParams();

  const { images, myImages, setImages, setMyImages } = useContext(ImageContext);
  const [me] = useContext(AuthContext);

  const [hasLinked, setHasLiked] = useState(AuthContext);

  const image =
    images.find((image) => image._id === imageId) ||
    myImages.find((image) => image._id === imageId);

  const updateImage = (images, image) => {
    return [...images.filter((image) => image._id !== imageId), image].sort(
      (a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
    );
  };

  const onClickLike = async () => {
    const res = await axios.patch(
      `/images/${imageId}/${hasLinked ? "unlike" : "like"}`
    );

    if (res.data.public) {
      console.log(res.data);
      //업데이트된 데이터 반영
      const image = updateImage(images, res.data);
      setImages(image);
    } else {
      const image = updateImage(myImages, res.data);
      setMyImages(image);
    }

    setHasLiked((prev) => !prev);
  };

  useEffect(() => {
    if (me && image && image.likes.includes(me.userId)) {
      setHasLiked(true);
    }
  }, [me, image]);

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
      <span>좋아요 {image.likes.length}</span>
      <button style={{ float: "right" }} onClick={onClickLike}>
        {hasLinked ? "좋아요 취소" : "좋아요"}
      </button>
    </div>
  );
};

export default ImagePage;

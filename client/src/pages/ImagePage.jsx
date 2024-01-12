import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { ImageContext } from "../context/ImageContext";
import { AuthContext } from "../context/AuthContext";

import { toast } from "react-toastify";

const ImagePage = () => {
  let { imageId } = useParams();

  const { images, myImages, setImages, setMyImages } = useContext(ImageContext);
  const [me] = useContext(AuthContext);

  const [hasLinked, setHasLiked] = useState(AuthContext);

  const navigate = useNavigate();

  const image =
    images.find((image) => image._id === imageId) ||
    myImages.find((image) => image._id === imageId);

  const updateImage = (images, image) => {
    return [...images.filter((image) => image._id !== imageId), image].sort(
      (a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
    );
  };

  const deleteImage = (images) => {
    return images.filter((image) => image._id !== imageId);
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

  const onDeleteHandler = async () => {
    try {
      if (!window.confirm("해당 이미지를 삭제하시겠습니까?")) return;
      const res = await axios.delete(`/images/${imageId}`);
      toast.success(res.data.message);
      if (res.data.image.public) {
        const image = deleteImage(images, res.data);
        setImages(image);
      } else {
        const image = deleteImage(myImages, res.data);
        setMyImages(image);
      }
      navigate("/");
    } catch (err) {
      toast.error(err.massage);
    }
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
      {me && image.user._id === me?.userId && (
        <button style={{ float: "right" }} onClick={onDeleteHandler}>
          삭제
        </button>
      )}
      <button style={{ float: "right" }} onClick={onClickLike}>
        {hasLinked ? "좋아요 취소" : "좋아요"}
      </button>
    </div>
  );
};

export default ImagePage;

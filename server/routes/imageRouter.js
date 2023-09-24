//라우터 추가
const { Router } = require("express");
const imageRouter = Router();

const Image = require("../models/Image");
const { upload } = require("../middleware/imageUpload");

imageRouter.post("/", upload.single("image"), async (req, res) => {
    //몽고 db 모델 객체에 새로운 객체를 만들고 save() 해라
    //유저 정보, public 유무 확인
    const images = await new Image({
        key: req.file.filename,
        originFileName: req.file.originalname,
    }).save();
    res.json(images);
});

imageRouter.get("/", async (req, res) => {
    //전체 이미지 다 찾아서 가져오기
    //public 이미지들만 제공
    const images = await Image.find();
    res.json(images);
});

imageRouter.delete("/:imageId", (req, res) => {
    //유저 권한 확인
    //사진 작제
});

//좋아요 기능
imageRouter.patch("/:imageId/like", (req, res) => {
    //유저 권한 확인
    //like 중복 안되도록 확인
});

//좋아요 취소
imageRouter.patch("/:imageId/unlike", (req, res) => {
    //유저 권한 확인
    //unlike 중복 취소 안되도록 확인
});

module.exports = { imageRouter };

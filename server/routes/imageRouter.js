//라우터 추가
const { Router } = require("express");
const imageRouter = Router();

const Image = require("../models/Image");
const { upload } = require("../middleware/imageUpload");

imageRouter.post("/", upload.single("image"), async (req, res) => {
    //몽고 db 모델 객체에 새로운 객체를 만들고 save() 해라
    const images = await new Image({
        key: req.file.filename,
        originFileName: req.file.originalname,
    }).save();
    res.json(images);
});

imageRouter.get("/", async (req, res) => {
    //전체 이미지 다 찾아서 가져오기
    const images = await Image.find();
    res.json(images);
});

module.exports = { imageRouter };

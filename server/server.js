//🏴‍☠️ server.js
require("dotenv").config();
const express = require("express");
const multer = require("multer"); //multer 미들웨어 추가
const { v4: uuid } = require("uuid"); //uuid 추가
const mime = require("mime-types"); //파일 확장자 제어
const mongoose = require("mongoose");
const Image = require("./models/Image");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads"),
    filename: (req, file, cb) =>
        cb(null, `${uuid()}.${mime.extension(file.mimetype)}`), //uuid 사용 + 파일 확장자 제어
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        //파일 확장자 제어
        if (
            ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(
                file.mimetype
            )
        ) {
            cb(null, true);
        } else {
            cb(new Error("invalid file type.", false));
        }
    },
    //파일 사이즈 제한
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});
const app = express();
const PORT = 5000;

//db 연결 코드
mongoose
    .connect(process.env.REACT_APP_MONGODB_URI)
    .then(() => {
        console.log("MongoDB 연결 완료~🚕");

        //db 켜지고 나서 서버 실행시키기 위해서 코드 이동
        app.use("/uploads", express.static("uploads")); //uploads 폴더 외부 노출

        //라우터 추가
        app.post("/images", upload.single("image"), async (req, res) => {
            //몽고 db 모델 객체에 새로운 객체를 만들고 save() 해라
            const images = await new Image({
                key: req.file.filename,
                originFileName: req.file.originalname,
            }).save();
            res.json(images);
        });

        app.get("/images", async (req, res) => {
            //전체 이미지 다 찾아서 가져오기
            const images = await Image.find();
            res.json(images);
        });

        app.listen(PORT, () => console.log(`서버 ${PORT}번 살아있음~🚗`));
    })
    .catch((err) => console.log("MongoDB 연결 실패"));

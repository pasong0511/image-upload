//🏴‍☠️ server.js
const express = require("express");
const multer = require("multer"); //multer 미들웨어 추가
const { v4: uuid } = require("uuid"); //uuid 추가
const mime = require("mime-types"); //파일 확장자 제어
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

app.use("/uploads", express.static("uploads")); //uploads 폴더 외부 노출

//라우터 추가
app.post("/upload", upload.single("imageTest"), (req, res) => {
    console.log(req.file);
    res.json(req.file);
});

app.listen(PORT, () => console.log(`서버 ${PORT}번 살아있음~🚗`));

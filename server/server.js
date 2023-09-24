//🏴‍☠️ server.js
require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");

const { imageRouter } = require("./routes/imageRouter");
const { userRouter } = require("./routes/userRouter");

const app = express();
const { MONGODB_URI, PORT } = process.env;

const { authenication } = require("./middleware/authenication");

//db 연결 코드
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("MongoDB 연결 완료~🚕");

        //db 켜지고 나서 서버 실행시키기 위해서 코드 이동
        app.use("/uploads", express.static("uploads"));
        app.use(express.json());
        app.use(authenication); //<--- 라우터 가기 전에 미들웨어 통과시킴
        //body에 json 형태 있으면 js로 파싱
        //app.use(express.json());
        ///images 경로로 들어오는 요청은 imageRouter 가서 처리해라
        app.use("/images", imageRouter);
        //사용자 관리 전용 라우터
        app.use("/users", userRouter);

        app.listen(PORT, () => console.log(`서버 ${PORT}번 살아있음~🚗`));
    })
    .catch((err) => console.log("MongoDB 연결 실패", err));

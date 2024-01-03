//🏴‍☠️ server.js
require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");

const { imageRouter } = require("./routes/imageRouter");
const { userRouter } = require("./routes/userRouter");

const fs = require("fs");
const app = express();
const { MONGODB_URI, PORT } = process.env;

const { authenication } = require("./middleware/authenication");

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("upload 폴더가 없어 upload 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

//db 연결 코드
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB 연결 완료~🚕");

    //app.use를 사용하면 추가한 미들웨어를 순서대로 실행할 수 있다.
    //- 순차실행, 조건부 실행(/uploads 등 특정 경로 또는 경로 패턴에 대해서만 미들웨어를 실행 가능), next 함수 호출해서 다음 미들웨어 실행

    //db 켜지고 나서 서버 실행시키기 위해서 코드 이동
    //------------
    //외부에서 uploads 폴더에 접근할 수 있도록 하기 위해서 추가( express.static("uploads"))
    //------------
    app.use("/uploads", express.static("uploads"));

    //------------
    //요청의 본문이 JSON 형식인 경우 이를 파싱하여 JavaScript 객체로 변환하는 미들웨어
    //------------
    app.use(express.json());

    //------------
    //라우터 가기 전에 authenication 미들웨어 통과시킴
    //------------
    app.use(authenication);

    //------------
    // images 경로로 들어오는 모든 요청을 imageRouter 모듈에 위임
    //------------
    app.use("/images", imageRouter);

    //------------
    //사용자 관리 전용 라우터
    //------------
    app.use("/users", userRouter);

    app.listen(PORT, () => console.log(`서버 ${PORT}번 살아있음~🚗`));
  })
  .catch((err) => console.log("MongoDB 연결 실패", err));

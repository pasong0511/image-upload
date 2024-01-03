//라우터 추가
const { Router } = require("express");
const mongoose = require("mongoose");
const imageRouter = Router();

const Image = require("../models/Image");
const { upload } = require("../middleware/imageUpload"); //multer 미들웨어 만들어둔 객체

const fs = require("fs");
const { promisify } = require("util"); //promise 함수가 아닌것을 promise화 시킨다.

const fileUnlink = promisify(fs.unlink); //unlink 함수를 promise를 반환해주겠다.

//multer 미들웨어로 만들어둔 upload 객체를 사용한다.
//single 미들웨어 라우터를 라우터 압에 넣어두면, multer 설정에 따라 파일 업로드 후 req.file 객체가 생성된다.
//여러개의 이미지를 업로드 하고싶다면, upload.array("many")를 두면 된다.
imageRouter.post("/", upload.single("image"), async (req, res) => {
  //몽고 db 모델 객체에 새로운 객체를 만들고 save() 해라
  //유저 정보, public 유무 확인

  try {
    //미들웨어에서 로그인한 유저가 없는 경우
    if (!req.user) throw new Error("권한 없음");

    const images = await new Image({
      user: {
        _id: req.user.id,
        name: req.user.name,
        username: req.user.username,
      },
      public: req.body.public,
      key: req.file.filename,
      originFileName: req.file.originalname,
    }).save();
    res.json(images);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

imageRouter.get("/", async (req, res) => {
  //전체 이미지 다 찾아서 가져오기
  //public 이미지들만 제공
  //
  const images = await Image.find({ public: true });
  res.json(images);
});

imageRouter.delete("/:imageId", async (req, res) => {
  //유저 권한 확인
  //사진 작제
  //1. upload 폴더에 있는 사진 데이터를 삭제
  //2. 데이터베이스에 있는 image 문서를 삭제
  try {
    console.log(req.params);
    //:imageid는 req.params이렇게 넘어온다.

    if (!req.user) throw new Error("권한이 없습니다.");

    if (!mongoose.isValidObjectId(req.params.imageId))
      throw new Error("없는 이미지 아이디입니다.");
    //1. upload 폴더에 있는 사진 데이터를 삭제
    //서버 uploads 폴더에 있는 이미지 파일 자체를 지워야하므로 fs이용
    //fs.unlink();      //이런 형태 안쓰고 promise를 반환하는 함수를 사용할것임

    const image = await Image.findOneAndDelete({ _id: req.params.imageId }); //이미지를 삭제하면서 찾아옴
    if (!image)
      return res.json({ message: "이미 삭제된 이미지입니다." }, image);
    await fileUnlink(`./uploads/${image.key}`);
    res.json({ message: "요청하신 이미지가 삭제되었습니다." }, image);

    //2.
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

//좋아요 기능
imageRouter.patch("/:imageId/like", async (req, res) => {
  //유저 권한 확인
  //like 중복 안되도록 확인
  try {
    //로그인 유저 찾기
    if (!req.user) throw new Error("권한이 없습니다.");

    //이미지 아이디 올바른지 체크하기
    if (!mongoose.isValidObjectId(req.params.imageId))
      throw new Error("올바르지 않은 imageid 입니다.");
    //이미지 업데이트 하기
    const image = await Image.findOneAndUpdate(
      { _id: req.params.imageId },
      { $addToSet: { likes: req.user.id } }, //$addToSet : push 하려는 값이 배열에있는 값과 다를 경우에만 push 한다.
      { new: true } //기본 설정은 업데이트 되기 전 문서를 찾는데 true 주면 업데이트 되고 난 문서 결과를 반환해준다.
    ); //찾아온 다음에 업데이트 하기
    res.json(image);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

//좋아요 취소
imageRouter.patch("/:imageId/unlike", async (req, res) => {
  //유저 권한 확인
  //unlike 중복 취소 안되도록 확인
  try {
    //로그인 유저 찾기
    if (!req.user) throw new Error("권한이 없습니다.");

    //이미지 아이디 올바른지 체크하기
    if (!mongoose.isValidObjectId(req.params.imageId))
      throw new Error("올바르지 않은 imageid 입니다.");
    //이미지 업데이트 하기
    const image = await Image.findOneAndUpdate(
      { _id: req.params.imageId },
      { $pull: { likes: req.user.id } },
      { new: true }
    ); //찾아온 다음에 업데이트 하기
    res.json(image);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

module.exports = { imageRouter };

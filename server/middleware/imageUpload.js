const multer = require("multer"); //multer 미들웨어 추가
const { v4: uuid } = require("uuid"); //uuid 추가
const mime = require("mime-types"); //파일 확장자 제어

const storage = multer.diskStorage({
  //어디에 - req : 요청에 대한 정보, file: 업로드 할 파일 정보, cd(done) : 콜백함수
  //req 또는 file 데이터를 가공해서 cb 함수를 실행해준다,
  //아래 코드는 ./uploads 폴더에 파일을 넣어준다는 뜻
  destination: (req, file, cb) => cb(null, "./uploads"), //실행 전 꼭 uploads폴더가 있어야 한다.
  //어떤이름으로 - 파일의 이름을 정해줌
  //uuid 사용 + 파일 확장자 제어
  filename: (req, file, cb) =>
    cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
});

const upload = multer({
  //storage : 어디에(destination) 어떤 이름으로(filename) 저장할지 넣는다.
  storage,
  //업로드에 대한 제한을 설정
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

module.exports = { upload };

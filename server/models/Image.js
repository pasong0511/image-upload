//Image.js
const mongoose = require("mongoose");

//스키마는, 해당 컬렉션의 문서에 어떤 종류의 값이 들어가는지를 정의합니다.
const ImageSchema = new mongoose.Schema(
    {
        //관계형 db이면 join으로 유저 정보 넣을텐데 아니니까 그냥 이미지 올린거에 유저 정보 넣기
        user: {
            _id: { type: mongoose.Types.ObjectId, required: true, index: true }, //mongoDB는 각각의 Document를 식별할 수 있는 id(=ObjectId)를 자동으로 생성하게 됩니다.
            name: { type: String, required: true },
            username: { type: String, required: true },
        },
        likes: [{ type: mongoose.Types.ObjectId }], //좋아요 넣을 데이터(아이디만 저장한다.)
        public: { type: Boolean, require: true, default: false },
        key: { type: String, require: true },
        originFileName: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

// 스키마를 모델로 변환하여, 내보내기 합니다.
module.exports = mongoose.model("image", ImageSchema);

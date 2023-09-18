const mongoose = require("mongoose");

//스키마는, 해당 컬렉션의 문서에 어떤 종류의 값이 들어가는지를 정의합니다.
const ImageSchema = new mongoose.Schema(
    {
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

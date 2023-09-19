const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        username: { type: String, require: true },
        hashedPassword: {
            type: String,
            require: true,
        },
        //세션 정보는 여러 기기 등에서 만들어질수있기 때문에 배열로 관리한다.
        sessions: [
            {
                createdAt: { type: Date, require: true },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);

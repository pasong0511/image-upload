const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        username: { type: String, require: true },
        hashedPassword: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);

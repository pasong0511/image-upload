//userRouter.js
const { Router } = require("express");
const userRouter = Router();
const { hash } = require("bcryptjs");

const User = require("../models/User");

userRouter.post("/register", async (req, res) => {
    try {
        if (req.body.password.length < 6)
            throw new Error("비밀번호 6자 이상 입력 부탁");

        if (req.body.username.length < 3) {
            throw new Error("사용자 이름은 3 이상 입력 부탁");
        }

        const hashedPassword = await hash(req.body.password, 10);

        const user = await new User({
            name: req.body.name,
            username: req.body.username,
            hashedPassword: hashedPassword,
        }).save();
        res.json({ message: "유저 등록~~🛺" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = { userRouter };

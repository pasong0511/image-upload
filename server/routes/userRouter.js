//userRouter.js
const { Router } = require("express");
const userRouter = Router();
const { hash, compare } = require("bcryptjs");

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

userRouter.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        const isValid = await compare(req.body.password, user.hashedPassword);
        if (!isValid) throw new Error("입력하신 정보가 올바르지 않습니다.");
        res.json({ message: "유저 로그인~" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = { userRouter };

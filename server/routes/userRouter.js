//userRouter.js
const { Router } = require("express");
const userRouter = Router();
const { hash, compare } = require("bcryptjs");
const mongoose = require("mongoose");

const User = require("../models/User");
const Image = require("../models/Image");

userRouter.post("/register", async (req, res) => {
  try {
    if (req.body.password.length < 6)
      throw new Error("비밀번호를 6자 이상으로 해주세요.");
    if (req.body.username.length < 3)
      throw new Error("username은 3자 이상으로 해주세요.");

    const hashedPassword = await hash(req.body.password, 10);
    const user = await new User({
      name: req.body.name,
      username: req.body.username,
      hashedPassword,
      sessions: [{ createdAt: new Date() }], //회원 등록 할 때도 세션 추가
    }).save();

    //여러개 있는 세션 충에서 한개  뽑음
    const session = user.sessions[0];
    return res.json({
      message: "user registered",
      sessionId: session._id,
      name: user.name,
      userId: user._id,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.patch("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) throw new Error("가입되지 않은 이메일입니다.");

    const isValid = await compare(req.body.password, user.hashedPassword);
    if (!isValid) throw new Error("입력하신 정보가 올바르지 않습니다.");

    user.sessions.push({ createdAt: new Date() });
    const session = user.sessions[user.sessions.length - 1];

    await user.save();

    res.json({
      message: "user validated",
      sessionId: session._id,
      name: user.name,
      userId: user._id,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

userRouter.patch("/logout", async (req, res) => {
  try {
    if (!req.user) throw new Error("invalid sessionid");
    await User.updateOne(
      { _id: req.user.id },
      { $pull: { sessions: { _id: req.headers.sessionid } } }
    );
    res.json({ message: "user is logged out." });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

//로그인한 사용자의 정보를 가져온다.
//이미 user가 있으므로 async 안해도 된다.
userRouter.get("/me", (req, res) => {
  try {
    if (!req.user) throw new Error("권한이 없습니다.");
    res.json({
      message: "success",
      sessionId: req.headers.sessionid,
      name: req.user.name,
      userId: req.user._id,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

//내가 올린 사진만 보여주기
userRouter.get("/me/images", async (req, res) => {
  //본인의 사진들만 리턴(public === false);
  try {
    if (!req.user) throw new Error("권한이 없습니다.");
    //"user._id"여기서 빨간줄 뜨면 ""로 묶어주면 몽고디비가 알아서 함
    //"user._id"를 통해서 user를 들고있는 이미지 정보만 가져온다.
    const images = await Image.find({ "user._id": req.user.id });
    res.json(images); //배열 그대로 보내주자
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = { userRouter };

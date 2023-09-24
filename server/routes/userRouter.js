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
            throw new Error("비밀번호 6자 이상 입력 부탁");

        if (req.body.username.length < 3) {
            throw new Error("사용자 이름은 3 이상 입력 부탁");
        }

        const resisterd_user = await User.findOne({
            username: req.body.username,
        });
        if (resisterd_user) throw new Error("이미 가입된 이메일 입니다.");

        const hashedPassword = await hash(req.body.password, 10);

        const user = await new User({
            name: req.body.name,
            username: req.body.username,
            hashedPassword: hashedPassword,
            sessions: [{ createAt: new Date() }], //회원 등록할떄도 세션 추가
        }).save();

        //여러개 있는 세선중에서 한개를 뽑는다
        const session = user.sessions[0];

        res.json({
            message: "유저 등록~~🛺",
            sessionId: session._id,
            name: user.name,
            userId: user.username,
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

userRouter.patch("/login", async (req, res) => {
    try {
        //사용자 id를 찾는다.
        //findOne : findOne은 find 메서드에서 조회할때 가장 첫번째 배열 데이터 한개만 조회
        const user = await User.findOne({ username: req.body.username });
        if (!user) throw new Error("가입되지 않은 이메일입니다.");

        //요청 password와 findOne으로 찾은 사용자 비밀번호 비교
        const isValid = await compare(req.body.password, user.hashedPassword);
        if (!isValid) throw new Error("입력하신 정보가 올바르지 않습니다.");

        //세션이 여러개가 있을 수도 있기 때문에 push 해줌
        user.sessions.push({ createdAt: new Date() });
        const session = user.sessions[user.sessions.length - 1]; //마지막 세션(가장 최신 세션) 사용

        //저장하기
        await user.save();
        res.json({
            message: "유저 로그인~",
            sessionId: session._id, //최신으로 만들어진 세션 정보 포함해서 응답
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
        // //요청 헤데에 있는 settionId를 가져온다
        // const { sessionid } = req.headers;
        // //세션 정보가 잘못되었는지 체크..?

        // if (!mongoose.isValidObjectId(sessionid))
        //     throw new Error("invalid sessionid");

        // //요청 헤더에 있던 세션 id를 갖고 db에서 매칭킨다.
        // const user = await User.findOne({ "sessions._id": sessionid });

        //인증된 유저가 아닌 겨웅
        if (!req.user) throw new Error("인증된 세션 아이디 아님");

        //로그아웃하면 해당 세션은 삭제한다.
        await User.updateOne(
            { _id: req.user.id },
            { $pull: { sessions: { _id: req.headers.sessionid } } }
        );

        res.json({ message: "유저 로그아웃" });
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
            message: "성공",
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

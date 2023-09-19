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
            sessions: [{ createAt: new Date() }], //회원 등록할떄도 세션 추가
        }).save();

        //여러개 있는 세선중에서 한개를 뽑는다
        const session = user.sessions[0];

        res.json({
            message: "유저 등록~~🛺",
            sessionId: session._id,
            name: user.names,
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

userRouter.post("/login", async (req, res) => {
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

module.exports = { userRouter };

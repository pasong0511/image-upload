const mongoose = require("mongoose");
const User = require("../models/User");

const authenication = async (req, res, next) => {
    const { sessionid } = req.headers;

    //sessionid가 없거나 매칭 되지 않은 경우 그냥 next() 실행
    if (!sessionid || !mongoose.isValidObjectId(sessionid)) return next();

    //요청 헤더에 있던 세션 id를 갖고 db에서 매칭킨다.
    const user = await User.findOne({ "sessions._id": sessionid });

    //인증된 유저가 아닌 경우
    if (!user) return next();
    req.user = user;
    return next();
};

module.exports = { authenication };

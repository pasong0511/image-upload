const mongoose = require("mongoose");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  const { sessionid } = req.headers;

  //sessionid가 없거나 매칭 되지 않은 경우 그냥 next() 실행
  if (!sessionid || !mongoose.isValidObjectId(sessionid)) return next();

  //요청 헤더에 있던 세션 id를 갖고 db에서 매칭킨다.
  const sessionIdAsObjectId = new mongoose.Types.ObjectId(sessionid);

  const user = await User.findOne({ "sessions._id": sessionIdAsObjectId });

  //인증된 유저가 아닌 경우
  if (!user) return next();
  req.user = user; //req.user에 세션으로 매칭 시킨 유저 정보 불러옴
  return next();
};

module.exports = { authenticate };

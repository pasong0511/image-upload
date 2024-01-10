import React, { useContext, useState } from "react";
import CustomInput from "../components/CustomInput";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [, setMe] = useContext(AuthContext);

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (username.length < 3 || password.length < 6)
        throw new Error("입력하신 정보가 올바르지 않습니다.");
      const result = await axios.patch("/users/login", {
        username,
        password,
      });
      //axios.defaults.headers.common.sessionid = result.data.sessionId; //세선 아이디 추가
      setMe({
        name: result.data.name,
        sessionId: result.data.sessionId,
        userId: result.data.userId,
      });
      navigate("/");
      console.log(result);
      toast.success("로그인 성공~");
    } catch (err) {
      console.log(err.response);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div
      style={{
        marginTop: 100,
        maxWidth: 350,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h3>로그인</h3>
      <form onSubmit={onSubmit}>
        <CustomInput
          label={"아이디"}
          value={username}
          onChange={onChangeUsername}
        />
        <CustomInput
          label={"비밀번호"}
          value={password}
          onChange={onChangePassword}
          type="password"
        />

        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;

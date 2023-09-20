import React, { useState } from "react";
import CustomInput from "../components/CustomInput";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangePasswordChek = (e) => {
        setPasswordCheck(e.target.value);
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
            <h3>회원가입</h3>
            <form>
                <CustomInput
                    label={"이름"}
                    value={name}
                    onChange={onChangeName}
                />
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
                <CustomInput
                    label={"비밀번호 확인"}
                    value={passwordCheck}
                    onChange={onChangePasswordChek}
                    type="password"
                />
            </form>
        </div>
    );
};

export default RegisterPage;

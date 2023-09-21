import React, { useContext, useState } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import axios from "axios";

import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const [me, setMe] = useContext(AuthContext);

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

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            if (username.length < 3)
                throw new Error(
                    "회원 id가 너무 짧아요 3글자 이상으로 해주세요!"
                );
            if (password.length < 6)
                throw new Error(
                    "비빌번호가 너무 짧아요 6글자 이상으로 해주세요!"
                );
            if (password !== passwordCheck) {
                throw new Error("비밀번호가 다릅니다, 확인해주세요");
            }
            //console.log({ name, username, password });
            const result = await axios.post("/users/register", {
                name,
                username,
                password,
            });

            console.log(result);
            toast.success("회원가입 성공~");
            setMe({
                userId: result.data.userId,
                sessionId: result.data.sessionId,
                name: result.data.name,
            });
        } catch (err) {
            toast.error(err.message);
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
            <h3>회원가입</h3>
            <form onSubmit={onSubmit}>
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
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default RegisterPage;

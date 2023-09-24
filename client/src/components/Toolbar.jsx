//Toolbar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const Toolbar = () => {
    const [me, setMe] = useContext(AuthContext);

    const logoutHandler = async () => {
        try {
            setMe();
            await axios.patch("/users/logout");
            toast.success("로그아웃했습니다~");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    return (
        <div>
            <Link to="/">
                <span>홈</span>
            </Link>
            {me ? (
                <>
                    <span
                        onClick={logoutHandler}
                        style={{ float: "right", cursor: "pointer" }}
                    >
                        로그아웃
                    </span>
                    <span style={{ float: "right", marginRight: 15 }}>
                        {me.name}님
                    </span>
                </>
            ) : (
                <>
                    <Link to="/auth/register">
                        <span style={{ float: "right" }}>로그인</span>
                    </Link>
                    <Link to="/auth/login">
                        <span style={{ float: "right", marginRight: 15 }}>
                            회원가입
                        </span>
                    </Link>
                </>
            )}
        </div>
    );
};

export default Toolbar;

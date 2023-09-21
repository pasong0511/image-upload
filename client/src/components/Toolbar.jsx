//Toolbar.jsx
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Toolbar = () => {
    const [me, setMe] = useContext(AuthContext);

    useEffect(() => {
        console.log("미미미미미", me);
    }, [me]);

    return (
        <div>
            <Link to="/">
                <span>홈</span>
            </Link>
            {me ? (
                <>
                    <span style={{ float: "right" }}>로그아웃</span>
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

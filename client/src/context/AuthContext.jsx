import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [me, setMe] = useState();

    useEffect(() => {
        const sessionId = localStorage.getItem("sessionId");

        if (me) {
            //me가 생겼을 때
            //헤더 정보에 디폴트 정보 주기
            axios.defaults.headers.common.sessionid = me.sessionId; //세선 아이디 추가
            localStorage.setItem("sessionId", me.sessionId); //로컬 스토리지에 저장
        } else if (sessionId) {
            //로컬 스토리지에 있는 세션 정보로 다시 api 요청해서
            //로그인 정보 불러오기
            axios
                .get("/users/me", { headers: { sessionid: sessionId } })
                .then((result) =>
                    setMe({
                        name: result.data.name,
                        userId: result.data.userId,
                        sessionId: result.data.sessionId,
                    })
                )
                .catch((err) => {
                    //만료된 세션 정보는 지우기
                    console.error(err);
                    localStorage.removeItem("sessionId");
                    delete axios.defaults.headers.common.sessionid;
                });
        } else {
            delete axios.defaults.headers.common.sessionid;
        }
    }, [me]);

    return (
        <AuthContext.Provider value={[me, setMe]}>
            {children}
        </AuthContext.Provider>
    );
};

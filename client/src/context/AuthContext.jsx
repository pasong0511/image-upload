import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [me, setMe] = useState();

    useEffect(() => {
        if (me) {
            //헤더 정보에 디폴트 정보 주기
            axios.defaults.headers.common.sessionid = me.sessionId;

            console.log("찍기", me);

            localStorage.setItem("sessionId", me.sessionId);
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

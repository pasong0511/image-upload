import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [me, setMe] = useState();
    return (
        <AuthContext.Provider value={[me, setMe]}>
            {children}
        </AuthContext.Provider>
    );
};

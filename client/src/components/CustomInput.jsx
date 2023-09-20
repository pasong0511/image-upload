import React, { useState } from "react";

const CustomInput = ({ label, value, onChange, type = "txt" }) => {
    return (
        <div>
            <label>{label}</label>
            <input
                style={{ width: "100%" }}
                value={value}
                type={type}
                onChange={onChange}
            />
        </div>
    );
};

export default CustomInput;

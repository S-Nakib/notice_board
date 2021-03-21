import React from "react";
import style from "./header.module.scss";

const Header: React.FC = () => (
    <div className={style.header}>
        <a href="/">Home</a>
    </div>
);
export default React.memo(Header);

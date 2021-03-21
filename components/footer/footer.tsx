import React from "react";
import styles from "./footer.module.scss";

const footer: React.FC = () => (
    <div className={styles.footer}>
        <p>&copy; All rights reserved.</p>
    </div>
);
export default React.memo(footer);

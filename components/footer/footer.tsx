import styles from "./footer.module.scss";

const footer: React.FC = () => (
    <div className={styles.footer}>
        <h2>
            <a href="/contact_us">Contact Us</a>
        </h2>
        <p>&copy; All rights reserved.</p>
    </div>
);
export default footer;

import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <Link to="/" className={styles.navLink}>
          Dashboard
        </Link>
        <Link to="/categories" className={styles.navLink}>
          Categories
        </Link>
        <Link to="/products" className={styles.navLink}>
          Products
        </Link>
        <Link to="/orders" className={styles.navLink}>
          Orders
        </Link>
        <Link to="/users" className={styles.navLink}>
          Users
        </Link>
        <Link to="/create-product" className={styles.navLink}>
          Create!
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;

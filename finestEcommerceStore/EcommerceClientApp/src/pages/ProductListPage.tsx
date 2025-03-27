import React from "react";
import styles from "./ProductListPage.module.css";

const ProductListPage: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      <section className={styles.welcomeSection}>
        <h1>Welcome to Admin Dashboard</h1>
        <p>Manage your e-commerce store with ease.</p>
      </section>

      <section className={styles.summarySection}>
        <h2>Summary</h2>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryItem}>
            <h3>Total Orders</h3>
            <p>120</p>
          </div>
          <div className={styles.summaryItem}>
            <h3>Total Products</h3>
            <p>500</p>
          </div>
          <div className={styles.summaryItem}>
            <h3>New Users</h3>
            <p>30</p>
          </div>
        </div>
      </section>

      <section className={styles.quickActions}>
        <h2>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          <button className={styles.actionButton}>Add Product</button>
          <button className={styles.actionButton}>Manage Categories</button>
          <button className={styles.actionButton}>View Orders</button>
        </div>
      </section>

      {/* Add more sections like recent orders, product lists, etc. */}
    </div>
  );
};

export default ProductListPage;

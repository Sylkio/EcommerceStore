import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProductListPage from "./pages/ProductListPage";
import ProductsPage from "./pages/ProductsPage";
import CreateProductPage from "./pages/CreateProductPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import styles from "./App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.appContainer}>
        <header className={styles.header}>
          <div className={styles.logo}>Manero</div>
          <div className={styles.auth}>
            <Link to="/register" className={styles.authLink}>
              Register
            </Link>
            <Link to="/login" className={styles.authLink}>
              Login
            </Link>
          </div>
        </header>
        <div className={styles.content}>
          <Sidebar />
          <main className={styles.mainContent}>
            <Routes>
              <Route path="/" element={<ProductListPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/create-product" element={<CreateProductPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateProductPage from "./pages/CreateProductPage";
import ProductList from "./components/ProductList";
import styles from "./App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.appContainer}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Products
          </Link>
          <Link to="/create-product" className={styles.navLink}>
            Create Product
          </Link>
        </nav>

        <main className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/create-product" element={<CreateProductPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

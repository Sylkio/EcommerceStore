import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/api"; // Adjust the path if needed
import { Product } from "../types/product"; // Adjust the path if needed
import { Link } from "react-router-dom";
import styles from "./ProductsPage.module.css"; // Create this CSS module

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error: apiError } = await fetchProducts();
        if (apiError) {
          setError(apiError);
        } else if (data) {
          setProducts(data);
        }
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.productsPageContainer}>
      <header className={styles.header}>
        <h1>Our Products</h1>
        <Link to="/create-product" className={styles.addProductButton}>
          Add Product
        </Link>
      </header>
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <img
              src={`https://source.unsplash.com/random/200x200/?product&${product.id}`}
              alt={product.name}
              className={styles.productImage}
            />
            <h3>{product.name}</h3>
            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
            <p className={styles.productDescription}>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

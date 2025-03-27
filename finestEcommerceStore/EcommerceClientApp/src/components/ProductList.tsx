import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import { Product } from "../types/product";
import styles from "./ProductList.module.css";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

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
    <div className={styles.productListContainer}>
      <h2>Our Products</h2>
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <img
              src={`https://i.pinimg.com/736x/e9/c1/03/e9c10377ed00fb49807c438828b7cec0.jpg`} // Placeholder image
              alt={product.name}
              className={styles.productImage}
            />
            <h3>{product.name}</h3>
            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
            <p className={styles.productDescription}>{product.description}</p>
            <div className={styles.productActions}>
              <button className={styles.actionButton}>View Details</button>
              <button className={styles.actionButton}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

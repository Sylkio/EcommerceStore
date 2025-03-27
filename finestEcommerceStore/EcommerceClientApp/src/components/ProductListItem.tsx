import React from "react";
import { Product } from "../types/product";
import styles from "./ProductListItem.module.css";

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  return (
    <div className={styles.productItem}>
      <img
        src={`https://source.unsplash.com/random/200x200/?product&${product.id}`}
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
  );
};

export default ProductListItem;

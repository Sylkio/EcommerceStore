// src/components/ProductList.tsx
import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import { Product } from "../types/product";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(({ data }) => {
      if (data) setProducts(data);
    });
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                padding: "1rem",
                borderRadius: "4px",
              }}
            >
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

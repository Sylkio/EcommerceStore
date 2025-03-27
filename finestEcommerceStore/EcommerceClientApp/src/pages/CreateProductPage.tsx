import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/api";
import ProductForm from "../components/ProductForm";
import { Product } from "../types/product";
import styles from "./CreateProductPage.module.css"; // Import CSS module

export default function CreateProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (productData: Omit<Product, "id">) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const { data: createdProduct, error } = await createProduct(productData);

      if (error) {
        setApiError(error);
      } else if (createdProduct) {
        alert(`Product "${createdProduct.name}" created successfully!`);
        navigate("/"); // Redirect to homepage after success
      }
    } catch (err) {
      setApiError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.createProductPage}>
      <h1>Create New Product</h1>

      {apiError && <div className={styles.error}>{apiError}</div>}

      <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}

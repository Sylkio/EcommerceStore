import { useState, ChangeEvent, FormEvent } from "react";
import { Product } from "../types/product";
import styles from "./ProductForm.module.css";

interface ProductFormProps {
  onSubmit: (product: Omit<Product, "id">) => Promise<void>;
  initialValues?: Partial<Omit<Product, "id">>;
  isLoading?: boolean;
}

export default function ProductForm({
  onSubmit,
  initialValues,
  isLoading = false,
}: ProductFormProps) {
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: initialValues?.name || "",
    price: initialValues?.price || 0,
    description: initialValues?.description || "",
  });

  const [errors, setErrors] = useState<Partial<Omit<Product, "id">>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const newData = { ...prev };
      if (name === "price") {
        newData[name] = value === "" ? 0 : Number(value);
      } else {
        newData[name as Exclude<keyof Omit<Product, "id">, "price">] = value;
      }
      return newData;
    });
  };

  const validateForm = () => {
    const newErrors: Partial<Omit<Product, "id">> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.productForm}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price">Price ($)</label>
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.price && <span className={styles.error}>{errors.price}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Processing..." : "Submit"}
      </button>
    </form>
  );
}

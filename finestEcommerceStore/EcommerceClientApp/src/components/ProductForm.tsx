// src/components/ProductForm.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import { Product } from "../types/product";

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
      // Create a new object with the previous values
      const newData = { ...prev };

      // Handle numeric fields differently
      if (name === "price") {
        // Explicitly convert to number
        newData[name] = value === "" ? 0 : Number(value);
      } else {
        // For non-numeric fields, keep as string
        newData[name as Exclude<keyof Omit<Product, "id">, "price">] = value;
      }

      return newData;
    });
  };
  const validateForm = () => {
    const newErrors: Partial<Omit<Product, "id">> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (formData.price <= 0) newErrors.price = 0;
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
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
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
        {errors.price && <span className="error">{errors.price}</span>}
      </div>

      <div className="form-group">
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

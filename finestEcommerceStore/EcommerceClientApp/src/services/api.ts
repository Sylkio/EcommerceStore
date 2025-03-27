import { ApiResponse, Product } from '../types/product';

const API_BASE_URL = 'http://localhost:5236';

// Generic HTTP methods
async function get<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    const data = await response.json();
    return { data, success: true };
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'Failed to fetch data', 
      success: false 
    };
  }
}

async function post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return { data, success: true };
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'Failed to create resource', 
      success: false 
    };
  }
}

async function put<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return { data, success: true };
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'Failed to update resource', 
      success: false 
    };
  }
}

async function del<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return { data, success: true };
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'Failed to delete resource', 
      success: false 
    };
  }
}




// Product-specific methods
export const fetchProducts = () => get<Product[]>('/api/Product/GetProduct');
export const getProductById = (id: number) => get<Product>(`/api/Product/findproductbyId?id=${id}`);
export const createProduct = (product: Omit<Product, 'id'>) => 
  post<Product>('/api/Product/CreateProduct', product);
export const updateProduct = (id: number, product: Product) => 
  put<Product>(`/api/Product/UpdateProduct?id=${id}`, product);
export const deleteProduct = (id: number) => 
  del<void>(`/api/Product/DeleteProduct?id=${id}`);


//Register & Login

export async function registerUser(userData: { username: string; password: string }) {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { data: null, error: errorData.message || "Registration failed." };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: "Network error." };
  }
}

export async function loginUser(userData: { username: string; password: string }) {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { data: null, error: errorData.message || "Login failed." };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: "Network error." };
  }
}
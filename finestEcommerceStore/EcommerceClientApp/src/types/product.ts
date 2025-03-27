export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl?: string;
}
export interface ApiResponse<T> {
    data?: T;          
    error?: string;    // Error message if request fails
    success: boolean;  // true if request succeeded
  }
export interface ApiResponse<T> {
    data?: T;          
    error?: string;    // Error message if request fails
    success: boolean;  // true if request succeeded
  }
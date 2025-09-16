const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://envaglo-erp.envaglo.net';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL || '';
    console.log('API Service initialized with base URL:', this.baseURL);
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    console.log(`Making direct API request to: ${this.baseURL}${endpoint}`);
    
    try {
      const url = `${this.baseURL}${endpoint}`;
      const requestOptions: RequestInit = {
        method: options.method || 'GET',
        headers: {
          'Accept': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      // Add Content-Type only for requests with body
      if (requestOptions.body) {
        requestOptions.headers = {
          ...requestOptions.headers,
          'Content-Type': 'application/json',
        };
      }

      console.log('Request URL:', url);

      const response = await fetch(url, requestOptions);

      console.log('Response status:', response.status);

      if (!response.ok) {
        let errorMessage = `API request failed with status: ${response.status}`;
        
        try {
          const errorData = await response.json();
          console.error('API error response:', errorData);
          
          // Handle different error response formats
          if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.error) {
            errorMessage = errorData.error;
          } else if (errorData.detail) {
            errorMessage = errorData.detail;
          } else if (typeof errorData === 'string') {
            errorMessage = errorData;
          }
        } catch (parseError) {
          // If we can't parse the error response, use status text
          errorMessage = response.statusText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('API response data:', data);
      
      return data;
    } catch (error: any) {
      console.error(`API request failed for ${endpoint}:`, error);
      
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to the server');
      }
      
      throw new Error(`API request failed: ${error.message}`);
    }
  }

  // Customer Registration
  async registerCustomer(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }) {
    console.log('Registering customer with data:', { ...data, password: '[HIDDEN]' });
    return this.request('/v1/customer/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Customer Login
  async loginCustomer(data: { email: string; password: string }) {
    console.log('Logging in customer with email:', data.email);
    return this.request('/v1/customer/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Customer Logout
  async logoutCustomer() {
    console.log('Logging out customer');
    return this.request('/v1/customer/logout', {
      method: 'POST',
    });
  }

  // Get Customer Profile
  async getCustomerProfile() {
    console.log('Getting customer profile');
    return this.request('/v1/customer/get');
  }

  // Forgot Password
  async forgotPassword(email: string) {
    console.log('Sending forgot password request for email:', email);
    return this.request('/v1/customer/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Reset Password
  async resetPassword(data: { email: string; code: string; newPassword: string }) {
    console.log('Resetting password for email:', data.email);
    return this.request('/v1/customer/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Update Customer Profile
  async updateCustomerProfile(data: Partial<{
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    city: string;
    address: string;
  }>) {
    console.log('Updating customer profile with data:', data);
    return this.request('/v1/customer/profile', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Get Products
  async getProducts() {
    console.log('Fetching products...');
    return this.request('/v1/products');
  }

  // Get Product by ID
  async getProductById(id: number) {
    console.log(`Fetching product with ID: ${id}`);
    return this.request(`/v1/products/${id}`);
  }

  // Get Product Details by ID (new endpoint)
  async getProductDetails(id: number) {
    console.log(`Fetching product details with ID: ${id}`);
    return this.request(`/v1/product-details/${id}`);
  }

  // Test connectivity method
  async testConnectivity() {
    console.log('Testing API connectivity...');
    try {
      const response = await fetch(`${this.baseURL}/v1/customer/get`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      return {
        success: true,
        status: response.status,
        statusText: response.statusText,
        url: `${this.baseURL}/v1/customer/get`
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        url: `${this.baseURL}/v1/customer/get`
      };
    }
  }
}

export const apiService = new ApiService();

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiService {
  private baseURL: string;
  private useProxy: boolean = true; // Force proxy mode by default

  constructor() {
    this.baseURL = API_BASE_URL || '';
    console.log('API Service initialized with base URL:', this.baseURL);
    console.log('API Service: Using proxy mode by default');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Skip direct API call and go straight to proxy
    console.log('Skipping direct API call, using proxy directly');
    return this.requestViaProxy(endpoint, options);
  }

  private async requestViaProxy<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    console.log(`Making proxy request for: ${endpoint}`);
    console.log('Proxy request options:', options);
    
    try {
      const proxyUrl = '/api/proxy';
      const proxyBody = {
        endpoint,
        method: options.method || 'GET',
        data: options.body ? JSON.parse(options.body as string) : undefined,
        headers: options.headers,
      };

      console.log('Proxy request body:', proxyBody);

      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proxyBody),
      });

      console.log('Proxy response status:', response.status);
      console.log('Proxy response headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Proxy error response:', errorData);
        throw new Error(errorData.message || `Proxy request failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Proxy response data:', data);
      
      if (data.success) {
        return data.data;
      } else {
        console.error('Proxy returned success: false:', data);
        throw new Error(data.message || 'Proxy request failed');
      }
    } catch (error: any) {
      console.error(`Proxy request failed for ${endpoint}:`, error);
      throw new Error(`Proxy request failed: ${error.message}`);
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
    return this.request('/api/v1/customer/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Customer Login
  async loginCustomer(data: { email: string; password: string }) {
    console.log('Logging in customer with email:', data.email);
    return this.request('/api/v1/customer/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Customer Logout
  async logoutCustomer() {
    console.log('Logging out customer');
    return this.request('/api/v1/customer/logout', {
      method: 'POST',
    });
  }

  // Get Customer Profile
  async getCustomerProfile() {
    console.log('Getting customer profile');
    return this.request('/api/v1/customer/get');
  }

  // Forgot Password
  async forgotPassword(email: string) {
    console.log('Sending forgot password request for email:', email);
    return this.request('/api/v1/customer/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Reset Password
  async resetPassword(data: { email: string; code: string; newPassword: string }) {
    console.log('Resetting password for email:', data.email);
    return this.request('/api/v1/customer/reset-password', {
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
    return this.request('/api/v1/customer/profile', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Test connectivity method
  async testConnectivity() {
    console.log('Testing API connectivity...');
    try {
      const response = await fetch(`${this.baseURL}/api/v1/customer/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return {
        success: true,
        status: response.status,
        statusText: response.statusText,
        url: `${this.baseURL}/api/v1/customer/get`
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        url: `${this.baseURL}/api/v1/customer/get`
      };
    }
  }

  // Force proxy mode
  forceProxyMode() {
    this.useProxy = true;
    console.log('API Service forced to use proxy mode');
  }

  // Reset to direct mode
  resetToDirectMode() {
    this.useProxy = false;
    console.log('API Service reset to direct mode');
  }
}

export const apiService = new ApiService();

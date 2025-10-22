// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://envaglo-erp.envaglo.net';

// class ApiService {
//   private baseURL: string;
//   private isRefreshing: boolean = false;
//   private refreshPromise: Promise<boolean> | null = null;

//   constructor() {
//     this.baseURL = API_BASE_URL || '';
//     console.log('API Service initialized with base URL:', this.baseURL);
//   }

//   private async refreshToken(): Promise<boolean> {
//     if (this.isRefreshing && this.refreshPromise) {
//       return this.refreshPromise;
//     }

//     this.isRefreshing = true;
//     this.refreshPromise = this.performTokenRefresh();

//     try {
//       const result = await this.refreshPromise;
//       return result;
//     } finally {
//       this.isRefreshing = false;
//       this.refreshPromise = null;
//     }
//   }

//   private async performTokenRefresh(): Promise<boolean> {
//     try {
//       const response = await fetch('/api/auth/refresh', {
//         method: 'POST',
//       });

//       if (response.ok) {
//         console.log('Token refreshed successfully');
//         return true;
//       } else {
//         console.error('Token refresh failed:', response.status);
//         return false;
//       }
//     } catch (error) {
//       console.error('Token refresh error:', error);
//       return false;
//     }
//   }

//   private async request<T>(
//     endpoint: string,
//     options: RequestInit = {},
//     retryCount: number = 0
//   ): Promise<T> {
//     console.log(`Making direct API request to: ${this.baseURL}${endpoint}`);
    
//     try {
//       const url = `${this.baseURL}${endpoint}`;
//       const requestOptions: RequestInit = {
//         method: options.method || 'GET',
//         headers: {
//           'Accept': 'application/json',
//           ...options.headers,
//         },
//         ...options,
//       };

//       // Add Content-Type only for requests with body
//       if (requestOptions.body) {
//         requestOptions.headers = {
//           ...requestOptions.headers,
//           'Content-Type': 'application/json',
//         };
//       }

//       console.log('Request URL:', url);

//       const response = await fetch(url, requestOptions);

//       console.log('Response status:', response.status);

//       // Handle 401 errors with automatic token refresh
//       if (response.status === 401 && retryCount === 0) {
//         console.log('Received 401, attempting token refresh...');
//         const refreshSuccess = await this.refreshToken();
        
//         if (refreshSuccess) {
//           console.log('Token refreshed, retrying request...');
//           return this.request<T>(endpoint, options, retryCount + 1);
//         } else {
//           console.error('Token refresh failed, redirecting to login');
//           // Dispatch logout action or redirect to login
//           if (typeof window !== 'undefined') {
//             window.location.href = '/auth/login';
//           }
//           throw new Error('Authentication failed. Please login again.');
//         }
//       }

//       if (!response.ok) {
//         let errorMessage = `API request failed with status: ${response.status}`;
        
//         try {
//           const errorData = await response.json();
//           console.error('API error response:', errorData);
          
//           // Handle different error response formats
//           if (errorData.message) {
//             errorMessage = errorData.message;
//           } else if (errorData.error) {
//             errorMessage = errorData.error;
//           } else if (errorData.detail) {
//             errorMessage = errorData.detail;
//           } else if (typeof errorData === 'string') {
//             errorMessage = errorData;
//           }
//         } catch (parseError) {
//           // If we can't parse the error response, use status text
//           errorMessage = response.statusText || errorMessage;
//         }
        
//         throw new Error(errorMessage);
//       }

//       const data = await response.json();
//       console.log('API response data:', data);
      
//       return data;
//     } catch (error: any) {
//       console.error(`API request failed for ${endpoint}:`, error);
      
//       // Handle network errors
//       if (error.name === 'TypeError' && error.message.includes('fetch')) {
//         throw new Error('Network error: Unable to connect to the server');
//       }
      
//       throw new Error(`API request failed: ${error.message}`);
//     }
//   }

//   // Customer Registration
//   async registerCustomer(data: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     phone?: string;
//   }) {
//     console.log('Registering customer with data:', { ...data, password: '[HIDDEN]' });
//     return this.request('/v1/customer/register', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     });
//   }

//   // Customer Login
//   async loginCustomer(data: { email: string; password: string }) {
//     console.log('Logging in customer with email:', data.email);
//     return this.request('/v1/customer/login', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     });
//   }

//   // Customer Logout
//   async logoutCustomer() {
//     console.log('Logging out customer');
//     return this.request('/v1/customer/logout', {
//       method: 'POST',
//     });
//   }

//   // Get Customer Profile
//   async getCustomerProfile() {
//     console.log('Getting customer profile');
//     return this.request('/v1/customer/get');
//   }

//   // Forgot Password
//   async forgotPassword(email: string) {
//     console.log('Sending forgot password request for email:', email);
//     return this.request('/v1/customer/forgot-password', {
//       method: 'POST',
//       body: JSON.stringify({ email }),
//     });
//   }

//   // Reset Password
//   async resetPassword(data: { email: string; code: string; newPassword: string }) {
//     console.log('Resetting password for email:', data.email);
//     return this.request('/v1/customer/reset-password', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     });
//   }
  
//   // Update Customer Profile
//   async updateCustomerProfile(data: any) {
//     console.log('Updating customer profile with data:', data);
//     return this.request('/v1/customer/profile', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     });
//   }

//   // Get Products
//   async getProducts() {
//     console.log('Fetching products...');
//     return this.request('/v1/products');
//   }

//   // Get Product by ID
//   async getProductById(id: number) {
//     console.log(`Fetching product with ID: ${id}`);
//     return this.request(`/v1/products/${id}`);
//   }

//   // Get Product Details by ID (new endpoint)
//   async getProductDetails(id: number) {
//     console.log(`Fetching product details with ID: ${id}`);
//     return this.request(`/v1/product-details/${id}`);
//   }

//   // Test connectivity method
//   async testConnectivity() {
//     console.log('Testing API connectivity...');
//     try {
//       const response = await fetch(`${this.baseURL}/v1/customer/get`, {
//         method: 'GET',
//         headers: {
//           'Accept': 'application/json',
//         },
//       });
      
//       return {
//         success: true,
//         status: response.status,
//         statusText: response.statusText,
//         url: `${this.baseURL}/v1/customer/get`
//       };
//     } catch (error: any) {
//       return {
//         success: false,
//         error: error.message,
//         url: `${this.baseURL}/v1/customer/get`
//       };
//     }
//   }
// }

// export const apiService = new ApiService();
// lib/api-service.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://envaglo-erp.envaglo.net';
const accessToken = cookieStore.get('accessToken')?.value;
console.log(accessToken ,"👌👌👌" )
class ApiService {
  private baseURL: string;
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<boolean> | null = null;

  constructor() {
    this.baseURL = API_BASE_URL || '';
    console.log('API Service initialized with base URL:', this.baseURL);
  }

  // perform token refresh by calling your NEXT.js refresh endpoint (server action)
  // Expecting the refresh route to set new tokens (or return them in JSON)
  private async performTokenRefresh(): Promise<boolean> {
    try {
      // call same-domain refresh endpoint (NextJS API route) to rotate tokens server-side
      // Keep this as a relative route if you have a Next.js server endpoint at /api/auth/refresh
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include', // send cookies if refresh token is cookie-based
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Token refresh failed with status:', response.status);
        return false;
      }

      // If your refresh endpoint returns JSON with tokens, update localStorage here.
      // Otherwise if refresh is cookie-based and server sets cookie, you may not get tokens.
      // Try to parse JSON safely (not critical if endpoint returns nothing)
      try {
        const data = await response.json();
        if (data?.access_token) {
          localStorage.setItem('access_token', data.access_token);
        }
        if (data?.refresh_token) {
          localStorage.setItem('refresh_token', data.refresh_token);
        }
      } catch (err) {
        // no JSON body - okay if refresh uses httpOnly cookies
      }

      console.log('Token refreshed successfully');
      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }

  private async refreshToken(): Promise<boolean> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = this.performTokenRefresh();

    try {
      const result = await this.refreshPromise;
      return result;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount: number = 0
  ): Promise<T> {
    console.log(`Making direct API request to: ${this.baseURL}${endpoint}`);

    try {
      const url = `${this.baseURL}${endpoint}`;

      // start with a shallow clone so we can mutate without changing caller object
      const requestOptions: RequestInit = {
        method: options.method || 'GET',
        ...options,
      };

      // normalize headers (preserve any passed headers)
      const baseHeaders: Record<string, string> = {
        Accept: 'application/json',
        ...(options.headers as Record<string, string> | undefined),
      };

      // add Content-Type if we have a body and no content-type was provided
      if (requestOptions.body && !('Content-Type' in baseHeaders)) {
        baseHeaders['Content-Type'] = 'application/json';
      }

      // attach Authorization header if token exists
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token');
        if (token) {
          baseHeaders['Authorization'] = `Bearer ${token}`;
        }
      }

      requestOptions.headers = baseHeaders;

      console.log('Request URL:', url);
      // debug - don't log the body in production
      // console.log('Request options:', requestOptions);

      const response = await fetch(url, requestOptions);
      console.log('Response status:', response.status);

      // handle 401: try refresh once then retry
      if (response.status === 401 && retryCount === 0) {
        console.log('Received 401, attempting token refresh...');
        const refreshSuccess = await this.refreshToken();

        if (refreshSuccess) {
          console.log('Token refreshed, retrying request with new token...');
          // reload token from storage and attach to options before retrying
          const newToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
          const newOptions: RequestInit = {
            ...options,
            headers: {
              ...(options.headers as Record<string, any> || {}),
              Authorization: newToken ? `Bearer ${newToken}` : undefined,
              Accept: 'application/json',
              ...(options.body && !((options.headers as Record<string, any>)?.['Content-Type']) ? { 'Content-Type': 'application/json'} : {}),
            },
          };
          return this.request<T>(endpoint, newOptions, retryCount + 1);
        } else {
          console.error('Token refresh failed, redirecting to login');
          if (typeof window !== 'undefined') {
            // clear local tokens
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/auth/login';
          }
          throw new Error('Authentication failed. Please login again.');
        }
      }

      // If not ok (and not 401 handled above) -> parse error body if possible
      if (!response.ok) {
        let errorMessage = `API request failed with status: ${response.status}`;

        try {
          // some responses may have empty body -> guard
          const text = await response.text();
          if (text) {
            // attempt parse JSON first
            try {
              const errorData = JSON.parse(text);
              console.error('API error response:', errorData);
              if (errorData?.message) errorMessage = errorData.message;
              else if (errorData?.error) errorMessage = errorData.error;
              else if (errorData?.detail) errorMessage = errorData.detail;
              else if (typeof errorData === 'string') errorMessage = errorData;
            } catch (jsonErr) {
              // not JSON, use text content
              errorMessage = text;
            }
          } else {
            errorMessage = response.statusText || errorMessage;
          }
        } catch (parseError) {
          errorMessage = response.statusText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      // try to parse json; some endpoints might return 204 No Content
      if (response.status === 204) {
        // @ts-ignore
        return {} as T;
      }

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        console.log('API response data:', data);
        return data as T;
      } else {
        // fallback to text if not JSON
        const text = await response.text();
        try {
          return JSON.parse(text) as T;
        } catch {
          // @ts-ignore
          return text as unknown as T;
        }
      }
    } catch (error: any) {
      console.error(`API request failed for ${endpoint}:`, error);

      // network-level errors (fetch failed)
      if (error instanceof TypeError) {
        throw new Error('Network error: Unable to connect to the server');
      }

      throw new Error(error?.message || 'API request failed');
    }
  }

  // --- API methods ---

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

  async loginCustomer(data: { email: string; password: string }) {
    console.log('Logging in customer with email:', data.email);
    return this.request('/v1/customer/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logoutCustomer() {
    console.log('Logging out customer');
    return this.request('/v1/customer/logout', {
      method: 'POST',
    });
  }

  async getCustomerProfile() {
    console.log('Getting customer profile');
    return this.request('/v1/customer/get');
  }

  async forgotPassword(email: string) {
    console.log('Sending forgot password request for email:', email);
    return this.request('/v1/customer/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(data: { email: string; code: string; newPassword: string }) {
    console.log('Resetting password for email:', data.email);
    return this.request('/v1/customer/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Use PUT for profile update (more semantically correct, but adjust if your backend expects POST)
  async updateCustomerProfile(data: any) {
    console.log(accessToken )
    return this.request('/v1/customer/profile', {
      method: 'POST',
      body: JSON.stringify(data),
      headers : {
        "accept" : "application/json",
        "Content-Type" : "application/json",
        "Authorization" : `Bearer 2965|LQ3DhxopjUCuJsWZnkEqrEawRRbyevjqvfjjujBY`
      }
    });
  }

  async getProducts() {
    console.log('Fetching products...');
    return this.request('/v1/products');
  }

  async getProductById(id: number) {
    console.log(`Fetching product with ID: ${id}`);
    return this.request(`/v1/products/${id}`);
  }

  async getProductDetails(id: number) {
    console.log(`Fetching product details with ID: ${id}`);
    return this.request(`/v1/product-details/${id}`);
  }

  async testConnectivity() {
    console.log('Testing API connectivity...');
    try {
      const response = await fetch(`${this.baseURL}/v1/customer/get`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      return {
        success: true,
        status: response.status,
        statusText: response.statusText,
        url: `${this.baseURL}/v1/customer/get`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        url: `${this.baseURL}/v1/customer/get`,
      };
    }
  }
}

export const apiService = new ApiService();

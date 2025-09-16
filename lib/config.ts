// API Configuration
export const API_CONFIG = {
  // Update this to your actual backend URL
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://envaglo-erp.envaglo.net/api',
  
  // API Endpoints
  ENDPOINTS: {
    WISHLIST: '/v1/customer/wishlist',
    PRODUCTS: {
      DETAILS: '/v1/product-details',
      LIST: '/v1/products',
    },
    AUTH: {
      LOGIN: '/v1/customer/login',
      REGISTER: '/v1/customer/register',
      ME: '/v1/customer/get',
      // REFRESH: '/api/v1/customer/refresh', // Not supported by backend
      LOGOUT: '/v1/customer/logout',
      FORGOT_PASSWORD: '/v1/customer/forgot-password',
      RESET_PASSWORD: '/v1/customer/reset-password',
    }
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to make authenticated API requests
export const makeApiRequest = async (
  endpoint: string, 
  options: RequestInit = {},
  requireAuth: boolean = false
): Promise<Response> => {
  const url = buildApiUrl(endpoint);
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  
  // Check if authentication is required but no token is available
  if (requireAuth && !accessToken) {
    throw new Error('يرجى تسجيل الدخول للوصول لهذه الخدمة');
  }
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  
  // Add authorization header if token is available
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  // Handle common error cases
  if (!response.ok) {
    switch (response.status) {
      case 401:
        // Clear invalid tokens
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
        throw new Error('انتهت صلاحية جلسة العمل، يرجى تسجيل الدخول مرة أخرى');
      case 403:
        throw new Error('غير مسموح لك بالوصول لهذا المحتوى');
      case 404:
        throw new Error('المحتوى المطلوب غير موجود');
      case 429:
        throw new Error('تم تجاوز عدد الطلبات المسموح، يرجى المحاولة لاحقاً');
      case 500:
      case 502:
      case 503:
        throw new Error('خطأ في الخادم، يرجى المحاولة لاحقاً');
      default:
        throw new Error(`خطأ في الشبكة (${response.status})`);
    }
  }
  
  return response;
};

// Helper function to check if we're connected to the backend
export const checkBackendConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/v1/customer/wishlist`, {
      method: 'HEAD',
    });
    return response.ok || response.status === 401; // 401 means backend is reachable but auth required
  } catch {
    return false;
  }
};

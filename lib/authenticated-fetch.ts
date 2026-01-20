/**
 * Utility function to make authenticated API requests with automatic token refresh
 * This should be used by Redux slices and other components that need to make API calls
 */

interface AuthenticatedFetchOptions extends RequestInit {
  retryCount?: number;
}

class AuthenticatedFetchService {
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<boolean> | null = null;

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

  private async performTokenRefresh(): Promise<boolean> {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
      });

      if (response.ok) {
        console.log('Token refreshed successfully');
        return true;
      } else {
        console.error('Token refresh failed:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }

  async authenticatedFetch(
    url: string,
    options: AuthenticatedFetchOptions = {}
  ): Promise<Response> {
    const { retryCount = 0, ...fetchOptions } = options;

    try {
      // Ensure cookies (httpOnly tokens) are always included
      const response = await fetch(url, {
        credentials: 'include',
        ...fetchOptions,
      });

      // Handle 401 errors with automatic token refresh
      if (
        response.status === 401 &&
        retryCount === 0 &&
        !url.startsWith('/api/auth/refresh')
      ) {
        console.log('Received 401, attempting token refresh...');
        const refreshSuccess = await this.refreshToken();
        
        if (refreshSuccess) {
          console.log('Token refreshed, retrying request...');
          return this.authenticatedFetch(url, {
            ...options,
            retryCount: retryCount + 1,
          });
        } else {
          console.error('Token refresh failed');
          throw new Error('Authentication failed. Please login again.');
        }
      }

      return response;
    } catch (error) {
      console.error('Authenticated fetch error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const authenticatedFetchService = new AuthenticatedFetchService();

// Convenience function for making authenticated requests
export const authenticatedFetch = (
  url: string,
  options: AuthenticatedFetchOptions = {}
): Promise<Response> => {
  return authenticatedFetchService.authenticatedFetch(url, options);
};

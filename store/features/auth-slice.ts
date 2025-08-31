import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginCredentials, RegisterCredentials, AuthResponse, User, ForgotPasswordRequest, ResetPasswordRequest, UpdateProfileRequest, ApiResponse } from '@/types/types';
import { apiService } from '@/lib/api-service';

// Helper functions for local storage
const saveTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
};

const clearTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

const getStoredTokens = () => {
  if (typeof window === 'undefined') {
    return { accessToken: null, refreshToken: null };
  }
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return { accessToken, refreshToken };
};

// Updated async thunks to use external API
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      console.log('Redux: Attempting login with external API');
      const data: AuthResponse = await apiService.loginCustomer(credentials);
      console.log('Redux: Login successful, saving tokens');
      saveTokens(data.accessToken, data.refreshToken);
      return data;
    } catch (error: any) {
      console.error('Redux: Login failed:', error);
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      console.log('Redux: Attempting registration with external API');
      const data: AuthResponse = await apiService.registerCustomer({
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        email: credentials.email,
        password: credentials.password,
        phone: credentials.phone,
      });
      console.log('Redux: Registration successful, saving tokens');
      saveTokens(data.accessToken, data.refreshToken);
      return data;
    } catch (error: any) {
      console.error('Redux: Registration failed:', error);
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Redux: Attempting logout with external API');
      await apiService.logoutCustomer();
      console.log('Redux: Logout successful, clearing tokens');
      clearTokens();
      return true;
    } catch (error: any) {
      console.error('Redux: Logout failed:', error);
      // Even if API call fails, clear local tokens for security
      clearTokens();
      return rejectWithValue('Logout failed');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const refreshToken = state.auth.refreshToken;

      if (!refreshToken) {
        return rejectWithValue('No refresh token');
      }

      // Note: You might need to implement refresh token logic based on your API
      // For now, we'll use the existing logic
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        return rejectWithValue('Token refresh failed');
      }

      const data: { accessToken: string; refreshToken: string } = await response.json();
      saveTokens(data.accessToken, data.refreshToken);
      return data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const accessToken = state.auth.accessToken;

      console.log('Redux: Getting current user with token:', !!accessToken);

      if (!accessToken) {
        console.log('Redux: No access token found');
        return rejectWithValue('No access token');
      }

      console.log('Redux: Making API call to get customer profile');
      const data = await apiService.getCustomerProfile();
      console.log('Redux: Customer profile received:', data);
      
      // Handle different API response structures
      const user = data.user || data;
      return user;
    } catch (error: any) {
      console.log('Redux: Get current user failed:', error);
      return rejectWithValue(error.message || 'Failed to get user data');
    }
  }
);

// New thunks for password management
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      console.log('Redux: Sending forgot password request');
      const data = await apiService.forgotPassword(email);
      console.log('Redux: Forgot password request successful');
      return data;
    } catch (error: any) {
      console.error('Redux: Forgot password failed:', error);
      return rejectWithValue(error.message || 'Forgot password failed');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (resetData: ResetPasswordRequest, { rejectWithValue }) => {
    try {
      console.log('Redux: Resetting password');
      const data = await apiService.resetPassword(resetData);
      console.log('Redux: Password reset successful');
      return data;
    } catch (error: any) {
      console.error('Redux: Password reset failed:', error);
      return rejectWithValue(error.message || 'Password reset failed');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData: UpdateProfileRequest, { rejectWithValue }) => {
    try {
      console.log('Redux: Updating customer profile');
      const data = await apiService.updateCustomerProfile(profileData);
      console.log('Redux: Profile update successful');
      return data;
    } catch (error: any) {
      console.error('Redux: Profile update failed:', error);
      return rejectWithValue(error.message || 'Profile update failed');
    }
  }
);

// Initialize state with stored tokens
const storedTokens = getStoredTokens();
console.log('Auth slice - Initial state setup:', {
  hasAccessToken: !!storedTokens.accessToken,
  hasRefreshToken: !!storedTokens.refreshToken,
  isAuthenticated: !!storedTokens.accessToken
});

const initialState: AuthState = {
  user: null,
  accessToken: storedTokens.accessToken,
  refreshToken: storedTokens.refreshToken,
  isAuthenticated: !!storedTokens.accessToken,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      saveTokens(action.payload.accessToken, action.payload.refreshToken);
    },
    initializeFromStorage: (state) => {
      const tokens = getStoredTokens();
      console.log('initializeFromStorage: Stored tokens found:', !!tokens.accessToken, !!tokens.refreshToken);
      if (tokens.accessToken && tokens.refreshToken) {
        state.accessToken = tokens.accessToken;
        state.refreshToken = tokens.refreshToken;
        state.isAuthenticated = true;
        console.log('initializeFromStorage: Store initialized with tokens');
      }
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = null;
      });

    // Refresh Token
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        clearTokens();
      });

    // Get Current User
    builder
      .addCase(getCurrentUser.pending, (state) => {
        console.log('getCurrentUser.pending: Setting loading to true');
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        console.log('getCurrentUser.fulfilled: Setting user data:', action.payload);
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        console.log('getCurrentUser.rejected: Clearing user data');
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        clearTokens();
      });

    // New cases for password management
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // Update user data if returned
        if (action.payload.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCredentials, initializeFromStorage } = authSlice.actions;
export default authSlice.reducer;

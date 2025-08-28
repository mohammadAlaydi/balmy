import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginCredentials, RegisterCredentials, AuthResponse, User } from '@/types/types';

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

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Login failed');
      }

      const data: AuthResponse = await response.json();
      // Save tokens to local storage
      saveTokens(data.accessToken, data.refreshToken);
      return data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Registration failed');
      }

      const data: AuthResponse = await response.json();
      // Save tokens to local storage
      saveTokens(data.accessToken, data.refreshToken);
      return data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      // Clear tokens from local storage
      clearTokens();
      return true;
    } catch (error) {
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
      // Update tokens in local storage
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

      console.log('getCurrentUser: Starting with token:', !!accessToken);

      if (!accessToken) {
        console.log('getCurrentUser: No access token found');
        return rejectWithValue('No access token');
      }

      console.log('getCurrentUser: Making API call to /api/auth/me');
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        console.log('getCurrentUser: API call failed with status:', response.status);
        return rejectWithValue('Failed to get user data');
      }

      const data = await response.json();
      console.log('getCurrentUser: Response data received:', data);
      const user: User = data.user;
      console.log('getCurrentUser: User data extracted:', user);
      return user;
    } catch (error) {
      console.log('getCurrentUser: Error occurred:', error);
      return rejectWithValue('Network error occurred');
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
  },
});

export const { clearError, setCredentials, initializeFromStorage } = authSlice.actions;
export default authSlice.reducer;

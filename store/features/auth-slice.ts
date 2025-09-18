import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
  BackendAuthResponse,
} from "@/types/types";
import { buildApiUrl, API_CONFIG } from "@/lib/config";

// Helper functions for local storage
const saveTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }
};

const clearTokens = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

const getStoredTokens = () => {
  if (typeof window === "undefined") {
    return { accessToken: null, refreshToken: null };
  }
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return { accessToken, refreshToken };
};

// Helper function to check if token is expired
// Since backend doesn't use JWT tokens, we'll do a basic check
const isTokenExpired = (token: string): boolean => {
  // Basic validation - just check if token exists and has reasonable length
  // Your backend will return 401 if token is actually expired
  return !token || token.length < 10;
};

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch(
        buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Login failed");
      }

      const data: BackendAuthResponse = await response.json();

      // Handle your backend's response structure
      const authData: AuthResponse = {
        user: {
          id: data.data.id,
          email: data.data.email,
          firstName: data.data.first_name,
          lastName: data.data.last_name,
          name: data.data.name,
          phone: data.data.phone,
          gender: data.data.gender,
          dateOfBirth: data.data.date_of_birth,
          status: data.data.status,
          group: data.data.group
            ? {
                id: data.data.group.id,
                name: data.data.group.name,
                createdAt: data.data.group.created_at,
                updatedAt: data.data.group.updated_at,
              }
            : undefined,
          notes: data.data.notes,
          createdAt: data.data.created_at,
          updatedAt: data.data.updated_at,
        },
        accessToken: data.token,
        refreshToken: data.token,
      };

      // Save tokens to local storage
      saveTokens(authData.accessToken, authData.refreshToken);
      return authData;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch(
        buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.REGISTER),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Registration failed");
      }

      const data: BackendAuthResponse = await response.json();

      // Handle your backend's response structure
      const authData: AuthResponse = {
        user: {
          id: data.data.id,
          email: data.data.email,
          firstName: data.data.first_name,
          lastName: data.data.last_name,
          name: data.data.name,
          phone: data.data.phone,
          gender: data.data.gender,
          dateOfBirth: data.data.date_of_birth,
          status: data.data.status,
          group: data.data.group
            ? {
                id: data.data.group.id,
                name: data.data.group.name,
                createdAt: data.data.group.created_at,
                updatedAt: data.data.group.updated_at,
              }
            : undefined,
          notes: data.data.notes,
          createdAt: data.data.created_at,
          updatedAt: data.data.updated_at,
        },
        accessToken: data.token,
        refreshToken: data.token,
      };

      // Save tokens to local storage
      saveTokens(authData.accessToken, authData.refreshToken);
      return authData;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const accessToken = state.auth.accessToken;

      if (accessToken) {
        await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGOUT), {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        });
      }

      // Clear tokens from local storage
      clearTokens();
      return true;
    } catch (error) {
      // Even if logout fails, clear local tokens
      clearTokens();
      return rejectWithValue("Logout failed");
    }
  }
);

// Since backend doesn't support refresh tokens, we'll handle token expiration differently
export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    // Return rejection since backend doesn't support refresh
    return rejectWithValue("Refresh token not supported by backend");
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as { auth: AuthState };
      const accessToken = state.auth.accessToken;

      if (!accessToken) {
        return rejectWithValue("No access token");
      }

      // Check if token is expired
      if (isTokenExpired(accessToken)) {
        // Since backend doesn't support refresh tokens, just return error
        // User will need to login again when token expires
        return rejectWithValue("Token expired - please login again");
      }

      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.ME), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token is invalid or expired
          return rejectWithValue("Authentication failed");
        }
        return rejectWithValue("Failed to get user data");
      }

      const data = await response.json();

      // Handle backend response structure: { data: { id, email, first_name, last_name, ... } }
      const user: User = {
        id: data.data.id,
        email: data.data.email,
        firstName: data.data.first_name,
        lastName: data.data.last_name,
        name: data.data.name,
        phone: data.data.phone,
        gender: data.data.gender,
        dateOfBirth: data.data.date_of_birth,
        status: data.data.status,
        group: data.data.group
          ? {
              id: data.data.group.id,
              name: data.data.group.name,
              createdAt: data.data.group.created_at,
              updatedAt: data.data.group.updated_at,
            }
          : undefined,
        notes: data.data.notes,
        createdAt: data.data.created_at,
        updatedAt: data.data.updated_at,
      };

      return user;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

// Initialize state with stored tokens
const storedTokens = getStoredTokens();

const initialState: AuthState = {
  user: null,
  accessToken: storedTokens.accessToken,
  refreshToken: storedTokens.refreshToken,
  isAuthenticated: !!storedTokens.accessToken,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      saveTokens(action.payload.accessToken, action.payload.refreshToken);
    },
    initializeFromStorage: (state) => {
      const tokens = getStoredTokens();
      if (tokens.accessToken && tokens.refreshToken) {
        state.accessToken = tokens.accessToken;
        state.refreshToken = tokens.refreshToken;
        state.isAuthenticated = true;
      }
    },
    // Add action to handle token refresh without logging out
    handleTokenRefresh: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      saveTokens(action.payload.accessToken, action.payload.refreshToken);
    },
    // Add action to restore user data without affecting authentication
    restoreUserData: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      // Don't change authentication state, just restore user data
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
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
    });

    // Refresh Token - Not supported by backend
    builder.addCase(refreshToken.rejected, (state) => {
      // Since backend doesn't support refresh tokens, this shouldn't happen
      // But if it does, don't clear tokens - let the user continue
      // The user will be redirected to login when their token actually expires
    });

    // Get Current User
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;

        // Only clear user data, don't logout unless it's a clear auth failure
        state.user = null;

        // Only logout if it's a clear authentication failure
        if (
          action.payload === "Authentication failed" ||
          action.payload === "Token expired - please login again"
        ) {
          state.accessToken = null;
          state.refreshToken = null;
          state.isAuthenticated = false;
          clearTokens();
        }
        // For other errors (network, server issues), keep the user logged in
        // This prevents logout on temporary failures
      });
  },
});

export const {
  clearError,
  setCredentials,
  initializeFromStorage,
  handleTokenRefresh,
  restoreUserData,
} = authSlice.actions;
export default authSlice.reducer;

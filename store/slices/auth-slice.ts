import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "@/types/types";

// Login action - now uses internal API route that sets httpOnly cookies
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Login failed");
      }

      return {
        user: data.data,
        message: data.message,
      };
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

// Register action - now uses internal API route that sets httpOnly cookies
export const register = createAsyncThunk(
  "auth/register",
  async (userData: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Registration failed");
      }

      return {
        user: data.data,
        message: data.message,
      };
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

// Logout action - now uses internal API route that clears httpOnly cookies
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  }
);

// Get current user action - now uses internal API route
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to get user info");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

// Refresh token action
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Token refresh failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

const initialState: AuthState = {
  user: null,
  accessToken: null, // No longer stored in localStorage
  refreshToken: null,
  isAuthenticated: false, // Will be determined by getCurrentUser
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
    resetAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.accessToken = "stored-in-cookie"; // Placeholder to indicate auth
      state.refreshToken = null;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
      state.isAuthenticated = false;
    });

    // Register
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.accessToken = "stored-in-cookie"; // Placeholder to indicate auth
      state.refreshToken = null;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
      state.isAuthenticated = false;
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state) => {
      // Even if logout fails, clear local state
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
    });

    // Get Current User
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.accessToken = "stored-in-cookie";
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      // Don't set error for getCurrentUser failures to avoid showing error on initial load
    });

    // Refresh Token
    builder.addCase(refreshToken.pending, (state) => {
      // Don't set loading state for refresh token to avoid UI flicker
    });
    builder.addCase(refreshToken.fulfilled, (state) => {
      // Token refreshed successfully, user remains authenticated
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      // Refresh failed, user needs to login again
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, resetAuth } = authSlice.actions;
export default authSlice.reducer;

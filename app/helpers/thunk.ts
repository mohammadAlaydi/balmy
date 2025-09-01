import { createAsyncThunk } from "@reduxjs/toolkit";

// Helper function to create async thunks for API calls
export const useThunk = (
  name: string,
  url: string,
  options: RequestInit = {}
) => {
  return createAsyncThunk(
    name,
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(
          error instanceof Error ? error.message : 'An unknown error occurred'
        );
      }
    }
  );
};

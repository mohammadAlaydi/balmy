"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { useFetcher } from "./fetchers";

// Helper function to create async thunks for API calls
export const useThunk = (
  name: string,
  url: string,
  options: RequestInit = {}
) => {
  return createAsyncThunk(name, (_, { rejectWithValue }) => useFetcher(url, options));
};

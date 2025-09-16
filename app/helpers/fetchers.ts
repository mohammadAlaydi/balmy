"use client";

import { useState, useEffect } from "react";

export const useFetcher = (url: string | null, options: RequestInit) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!url) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        // Try to get error details
        let errorMessage = response.statusText;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || response.statusText;
        } catch (e) {
          // Could not parse error response as JSON
        }
        
        throw new Error(errorMessage);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};

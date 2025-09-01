"use client";

import { useState, useEffect } from "react";

export const useFetcher = (url: string | null, options: RequestInit) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const result = await response.json();
        setData(result);
        console.log(result, "result");
      } else {
        throw new Error(response.statusText);
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

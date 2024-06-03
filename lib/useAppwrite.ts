"use client";
import { useCallback, useEffect, useState } from "react";

const useAppwrite = (fn: any) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fn();
      setData(response);
    } catch (error: any) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  }, [fn]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;

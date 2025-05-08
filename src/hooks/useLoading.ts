
import { useState, useCallback } from 'react';

export function useLoading<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  initialState?: T
): [boolean, T | undefined, (...args: any[]) => Promise<T>, Error | null] {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(initialState);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (...args: any[]): Promise<T> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await asyncFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [asyncFunction]);

  return [isLoading, data, execute, error];
}

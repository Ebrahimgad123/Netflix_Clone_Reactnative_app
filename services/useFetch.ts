import { useCallback, useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await fetchFunction();
            setData(result);
            setLoading(false);
            setError(null);
        } catch (err: any) {
            setError(err);
            setLoading(false);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [fetchFunction]);

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [autoFetch, fetchData]);

    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    };

    return { data, loading, error, refetch: fetchData, reset };
};
export default useFetch;



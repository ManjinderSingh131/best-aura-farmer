export const apiFetch = async (url: string, options?: RequestInit) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        const error: any = new Error('An error occurred');
        error.statusCode = response.status;
        throw error;
    }
    return response;
};

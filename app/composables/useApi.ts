import { useAuthStore } from '~/stores/auth';

export const useApi = () => {
    const config = useRuntimeConfig();
    const auth = useAuthStore();

    const api = $fetch.create({
        baseURL: config.public.apiBase as string,
        credentials: 'include',

        onRequest({ options }) {
            if (auth.token) {
                const headers = new Headers(options.headers);

                headers.set(
                    'Authorization',
                    `Bearer ${auth.token}`
                );

                options.headers = headers;
            }
        }
    });

    return async <T>(url: string, options?: any) => {
        try {
            return await api<T>(url, options);

        } catch (error: any) {
            if (error.response?.status === 401) {
                await auth.refreshToken();

                return await api<T>(url, {
                    ...options,
                    headers: {
                        ...options?.headers,
                        Authorization: `Bearer ${auth.token}`
                    }
                });
            }

            throw error;
        }
    };
};
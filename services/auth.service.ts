import type {AuthResponse, LoginRequest, RegisterRequest} from '~/types/auth';

export const authService = {

    async register(form: RegisterRequest) {
        const api = useApi();

        return await api<{message: string}>('/auth/register', {
            method: 'POST',
            body: form
        });
    },
    
    async login( form: LoginRequest) {
        const api = useApi();
        
        return await api<AuthResponse>('/auth/login', {
            method: 'POST',
            body: form
        });
    },

    async forgotPassword(email: string) {
        const api = useApi();
        
        return await api<{message: string}>('/auth/forgot-password', {
            method: 'POST',
            body: { email }
        });
    },

    async resetPassword(form: {token: string, password: string}) {
        const api = useApi();
        
        return await api<{message: string}>('/auth/reset-password', {
            method: 'POST',
            body: form
        });
    },

    async verifyEmail(token: string) {
        const api = useApi();
        
        return await api<{message: string}>('/auth/verify-email', {
            method: 'POST',
            body: { token }
        });
    },

    async refresh() {
        const api = useApi();
        return await api<{ authToken: string }>('/auth/refresh', {
            method: 'POST'
        });
    },

    async logout() {
        const api = useApi();
        return await api('/auth/logout', {
            method: 'POST'
        });
    }
}
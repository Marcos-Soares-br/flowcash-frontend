import { defineStore } from 'pinia';
import { authService } from '../../services/auth.service';
import type { AuthResponse, AuthState, LoginRequest, RegisterRequest } from '~/types/auth';

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: null,
        userName: null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        setToken(token: string | null) {
            this.token = token;
            useCookie('token').value = token;
        },

        setUser(userName: string | null) {
            this.userName = userName;
            useCookie('userName').value = userName;
        },

        setSession(data: AuthResponse) {
            this.setToken(data.authToken);
            this.setUser(data.userName);
        },

        clearSession() {
            this.setToken(null);
            this.setUser(null);
        },

        async register(form: RegisterRequest) {
            try {
                const response = await authService.register(form);

                return response.message;

            } catch (error) {
                console.error(error);
                throw error;
            }
        },

        async login(form: LoginRequest) {
            try {
                const response = await authService.login(form);

                this.setSession(response);

                return response;

            } catch (error) {
                console.error(error);
                throw error;
            }
        },

        async forgotPassword(email: string) {
            try {
                const response = await authService.forgotPassword(email);

                return response.message;

            } catch (error) {
                console.error(error);
                throw error;
            }
        },

        async resetPassword(token: string, password: string) {
            try {
                const response = await authService.resetPassword({
                    token, 
                    password
                });

                return response.message;

            } catch (error) {
                console.error(error);
                throw error;
            }
        },

        async verifyEmail(token: string) {
            try {
                const response = await authService.verifyEmail(token);

                return response.message;

            } catch (error) {
                console.error(error);
                throw error;
            }
        },

        async refreshToken() {
            try {
                const response = await authService.refresh();

                this.setToken(response.authToken);

                return response;

            } catch (error) {
                this.logout();
                return error;
            }
        },

        async logout() {
            try {
                await authService.logout();
            } finally {
                this.clearSession();
                await navigateTo('/auth?mode=login');
            }
        },
    }
});
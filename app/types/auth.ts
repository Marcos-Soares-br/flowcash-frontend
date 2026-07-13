export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {
    name: string;
}

export interface AuthResponse {
    authToken: string;
    userName: string;
}

export interface AuthState {
    token: string | null;
    userName: string | null;
}
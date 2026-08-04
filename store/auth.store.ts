import {create} from "zustand";

export interface User {
    user_id: string;
    full_name: string;
    email: string;
    role: "admin";
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User) => void;
    setLoading: (loading: boolean) => void;
    clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,

    isLoading: true,

    setUser: (user) =>
        set({
            user,
            isLoading: false,
        }),

    setLoading: (loading) =>
        set({
            isLoading: loading,
        }),

    clearUser: () =>
        set({
            user: null,
            isLoading: false,
        }),
}));

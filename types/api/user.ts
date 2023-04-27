export interface RegisterUserProps {
    status: number;
    message?: Record<string, string[]>;
}

export interface LoginUserProps {
    status: number;
    message?: Record<string, string[]>;
    token?: string;
    user?: UserProps;
}

export interface UserProps {
    id: number;
    name: string;
    username: string;
    email: string;
    active: boolean;
    email_verified_at: string | null;
    created_at: string | null;
    updated_at: string | null;
}
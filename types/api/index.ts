export interface LoginResponse {
    status: number;
    message?: {
        email?: string[];
        password?:string[];
    };
    token?:string;
}

import { UserProps } from "../../../types/api/user";

export interface InitialStateProps {
    login: boolean;
    user?: UserProps;
    token?: string,
    loginSettings: LoginSettingsProps[];
};

export interface LoginSettingsProps{
    key:string;
    value:string;
}

export interface LoginPayloadProps {
    token: string;
    user: UserProps;
}
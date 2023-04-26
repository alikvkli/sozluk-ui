import { PaginationProps } from "./pagination";

export interface CaptionResponseProps {
    status: number;
    message: string;
    payload: {
        data: CaptionProps[];
        pagination: PaginationProps;
    };
}


export interface PropertiesProps{
    bold: boolean;
    writable: boolean;
    editable: boolean;
}

export interface GetCaptionProps {
    page: number
}


export interface CaptionProps {
    id?:number;
    user_id?: number;
    title?: string;
    slug?: string;
    properties?: PropertiesProps
    pending?: boolean;
    show?: boolean;
    created_at?: string;
    updated_at?: string | null;
    username?: string;
    entry_count?: number;
}

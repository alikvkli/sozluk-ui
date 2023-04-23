export interface GetCaptionProps {
    page: number
}

export interface GetEntriesProp {
    page:  number | string | string[] | undefined ;
    caption?: string | string[] | undefined;
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

export interface PaginationProps {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface CaptionResponseProps {
    status: number;
    message: string;
    payload: {
        data: CaptionProps[];
        pagination: PaginationProps;
    };
}


export interface EntryProps {
    id: number;
    content: string;
    title?:string;
    slug?:string;
    show: boolean;
    pending: boolean;
    created_at: string;
    updated_at: string | null;
    username: string;
}

export interface PaginationProps {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface PropertiesProps{
    bold: boolean;
    writable: boolean;
    editable: boolean;
}



export interface EntryResponseProps {
    status: number;
    message: string;
    payload: {
        data: EntryProps[];
        pagination: PaginationProps;
    };
    caption: CaptionProps
}


export interface CreateEntryProps{
    caption_id: number | any;
    content: string;
}
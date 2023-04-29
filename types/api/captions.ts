import { PaginationProps } from "./pagination";

export interface CaptionResponseProps {
    status: number;
    message: string;
    payload: {
        data: CaptionProps[];
        pagination: PaginationProps;
    };
}


export interface PropertiesProps {
    bold: boolean;
    writable: boolean;
    editable: boolean;
}

export interface GetCaptionProps {
    page: number,
    topic_id?: number;
}


export interface CaptionProps {
    topic: {
        id: number;
        name: string;
        slug: string;
    };
    id: string;
    title: string | null | undefined;
    slug: string;
    entry_count: number;
    properties: {
        bold: boolean;
        writable: boolean;
        editable: boolean;
    };
    pending: boolean;
    show: boolean;
    user: {
        username: string;
    };
}


export interface CreateCaptionProps {
    token: string | undefined;
    title: string;
    topic_id: number;
    content: string;
}

export interface CreateCaptionResponseProps {
    status: number;
    message: string;
    url: string;

}
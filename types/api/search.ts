import { PaginationProps } from "./pagination";

export interface SearchResponseProps {
    payload: PayloadProps
}

interface PayloadProps {
    data: DataProps[];
    pagination: PaginationProps
}

export interface DataProps {
    id: number;
    search: string;
    slug: string;
    entries_count?: number;
    caption_count?:number;
    created_at: string | null;
    type: "entry" | "user" | "caption";
}


export interface SearchProps {
    query: string;
    page: number;
}
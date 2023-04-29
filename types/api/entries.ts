import { CaptionProps } from "./captions";
import { PaginationProps } from "./pagination";

export interface EntryProps {
    caption: string;
    caption_id: number;
    caption_slug: string;
    content: string;
    entry_id: number;
    likes: LikeProps[];
    comments: CommentProps[];
    favorites: FavoriteProps[];
    title?: string;
    slug?: string;
    show: boolean;
    pending: boolean;
    created_at: string;
    updated_at: string | null;
    username: string;
}

export interface FavoriteProps {
    id: number;
    username: string;
    created_at: string;
}

export interface CommentProps {
    id: number;
    username: string;
    comment: string;
    created_at: string;
}


export interface LikeProps {
    id: number;
    username: string;
    type: number;
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

export interface EntryByIdResponseProps {
    status: number;
    message: string;
    payload: EntryProps[];
}

export interface CreateEntryResponseProps {
    status: number;
    message: string;
}



export interface GetEntriesProp {
    page: number | string | string[] | undefined;
    caption?: string | string[] | undefined;
}


export interface CreateEntryProps {
    caption_id: number | any;
    content: string;
    token: string | undefined;
}

export interface AddFavoriteProps {
    token: string | undefined;
    entry_id: number;
}

export interface AddFavoriteResponseProps {
    status: number;
    message: string;
    payload: EntryProps[];
    type: string;
}

export interface AddLikeProps {
    token: string | undefined;
    entry_id: number;
    type: number;
}

export interface AddLikeResponseProps {
    status: number;
    message: string;
    payload: EntryProps[];
    type: string;
}
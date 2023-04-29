import { EntryProps } from "./entries";

export interface AddCommentProps {
    entry_id: number | undefined | any;
    comment: string;
    token: string | undefined;
}

export interface AddCommentResponseProps {
    status: number;
    message: string;
    payload: EntryProps[];
}

export interface DeleteCommentResponseProps {
    status: number;
    message: string;
    payload: EntryProps[];
}
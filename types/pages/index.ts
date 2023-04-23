import { CaptionProps, EntryProps, PaginationProps } from "@/services/api.types";

export interface IndexPageProps{
    captions: CaptionProps[]
}

export interface CaptionPageProps{
    captions: CaptionProps[];
    entries : {
        caption: CaptionProps;
        data: EntryProps[];
        pagination: PaginationProps;
    }
}
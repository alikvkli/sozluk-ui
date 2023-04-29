
import { CaptionProps, CaptionResponseProps } from "../api/captions";
import { EntryProps, EntryResponseProps } from "../api/entries";
import { PaginationProps } from "../api/pagination";
import { TopicsResponseProps } from "../api/topics";

export interface IndexPageProps{
    captions: CaptionResponseProps;
    entries : EntryResponseProps;
    topics: TopicsResponseProps;
}

export interface CaptionPageProps{
    captions: CaptionResponseProps;
    entries : {
        caption: CaptionProps;
        data: EntryProps[];
        pagination: PaginationProps;
    },
    topics: TopicsResponseProps;
}
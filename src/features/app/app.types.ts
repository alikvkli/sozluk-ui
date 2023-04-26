import { CaptionProps } from "../../../types/api/captions";
import { EntryProps } from "../../../types/api/entries";


export interface InitialStateProps{
    brandName: string;
    leftSideBar: CaptionProps[];
    home_entries: EntryProps[];
    caption_entries: EntryProps[];
    activeCaption: CaptionProps;
    paginations: PaginationProps;
    loading:boolean;
};

export interface PaginationProps{
    home: PageProps;
    caption: PageProps
}

export interface PageProps{
    page:any;
    total?:any
}
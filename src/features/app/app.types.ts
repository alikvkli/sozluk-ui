import { CaptionProps, EntryProps } from "@/services/api.types";

export interface InitialStateProps{
    brandName: string;
    leftSideBar: CaptionProps[];
    entries: EntryProps[];
    activeCaption: CaptionProps;
    entryPaginate: PageProps;
};


export interface PageProps{
    page:any,
    perPage?:any;
    total?:any;
}
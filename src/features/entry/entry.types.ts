import { EntryProps } from "../../../types/api/entries";

export interface InitialStateProps {
    home_entries: EntryProps[];
    caption_entries: EntryProps[];
    paginations: PaginationProps;
    entry_detail?: EntryProps;
};

export interface PaginationProps {
    home: PageProps;
    caption: PageProps
}

export interface PageProps {
    page: any;
    total?: any
}
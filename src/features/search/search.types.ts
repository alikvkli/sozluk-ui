import { DataProps } from "../../../types/api/search";

export interface InitialStateProps {
    search_data: DataProps[];
    paginations: PageProps;
};


export interface PageProps {
    page: any;
    records?:any;
    total?: any
}
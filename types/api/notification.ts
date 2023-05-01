export interface GetNotificationResponseProps {
    status: number;
    payload: {
        data: NotificationProps[],
        pagination: PaginationProps
    }
}

export interface NotificationProps {
    id: number;
    created_at: string;
    read_at: string;
    username: string;
    data: DataProps;
}

interface DataProps {
    message: string;
    type: string,
    related_data_url: string;

}

export interface ReadAsNotificationResponseProps {
    status: number;
    payload: NotificationProps;
}

interface PaginationProps{
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    total_pages:number;
    unread_count:number;
}

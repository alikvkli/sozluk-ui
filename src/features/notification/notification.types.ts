import { NotificationProps } from "../../../types/api/notification";

export interface InitialStateProps {
    notifications: NotificationProps[];
    pagination?: PageProps,
};

interface PageProps {
    total: number;
    page: number;
    unread_count: number;
    total_pages: number;
}



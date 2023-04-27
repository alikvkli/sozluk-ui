export interface RegisterDataProps {
    name: string;
    username: string;
    email: string;
    password: string;
    commitment: boolean;
}
export interface FormErrors {
    [key: string]: string[];
}

export interface NotificationState {
    open: boolean;
    message: any;
    type: "error" | "success";
  }
  
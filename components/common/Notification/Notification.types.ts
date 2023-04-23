import { AlertColor, SnackbarOrigin } from "@mui/material";

export interface NotificationProps{
    open : boolean;
    setOpen: (value?:boolean) => void;
    duration?:number;
    type: AlertColor;
    message: string;
    position?:SnackbarOrigin 
}

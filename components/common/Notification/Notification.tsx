import { Alert, Snackbar } from "@mui/material"
import { FC } from "react"
import { NotificationProps } from "./Notification.types"

const Notification: FC<NotificationProps> = ({ open, setOpen, duration = 3000, type, message,position }) => {
    return (
        <Snackbar open={open} anchorOrigin={position} autoHideDuration={duration} onClose={() =>setOpen()}>
            <Alert onClose={() => setOpen()}  severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Notification;
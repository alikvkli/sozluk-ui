import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from "@mui/material";
import React, { FC } from "react";
import { StandarModalProps } from "./StandartModal.types";

const StandartModal: FC<StandarModalProps> = ({ show, setShow, title, callback, content, buttonText }) => {
    const handleClose = () => {
        setShow(false);
    };

    return (
        <>
            <Dialog
                open={show}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        {buttonText.dismiss}
                    </Button>
                    <Button onClick={callback} autoFocus>
                        {buttonText.agree}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default StandartModal;
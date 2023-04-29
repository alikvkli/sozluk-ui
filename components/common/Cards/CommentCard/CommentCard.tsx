import { FC, useState } from "react";
import { CommentCardProps } from "./CommentCard.types";
import * as Styled from "./CommentCard.styles";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import theme from "@/config/theme";
import { convertLocaleDate } from "@/utils";
import { Delete } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { deleteComment } from "@/services/api";
import Notification from "@/components/common/Notification/Notification";
import { NotificationState } from "@/components/pages/register/Register.types";
import { updateEntries } from "@/features/entry/entry";

const CommentCard: FC<CommentCardProps> = ({ comment }) => {
    const dispatch = useAppDispatch();
    const { login, user, token } = useAppSelector(state => state.auth);
    const [notification, setNotification] = useState<NotificationState>({ open: false, message: "", type: "error" });

    const handleDeleteComment = async () => {
        await deleteComment({ id: comment.id, token: token }).then(res => {
            if (res.status === 1 && res.payload) {
                dispatch(updateEntries(res.payload));
                setNotification({ open: true, message: res.message, type: "success" });

            } else {
                setNotification({ open: true, message: res.message, type: "error" });

            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <Styled.CommentCardContainer flex={1} display="flex" alignItems="stretch" gap={4} justifyContent="space-between">
            <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-between">
                <Typography component="p" fontSize={14} color="GrayText">{convertLocaleDate(comment.created_at)}</Typography>
                <Typography component="p" fontSize={15} color="GrayText">@{comment.username}</Typography>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="flex-end" alignItems="flex-end" gap={1}>
                <Styled.CommentMessage bgcolor={theme.palette.primary.main} flex={1} padding={1}>
                    <Typography color="white">{comment.comment}</Typography>
                </Styled.CommentMessage>
                <Box display="flex" alignItems="center" justifyContent="center">
                    {login && user?.username === comment.username && (
                        <IconButton onClick={() => handleDeleteComment()} color="error">
                            <Delete />
                        </IconButton>
                    )}
                    <Avatar sx={{ width: "32px", height: "32px" }}>A</Avatar>
                </Box>
            </Box>

            <Notification
                duration={4000}
                position={{ vertical: "top", horizontal: "right" }}
                open={notification.open}
                setOpen={() => setNotification({ ...notification, open: false })}
                message={notification.message} type={notification.type} />

        </Styled.CommentCardContainer>
    )
}

export default CommentCard;
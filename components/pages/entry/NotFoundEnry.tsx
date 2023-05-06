import { Alert, AlertTitle, Box } from "@mui/material";

export default function NotFoundEntry() {
    return (
        <Alert severity="info" sx={{ position: "sticky", top: "64px" }}>
            <AlertTitle>Bilgilendirme</AlertTitle>
            Görüntülemek entry  geçici olarak kaldırılmış veya tamamen <strong>silinmiş</strong>.
        </Alert>
    )
}
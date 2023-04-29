import { FavoriteProps, LikeProps } from "../../types/api/entries";

export const isDataComplete = (data: any): boolean => {
    for (const key in data) {
        if (data[key] === "" || data[key] === false) {
            return false;
        }
    }
    return true;
}

export const handleEnterKeyPress = (callback: (event: React.KeyboardEvent<HTMLInputElement>) => void) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        callback(event);
    }
};


export const isMyFavorite = (data: FavoriteProps[], username: string | undefined): boolean => {
    if (data && data.length !== 0 && username) {
        return data.filter(item => item.username === username).length > 0;
    }
    return false;
}

export const isMyLiked = (data: LikeProps[], username: string | undefined): string => {
    if (data && data.length !== 0 && username) {
        return data.find(item => item.username === username)?.type === 1 ? "A" : "B";
    }
    return "";
}


export const convertLocaleDate = (date: string): string => {
    return new Date(date).toLocaleDateString("tr-TR", { hour: "2-digit", minute: "2-digit" })
}

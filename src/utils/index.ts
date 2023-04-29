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

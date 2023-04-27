export const isDataComplete = (data: any): boolean => {
    for (const key in data) {
        if (data[key] === "" || data[key] === false) {
            return false;
        }
    }
    return true;
}
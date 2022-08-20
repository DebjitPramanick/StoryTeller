export const getError = (error: any) => {
    if (error.response) {
        return error.response.data.message;
    } else {
        return error.message
    }
}
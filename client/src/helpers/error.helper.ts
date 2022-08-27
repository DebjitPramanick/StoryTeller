export const getError = (error: any) => {
    const res = error.response;
    if (res.data.message) return res.data.message;
    else return res.data;
}
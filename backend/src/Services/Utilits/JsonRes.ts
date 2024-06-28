export interface IJsonResponse {
    success: boolean;
    message: string;
    data: any;
}
export const successJson =(message: string, data?: any) : IJsonResponse => {
    return {
        success: true,
        message: message,
        data: data
    };
};

export const errorJson = (message: string, data?: any) : IJsonResponse => {
    return {
        success: false,
        message: message,
        data: data
    };
};
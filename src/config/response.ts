export default interface IApiResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
    error?: {
        statusCode: number;
        name: string;
    };
}

export interface IAuthResponse<T> {
    token: string | null;
    data: T;
}

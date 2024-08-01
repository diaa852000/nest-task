import IApiResponse from "./response";

export default interface IController<T> {
    create?: (dto: any) => Promise<IApiResponse<T>>

    findAll?: () => Promise<IApiResponse<T[]>>;
    findOne?: (id: string, ...rest: any) => Promise<IApiResponse<T>>;

    update?: (id: string, dto: any) => Promise<IApiResponse<T>>;

    delete?: (id: string) => Promise<IApiResponse<T>>
}
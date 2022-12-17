export interface IRequestTokenUser {
    params: object;
    sign: string;
}

export interface IResponseTokenUser {
    vk_id: number;
    token: string;
}
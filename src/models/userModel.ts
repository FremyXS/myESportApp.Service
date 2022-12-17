export interface UserModel {
    vk_id: number;
    is_admin: boolean;
}

export interface IRequestUser {
    params: object;
    sign: string;
}

export interface IResponseUser {
    vk_id: number;
    token: string;
}
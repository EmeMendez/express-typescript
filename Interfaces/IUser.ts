
export interface IUser {
    id?:string,
    name: string;
    lastname:string,
    email: string;
    password?:string,
    avatar?: string;
    role:string,
    is_active:boolean,
    created_in_google:boolean,
    created_at?: string,
    updated_at?: string,
}
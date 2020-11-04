import { IUser } from './user.interface';

export interface IRegisterForm {
    name: string;
    lastName: string;
    email: string;
    password: string;
    birthDay: string;
}

export interface IResultRegister {
    status: boolean;
    message: string;
    user?: IUser;
}
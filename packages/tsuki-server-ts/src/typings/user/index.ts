import { Document } from 'mongoose';

export interface IUser {
  method: string;
  email: string;
  username: string;
}

export interface IUserModel extends IUser, Document {
  password?: string;
  hashPassword(passowrd: string): string;
  isValidPassword(): boolean;
}

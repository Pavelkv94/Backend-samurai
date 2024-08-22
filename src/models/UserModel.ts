import { ObjectId } from "mongodb";

export type UserViewModel = {
  login: string;
  passwordHash: string;
  passwordSalt: string;
  created: Date;
};

export type UserDBModel = {
  _id: ObjectId,
  accountData: UserViewModel,
  emailConfirmation: {
    confirmationCode: number;
    expirationDate: number;
    isConfirmed: boolean
  }
}
import bcrypt from "bcrypt";
import { usersRepository } from "../db/usersRepository";
import { UserViewModel } from "../models/UserModel";

type PayloadType = {
  login: string;
  password: string;
};
export const userService = {
  async createUser(login: string, pass: string) {
    const passwordSalt: string = await bcrypt.genSalt(10);
    const passwordHash = await this._generateHash(pass, passwordSalt);

    const newUser: UserViewModel = {
      login,
      passwordHash,
      passwordSalt,
      created: new Date(),
    };

    return usersRepository.createUser(newUser);
  },
  async checkCredentials(payload: PayloadType) {
    const user = await usersRepository.findByLogin(payload.login);

    if (!user) return false;
    const passwordHash = await this._generateHash(payload.password, user.passwordSalt);
    if (user.passwordHash !== passwordHash) {
      return false;
    }
    return true;
  },

  async _generateHash(pass: string, salt: string) {
    return bcrypt.hash(pass, salt);
  },
};

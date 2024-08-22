import bcrypt from "bcrypt";
import { usersRepository } from "../db/usersRepository";
import { UserDBModel, UserViewModel } from "../models/UserModel";
import { ObjectId } from "mongodb";
import { emailAdaptor } from "../adapters/email-adapter";
import { usersCollection } from "../db/db";

type PayloadType = {
  login: string;
  password: string;
};

export const userService = {
  async createUser(login: string, pass: string) {
    const passwordSalt: string = await bcrypt.genSalt(10);
    const passwordHash = await this._generateHash(pass, passwordSalt);

    const newUser: UserDBModel = {
      _id: new ObjectId(),
      accountData: {
        login,
        passwordHash,
        passwordSalt,
        created: new Date(),
      },
      emailConfirmation: {
        confirmationCode: +new Date(),
        expirationDate: 86400000,
        isConfirmed: false,
      },
    };

    const result = await usersRepository.createUser(newUser);

    try {
      await emailAdaptor.sendEmail({
        email: result.accountData.login,
        message: result.emailConfirmation.confirmationCode.toString(),
        subject: "Googleees",
      });
    } catch (error) {
      console.log(error);
    }
    return result;
  },
  async checkCredentials(payload: PayloadType) {
    const user = await usersRepository.findByLogin(payload.login);

    if (!user) return null;
    if(!user.emailConfirmation.isConfirmed) {
      return {
        error: "EMAIL NOT CONFIRMED"
      }
    }
    const passwordHash = await this._generateHash(payload.password, user.accountData.passwordSalt);
    if (user.accountData.passwordHash !== passwordHash) {
      return null;
    }
    return user;
  },

  async _generateHash(pass: string, salt: string) {
    return bcrypt.hash(pass, salt);
  },

  async confirmEmail(code: string) {
    const user = await usersRepository.findByCode(code);

    if (user) {
      usersCollection.updateOne({ _id: user._id }, { $set: { "emailConfirmation.isConfirmed": true } });
      return true;
    } else {
      return false;
    }
  },
};

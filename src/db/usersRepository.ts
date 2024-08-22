import { UserDBModel, UserViewModel } from "../models/UserModel";
import { usersCollection } from "./db";

export const usersRepository = {
  async findUsers() {
    return usersCollection.find({}).toArray();
  },
  async createUser(newUser: UserDBModel): Promise<UserDBModel> {
    await usersCollection.insertOne(newUser);
    return newUser;
  },
  async findByLogin(login: string) {
    const user = await usersCollection.findOne({ "accountData.login": login });

    return user;
  },
  async findByCode(code: string) {
    const user = await usersCollection.findOne({ "emailConfirmation.confirmationCode": +code });

    return user;
  }
};

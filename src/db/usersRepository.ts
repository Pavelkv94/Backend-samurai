import { UserViewModel } from "../models/UserModel";
import { usersCollection } from "./db";

export const usersRepository = {
  async findUsers() {
    return usersCollection.find({}).toArray();
  },
  async createUser(newUser: UserViewModel): Promise<UserViewModel> {
    await usersCollection.insertOne(newUser);
    return newUser;
  },
  async findByLogin(login: string) {
    const user = await usersCollection.findOne({ login });

    return user;
  },
};

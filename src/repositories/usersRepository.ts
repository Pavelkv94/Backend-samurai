import { ObjectId } from "mongodb";
import { UserModel } from "./db";

export const usersRepository = {
  async getUsers() {
    return UserModel.find({});
  },
  async getUser(id: ObjectId) {
    const user = await UserModel.findOne({ _id: id });
    
    return user;
  },
  async createUser(user: any) {
    try {
      await UserModel.create(user);
      return user;
    } catch (e) {
      return null
    }

  },
  async updateUser(id: ObjectId, userName: string, bio: string) {
    return true;
  },
  async deleteUser(id: ObjectId) {
    const result = await UserModel.deleteOne({ _id: id });
    return result.deletedCount === 1;
  },
};

import { usersRepository } from "../repositories/usersRepository";

export const userService = {
  async createUser(payload: any) {
    const newUser = {
      userName: payload.userName,
      bio: payload.bio,
      addedAt: new Date(),
    };

    const result = await usersRepository.createUser(newUser);

    return result;
  },
};

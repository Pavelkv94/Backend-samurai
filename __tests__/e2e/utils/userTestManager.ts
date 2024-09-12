import request from "supertest";
import { UserCreateInputModel } from "../../../src/features/users/models/UserCreateModel";
import { app, RouterPaths } from "../../../src/app";
import { HTTP_STATUSES, HttpStatusType } from "../../../src/constants";

export const userTestManager = {
  async createUser(data: UserCreateInputModel, statusCode: HttpStatusType) {
    const response = await request(app).post(RouterPaths.users).send(data).expect(statusCode);

    let createdEntity = await response.body;

    if (statusCode === HTTP_STATUSES.CREATED_201) {

      expect(createdEntity).toEqual({
        userName: "Pavel",
        id: expect.any(Number),
      });
    }

    return {response, createdEntity};
  },
};

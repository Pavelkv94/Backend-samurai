import request from "supertest";
import { app, RouterPaths } from "../../src/app";
import { HTTP_STATUSES } from "../../src/constants";
import { UserCreateInputModel } from "../../src/features/users/models/UserCreateModel";
import { UserUpdateInputModel } from "../../src/features/users/models/UserUpdateModel";
import { userTestManager } from "./utils/userTestManager";

describe("tests for /users", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });

  it("should return 200 and empty array", async () => {
    // expect(1).toBe(1);
    await request(app).get(RouterPaths.users).expect(HTTP_STATUSES.OK_200, []);
  });

  it("should return 404", async () => {
    await request(app).get(`${RouterPaths.users}/1`).expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  it("shouldnt CREATE data in db", async () => {
    const data: UserCreateInputModel = { userName: "" };

    await userTestManager.createUser(data, HTTP_STATUSES.BAD_REQUEST_400);

    await request(app).get(RouterPaths.users).expect(HTTP_STATUSES.OK_200, []);
  });

  let createdUser: any = null;

  it("should CREATE data in db", async () => {
    const data: UserCreateInputModel = { userName: "Pavel" };
    const { createdEntity } = await userTestManager.createUser(data, HTTP_STATUSES.CREATED_201);
    createdUser = createdEntity
    await request(app).get(RouterPaths.users).expect(HTTP_STATUSES.OK_200, [createdUser]);
  });

  it("shouldnt UPDATE data in db", async () => {
    await request(app).put(`${RouterPaths.users}/${createdUser.id}`).send({ userName: "" }).expect(HTTP_STATUSES.BAD_REQUEST_400);

    await request(app)
      .get(RouterPaths.users + "/" + createdUser.id)
      .expect(HTTP_STATUSES.OK_200, { id: createdUser.id, userName: createdUser.userName });
  });

  it("should UPDATE data in db", async () => {
    const data: UserUpdateInputModel = { userName: "Egor" };

    await request(app).put(`${RouterPaths.users}/${createdUser.id}`).send(data).expect(HTTP_STATUSES.OK_200);

    await request(app)
      .get(RouterPaths.users + "/" + createdUser.id)
      .expect(HTTP_STATUSES.OK_200, { id: createdUser.id, userName: "Egor" });
  });
});

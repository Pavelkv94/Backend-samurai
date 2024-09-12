import request from "supertest";
import { UserCreateInputModel } from "../../../src/features/users/models/UserCreateModel";
import { app, RouterPaths } from "../../../src/app";
import { HTTP_STATUSES, HttpStatusType } from "../../../src/constants";
import { CourseCreateInputModel } from "../../../src/features/courses/models/CourseCreateModel";

export const courseTestManager = {
  async createCourse(data: CourseCreateInputModel, statusCode: HttpStatusType) {
    const response = await request(app).post(RouterPaths.courses).send(data).expect(statusCode);

    let createdEntity = await response.body;

    if (statusCode === HTTP_STATUSES.CREATED_201) {

      expect(createdEntity).toEqual({
        title: "PYTHON",
        id: expect.any(Number),
      });
    }

    return {response, createdEntity};
  },
};

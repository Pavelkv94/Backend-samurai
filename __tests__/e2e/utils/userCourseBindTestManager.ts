import request from "supertest";
import { UserCreateInputModel } from "../../../src/features/users/models/UserCreateModel";
import { app, RouterPaths } from "../../../src/app";
import { HTTP_STATUSES, HttpStatusType } from "../../../src/constants";
import { CreateCourseUserBindingModel } from "../../../src/features/user-course-bindings/model/CreateCourseUserBindingModel";

export const createUserCourseBindingTestManager = {
  async createUserCourseBinding(data: CreateCourseUserBindingModel, statusCode: HttpStatusType) {
    const response = await request(app).post(RouterPaths.usersCoursesBinding).send(data).expect(statusCode);

    let createdEntity = await response.body;

    if (statusCode === HTTP_STATUSES.CREATED_201) {
      expect(createdEntity).toEqual({
        studentId: data.studentId,
        courseId: data.courseId,
        date: createdEntity.date,
      });
    }

    return { response, createdEntity };
  },
};

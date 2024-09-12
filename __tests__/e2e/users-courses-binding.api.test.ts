import request from "supertest";
import { app, RouterPaths } from "../../src/app";
import { HTTP_STATUSES } from "../../src/constants";
import { createUserCourseBindingTestManager } from "./utils/userCourseBindTestManager";
import { CreateCourseUserBindingModel } from "../../src/features/user-course-bindings/model/CreateCourseUserBindingModel";

describe("tests for /users-courses-binding.api.test", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });

  it("shouldnt CREATE data in db", async () => {
    const data: CreateCourseUserBindingModel = { studentId: 1, courseId: 1 };

    await createUserCourseBindingTestManager.createUserCourseBinding(data, HTTP_STATUSES.CREATED_201);
  });
});

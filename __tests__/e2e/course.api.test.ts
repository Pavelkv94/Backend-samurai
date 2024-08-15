import request from "supertest";
import { CourseCreateInputModel } from "../../src/models/CourseCreateModel";
import { CourseUpdateInputModel } from "../../src/models/CourseUpdateModel";
import { app } from "../../src/app";
import { HTTP_STATUSES } from "../../src/constants";

describe("/course", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });

  it("should return 200 and empty array", async () => {
    // expect(1).toBe(1);
    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, []);
  });

  it("should return 404", async () => {
    await request(app).get("/courses/1").expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  it("shouldnt CREATE data in db", async () => {
    const data: CourseCreateInputModel = { title: "" };

    await request(app).post("/courses").send(data).expect(HTTP_STATUSES.BAD_REQUEST_400);

    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, []);
  });

  let createdCourse: any = null;

  it("should CREATE data in db", async () => {
    const data: CourseCreateInputModel = { title: "PYTHON" };
    const response = await request(app).post("/courses").send(data).expect(HTTP_STATUSES.CREATED_201);

    createdCourse = response.body;

    expect(createdCourse).toEqual({
      title: "PYTHON",
      id: expect.any(Number),
    });

    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, [createdCourse]);
  });

  it("shouldnt UPDATE data in db", async () => {
    await request(app).put(`/courses/${createdCourse.id}`).send({ title: "" }).expect(HTTP_STATUSES.BAD_REQUEST_400);

    await request(app)
      .get("/courses/" + createdCourse.id)
      .expect(HTTP_STATUSES.OK_200, { id: createdCourse.id, title: createdCourse.title });
  });

  it("should UPDATE data in db", async () => {
    const data: CourseUpdateInputModel = { title: "NEW PYTHON" };

    await request(app).put(`/courses/${createdCourse.id}`).send(data).expect(HTTP_STATUSES.OK_200);

    await request(app)
      .get("/courses/" + createdCourse.id)
      .expect(HTTP_STATUSES.OK_200, { id: createdCourse.id, title: "NEW PYTHON" });
  });
});

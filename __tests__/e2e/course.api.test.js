"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../src/app");
const constants_1 = require("../../src/constants");
describe("/course", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).delete("/__test__/data");
    }));
    it("should return 200 and empty array", () => __awaiter(void 0, void 0, void 0, function* () {
        // expect(1).toBe(1);
        yield (0, supertest_1.default)(app_1.app).get("/courses").expect(constants_1.HTTP_STATUSES.OK_200, []);
    }));
    it("should return 404", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).get("/courses/1").expect(constants_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    it("shouldnt CREATE data in db", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { title: "" };
        yield (0, supertest_1.default)(app_1.app).post("/courses").send(data).expect(constants_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield (0, supertest_1.default)(app_1.app).get("/courses").expect(constants_1.HTTP_STATUSES.OK_200, []);
    }));
    let createdCourse = null;
    it("should CREATE data in db", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { title: "PYTHON" };
        const response = yield (0, supertest_1.default)(app_1.app).post("/courses").send(data).expect(constants_1.HTTP_STATUSES.CREATED_201);
        createdCourse = response.body;
        expect(createdCourse).toEqual({
            title: "PYTHON",
            id: expect.any(Number),
        });
        yield (0, supertest_1.default)(app_1.app).get("/courses").expect(constants_1.HTTP_STATUSES.OK_200, [createdCourse]);
    }));
    it("shouldnt UPDATE data in db", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).put(`/courses/${createdCourse.id}`).send({ title: "" }).expect(constants_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield (0, supertest_1.default)(app_1.app)
            .get("/courses/" + createdCourse.id)
            .expect(constants_1.HTTP_STATUSES.OK_200, { id: createdCourse.id, title: createdCourse.title });
    }));
    it("should UPDATE data in db", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { title: "NEW PYTHON" };
        yield (0, supertest_1.default)(app_1.app).put(`/courses/${createdCourse.id}`).send(data).expect(constants_1.HTTP_STATUSES.OK_200);
        yield (0, supertest_1.default)(app_1.app)
            .get("/courses/" + createdCourse.id)
            .expect(constants_1.HTTP_STATUSES.OK_200, { id: createdCourse.id, title: "NEW PYTHON" });
    }));
});

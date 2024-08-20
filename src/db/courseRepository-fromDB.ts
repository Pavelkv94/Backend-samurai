import { coursesCollection, CourseType } from "./db";

export const coursesRepository = {
  async findCourses(title: string | null | undefined): Promise<CourseType[]> {
    const filter: any = {};
    if (title) {
      filter.title = { $regex: title };
    }
    return coursesCollection.find(filter).toArray();
  },
  async findCourseById(id: string): Promise<CourseType | null> {
    const foundCourse = await coursesCollection.findOne({ id: +id });

    return foundCourse || null;
  },
  async createCourse(title: string): Promise<CourseType> {
    const newItem: CourseType = {
      id: +new Date(),
      title: title,
      studentsCount: 0,
    };
    await coursesCollection.insertOne(newItem);

    return newItem;
  },
  async updateCourse(title: string, id: string): Promise<boolean> {
    const foundCourse = await coursesCollection.updateOne({ id: +id }, { $set: { title: title } });

    return foundCourse.matchedCount === 1; // если нашлись документы
  },
  async deleteCourse(id: string): Promise<boolean> {
    const result = await coursesCollection.deleteOne({ id: +id });

    return result.deletedCount === 1;
  },
};

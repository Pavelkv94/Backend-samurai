import { coursesCollection, CourseType } from "./db";

export const coursesRepository = {
  async findCourses(title: string | null | undefined): Promise<CourseType[]> {
    const filter: any = {};
    if (title) {
      filter.title = { $regex: title };
    }
    // return coursesCollection.find(filter).skip(2).limit(2).toArray(); //todo пагинация в mongoDb
    //return coursesCollection.find(filter).sort({title: -1}).toArray(); //todo сортировка в mongoDb

    return coursesCollection.find(filter).toArray();
  },
  async findCourseById(id: string): Promise<CourseType | null> {
    const foundCourse = await coursesCollection.findOne({ id: +id });

    return foundCourse || null;
  },
  async createCourse(newItem: CourseType): Promise<CourseType> {
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
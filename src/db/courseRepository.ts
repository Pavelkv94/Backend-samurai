import { CourseType, db } from "./db";

export const coursesRepository = {
  async findCourses(title: string | null | undefined): Promise<CourseType[]> {
    let foundCourses = db.courses;
    if (title) {
      foundCourses = foundCourses.filter((el) => el.title.indexOf(title) > -1);
      return foundCourses;
    } else {
      return foundCourses;
    }
  },
  async findCourseById(id: string): Promise<CourseType | null>  {
    const foundCourse = db.courses.find((el) => el.id === +id);
    return foundCourse || null;
  },
  async createCourse(title: string): Promise<CourseType> {
    const newItem: CourseType = {
      id: +new Date(),
      title: title,
      studentsCount: 0,
    };
    db.courses.push(newItem);

    return newItem;
  },
  async updateCourse(title: string, id: string):Promise<boolean> {
    const foundCourse = db.courses.find((el) => el.id === +id);

    if (foundCourse) {
      foundCourse.title = title;
      return true;
    } else {
      return false;
    }
  },
  async deleteCourse(id: string): Promise<boolean> {
    for (let i = 0; i < db.courses.length; i++) {
      if (db.courses[i].id === +id) {
        db.courses.splice(i, 1);
        return true;
      }
    }
    return false;
  },
};

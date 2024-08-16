import { CourseType, db } from "./db";

export const coursesRepository = {
  findCourses(title: string | null | undefined) {
    let foundCourses = db.courses;
    if (title) {
      foundCourses = foundCourses.filter((el) => el.title.indexOf(title) > -1);
      return foundCourses;
    } else {
      return foundCourses;
    }
  },
  findCourseById(id: string) {
    const foundCourse = db.courses.find((el) => el.id === +id);
    return foundCourse;
  },
  createCourse(title: string) {
    const newItem: CourseType = {
      id: +new Date(),
      title: title,
      studentsCount: 0,
    };
    db.courses.push(newItem);

    return newItem;
  },
  updateCourse(title: string, id: string) {
    const foundCourse = db.courses.find((el) => el.id === +id);

    if (foundCourse) {
      foundCourse.title = title;
      return true;
    } else {
      return false;
    }
  },
  deleteCourse(id: string) {
    for (let i = 0; i < db.courses.length; i++) {
      if (db.courses[i].id === +id) {
        db.courses.splice(i, 1);
        return true;
      }
    }
    return false;
  },
};

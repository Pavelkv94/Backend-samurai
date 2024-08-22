import { coursesRepository } from "../db/courseRepository-fromDB";
import { CourseType } from "../db/db";

export const coursesService = {
  async findCourses(title: string | null | undefined): Promise<CourseType[]> {
    return coursesRepository.findCourses(title);
  },
  async findCourseById(id: string): Promise<CourseType | null> {
    return coursesRepository.findCourseById(id);
  },
  async createCourse(title: string): Promise<CourseType> {
    const newItem: CourseType = {
      id: +new Date(),
      title: title,
      studentsCount: 0,
    };
    return coursesRepository.createCourse(newItem);
  },
  async updateCourse(title: string, id: string): Promise<boolean> {
    return coursesRepository.updateCourse(title, id);
  },
  async deleteCourse(id: string): Promise<boolean> {
    return coursesRepository.deleteCourse(id);
  },
};

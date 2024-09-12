export type CourseType = {
  id: number;
  title: string;
  studentsCount: number;
};

export type UserType = {
  id: number;
  userName: string;
};

export type StudentCourseBindingType = {
  studentId: number;
  courseId: number;
  date: Date;
};

export type DBType = { courses: CourseType[]; users: UserType[]; studentCourseBindings: StudentCourseBindingType[] };

export const db: DBType = {
  courses: [
    { id: 1, title: "js", studentsCount: 10 },
    { id: 2, title: "html", studentsCount: 10 },
    { id: 3, title: "css", studentsCount: 10 },
  ],
  users: [
    { id: 1, userName: "Anna" },
    { id: 2, userName: "Dimych" },
  ],
  studentCourseBindings: [
    { studentId: 1, courseId: 1, date: new Date() },
    { studentId: 2, courseId: 2, date: new Date() },
    { studentId: 1, courseId: 3, date: new Date() },
  ],
};

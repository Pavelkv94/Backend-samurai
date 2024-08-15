export type CourseType = {
  id: number;
  title: string;
  studentsCount: number;
};

export type DBType = { courses: CourseType[] };

export const db: DBType = {
  courses: [
    { id: 1, title: "js", studentsCount: 10 },
    { id: 2, title: "html", studentsCount: 10 },
    { id: 3, title: "css", studentsCount: 10 },
  ],
};
